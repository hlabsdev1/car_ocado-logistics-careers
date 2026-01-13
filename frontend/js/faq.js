gsap.registerPlugin(ScrollToPlugin);

function clickToScroll() {
  const allButns = document.querySelectorAll('.faq-nav_link');
  allButns.forEach((butn) => {
    const attr = butn.getAttribute('team-cat');
    butn.addEventListener('click', () => {
      const allCategory = document.querySelectorAll('.faq-page_header');
      allCategory.forEach((cat) => {
        console.log(attr);
        if (cat.getAttribute('team-cat') === attr) {
          gsap.to(window, { duration: 1, scrollTo: { y: cat, offsetY: 100 } });
        }
      });
    });
  });
}

clickToScroll();
