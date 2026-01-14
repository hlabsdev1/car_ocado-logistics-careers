gsap.registerPlugin(SplitText);
const textEase = 'power4';

const newStyles = `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

function headerSplit() {
  const pill = document.querySelectorAll('[pill]');
  pill.forEach((e) => {
    const child = e.firstElementChild;
    if (!child) return;
    let split = SplitText.create(child, {
      type: 'lines',
      linesClass: 'line',
      mask: 'lines',
    });

    const lineMask = e.querySelectorAll('.line-mask');
  });

  const lineMask = document.querySelectorAll('[pill] .line-mask');
  lineMask.forEach((line) => {
    if (!line) return;

    line.style.cssText = newStyles;
  });
}

//INITIALIZE FILTER TOGGLE SYSTEM
function initFilterToggle() {
  const OPEN_CLASS = 'is--open';
  const dropdowns = document.querySelectorAll('.filter-dropdown');
  console.log('init filter');

  dropdowns.forEach((dropdown) => {
    const toggleBtn = dropdown.querySelector('.filter-dropdown-toggle');
    const menu = dropdown.querySelector('.filter-dropdown-list');
    if (!toggleBtn || !menu) return;

    // Toggle on button click
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent click from bubbling to document
      dropdowns.forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove(OPEN_CLASS);
        }
      });
      dropdown.classList.toggle(OPEN_CLASS);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      // if click is NOT inside the dropdown, close it
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove(OPEN_CLASS);
      }
    });
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove(OPEN_CLASS);
      }
    });
  });
}

function globalSwiper() {
  const swiperComponent = document.querySelectorAll(
    "[swiper-component='global']"
  );
  swiperComponent.forEach((item) => {
    const swiperContainer = item.querySelector('.swiper');
    const nextEl = item.querySelector('.swiper-arrow.is--next');
    const prevEl = item.querySelector('.swiper-arrow.is--prev');
    const pagination = item.querySelector('.swiper-pagination');
    const bullet = item.querySelector('.swiper-bullet');
    const swiperComp = new Swiper(swiperContainer, {
      slidesPerView: 'auto',
      followFinger: false,
      slideActiveClass: 'is-active',
      spaceBetween: 20,
      // mousewheel: true,
      // loop: true,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
        disabledClass: 'is--disabled',
      },
      // custom pagination
      pagination: {
        el: pagination,
        bulletClass: 'swiper-bullet',
        bulletActiveClass: 'is--active',
        clickable: true,
      },
    });
  });
}

function accordian() {
  const allItems = document.querySelectorAll('[hs-faq-item]');

  if (!allItems) return;

  allItems.forEach((item) => {
    const trigger = item.querySelector('[hs-faq-trigger]');
    const answer = item.querySelector('[hs-faq-ans]');
    // answer.style.maxHeight = 0 + "px";
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('is--active');
      allItems.forEach((faq) => {
        faq.classList.remove('is--active');
        faq.querySelector('[hs-faq-ans]').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('is--active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// Using this function in other js files
function formatCreatedAgo(isoDate) {
  const createdDate = new Date(isoDate);
  const now = new Date();

  const diffMs = now - createdDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return 'Posted today';
  }

  if (diffDays < 30) {
    return `Posted ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  return `Posted ${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
}

window.formatCreatedAgo = formatCreatedAgo;

function hideEmptyButn() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((butn) => {
    const text = butn.querySelector('.button-txt');
    if (text) {
      if (text.innerHTML === '') butn.style.display = 'none';
    }
  });
}
let directTextProcessed = false;
async function markDivsWithDirectText() {
  if (directTextProcessed) return;
  directTextProcessed = true;

  const divs = document.querySelectorAll('div');

  divs.forEach((div) => {
    const hasDirectText = Array.from(div.childNodes).some(
      (node) =>
        node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
    );

    if (hasDirectText) {
      div.setAttribute('text-content-div', '');
    }
  });
}

async function formatingV_Text() {
  function isVisuallyUppercase(el) {
    const style = window.getComputedStyle(el);
    return style.textTransform === 'uppercase';
  }
  function highlightV(element) {
    const forceUppercase = isVisuallyUppercase(element);
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const text = node.nodeValue;
      // skip if no possible v/V
      if (!/[vV]/.test(text)) return;

      const fragment = document.createDocumentFragment();
      const parts = text.split(/([vV])/g);
      // console.log(parts);

      parts.forEach((part) => {
        const isV = part === 'V';
        const isLowerV = part === 'v';
        if (isV || (isLowerV && forceUppercase)) {
          const span = document.createElement('span');
          span.className = 'kerning-v';
          span.textContent = part;
          fragment.appendChild(span);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });

      node.parentNode.replaceChild(fragment, node);
    });
  }

  document
    .querySelectorAll('h1, h2, h3, h4, h5, h6, p, [text-content-div]')
    .forEach(highlightV);
}

async function textFormating() {
  await markDivsWithDirectText();
  await formatingV_Text();
}

function mobileNavClose() {
  const nav = document.querySelector('.section_navigation1-light');
  const navOpenButn = nav.querySelector('.navigation1_menu-button');
  const closebutn = nav.querySelector('.navigation1_close-butn');

  if (closebutn) {
    closebutn.addEventListener('click', () => {
      navOpenButn.click();
    });
  }
}

async function addingFaqToPage() {
  const faqPage = document.querySelector('[faq-page]');

  if (!faqPage) return;
  const allTeams = document.querySelectorAll('.faq-page_component');
  for (const team of allTeams) {
    const slug = team.getAttribute('team-category');
    if (!slug) return;

    const target = team.querySelector(`.faq-list-wrap`);

    if (!target) return;

    try {
      const response = await fetch(`/team-categories/${slug}`);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const content = doc.querySelector('.faq-list-wrap');

      if (content) {
        target.innerHTML = content.innerHTML;
      }
    } catch (err) {
      console.error('Failed to load CMS content', err);
    }
  }
}

function createScrollTrigger(
  triggerElement,
  timeline,
  playValue,
  reverseValue,
  markers
) {
  // Play tl when scrolled into view (60% from top of screen)
  ScrollTrigger.create({
    trigger: triggerElement,
    start: playValue,
    markers: markers,
    once: true,
    onEnter: () => timeline.play(),
  });
}

function globalHeaderAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  var Webflow = Webflow || [];
  Webflow.push(function () {
    if (Webflow.env('editor') !== undefined) {
      // Add a class to the body (or other element) when in Editor mode
      document.body.classList.add('is-editor-mode');
    } else {
      document.body.classList.add('is-no-editor');
    }
  });
  function heroAnime() {
    const tl = gsap.timeline({ paused: true, once: true });
    const sec = document.querySelector('[hero-sec]');
    if (!sec) return;
    const pillLines = sec?.querySelectorAll('.line-mask');
    const items = sec?.querySelectorAll('[hero-items]');
    const images = sec?.querySelectorAll('.home_hero-img');

    if (pillLines) {
      tl.to(pillLines, {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: {
          amount: 0.3,
        },
        ease: textEase,
      });
    }

    if (items) {
      tl.to(
        items,
        {
          opacity: 1,
          y: '0rem',
          duration: 1,
          stagger: {
            amount: 0.3,
          },
          ease: textEase,
        },
        '>-0.3'
      );
    }

    if (images) {
      tl.to(
        images,
        {
          scale: 1,
          duration: 1.5,
          stagger: {
            amount: 0.3,
          },
          ease: textEase,
        },
        '0.5'
      );
    }

    tl.play();
  }

  const body = document.querySelector('body');
  if (body.classList.contains('is-editor-mode')) return;

  heroAnime();
}

async function globalScrollAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  var Webflow = Webflow || [];
  Webflow.push(function () {
    if (Webflow.env('editor') !== undefined) {
      // Add a class to the body (or other element) when in Editor mode
      document.body.classList.add('is-editor-mode');
    } else {
      document.body.classList.add('is-no-editor');
    }
  });

  function fadeupAnime() {
    const allItems = document.querySelectorAll('[anime-fade-up]');
    allItems.forEach((item) => {
      let tl = gsap.timeline({ paused: true });
      createScrollTrigger(item, tl, 'top 75%', 'top bottom', false);

      tl.from(item, {
        opacity: 0,
        y: '2rem',
        duration: 1.2,
        ease: textEase,
      });
    });
  }
  function fadeAnime() {
    const allItems = document.querySelectorAll('[anime-fade]');
    allItems.forEach((item) => {
      let tl = gsap.timeline({ paused: true });
      createScrollTrigger(item, tl, 'top 75%', 'top bottom', false);

      tl.from(item, {
        opacity: 0,
        duration: 1.2,
        ease: textEase,
      });
    });
  }

  const body = document.querySelector('body');
  if (body.classList.contains('is-editor-mode')) return;

  fadeAnime();
  fadeupAnime();
}

window.globalScrollAnimation = globalScrollAnimation;

document.fonts.ready.then(() => {
  headerSplit();
  globalHeaderAnimation();
});

//only for FAQs and accordian
document.addEventListener('DOMContentLoaded', async () => {
  await addingFaqToPage();
  accordian();
});

document.addEventListener('DOMContentLoaded', function () {
  initFilterToggle();
  globalSwiper();
  hideEmptyButn();
  mobileNavClose();
});

window.addEventListener('load', () => {
  textFormating();
});
