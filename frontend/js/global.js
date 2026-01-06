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

function hideEmptyButn() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((butn) => {
    const text = butn.querySelector('.button-txt');
    if (text) {
      if (text.innerHTML === '') butn.style.display = 'none';
    }
  });
}

window.formatCreatedAgo = formatCreatedAgo;

document.addEventListener('DOMContentLoaded', function () {
  initFilterToggle();
  globalSwiper();
  accordian();
  hideEmptyButn();
});
