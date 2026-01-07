function blogFilters() {
  const wrapper = document.querySelector('.blog-page_filter-wrap');

  const allItems = wrapper.querySelectorAll('.blog-item');
  const filterMenu = wrapper.querySelector('.blog-p_filter-menu');
  const oldFilterItems = wrapper.querySelectorAll('.blog-p_link');
  const noResult = wrapper.querySelector('.no-job-card');
  const all_filterButn = oldFilterItems[0].cloneNode(true);
  filterMenu.insertBefore(all_filterButn, filterMenu.children[0]);

  const allButnTxt = all_filterButn.querySelector('.blog-p_link-txt');
  allButnTxt.textContent = 'All';
  all_filterButn.setAttribute('blog-category', 'all');

  const newFilterButtons = wrapper.querySelectorAll('.blog-p_link');
  newFilterButtons[0].classList.add('is--active');

  //Filter butn click function
  newFilterButtons.forEach((butn) => {
    butn.addEventListener('click', () => {
      const attr = butn.getAttribute('blog-category');

      newFilterButtons.forEach((item) => {
        if (item.classList.contains('is--active')) {
          item.classList.remove('is--active');
        }
      });

      butn.classList.add('is--active');

      //Show active category items
      allItems.forEach((item) => {
        if (attr === item.getAttribute('blog-category')) {
          if (item.classList.contains('is--hide')) {
            item.classList.remove('is--hide');
          }
        } else if (attr === 'all') {
          if (item.classList.contains('is--hide')) {
            item.classList.remove('is--hide');
          }
        } else {
          if (!item.classList.contains('is--hide')) {
            item.classList.add('is--hide');
          }
        }
      });

      const hideItems = wrapper.querySelectorAll('.blog-item.is--hide');

      const isNoItemShowing = allItems.length === hideItems.length;

      if (isNoItemShowing) {
        noResult.style.display = 'flex';
        noResult.style.opacity = '1';
      } else {
        noResult.style.display = '';
        noResult.style.opacity = '';
      }
    });
  });
}

var Webflow = Webflow || [];

Webflow.push(function () {
  blogFilters();
});
