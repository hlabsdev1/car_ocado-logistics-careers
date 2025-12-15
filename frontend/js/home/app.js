//function
function teamCatTab() {
  const tabs = document.querySelector('.team-cat_tabs');
  const allLinks = tabs.querySelectorAll('.team-cat_menu .team-cat_link');
  const tabPane = tabs.querySelectorAll('.team-cat_pane');
  const nextButn = tabs.querySelector('.swiper-arrow.is--next');
  const prevButn = tabs.querySelector('.swiper-arrow.is--prev');
  allLinks[0].classList.add('is--active');
  tabPane[0].classList.add('is--active');
  let currentIndex = 0;

  allLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      const attr = link.getAttribute('team-cat');
      currentIndex = index;
      console.log(currentIndex);
      //Tab pane method
      tabPane.forEach((pane) => {
        if (pane.getAttribute('team-cat') === attr) {
          pane.classList.add('is--active');
        } else {
          pane.classList.remove('is--active');
        }
      });

      //tab link
      allLinks.forEach((link) => {
        link.classList.remove('is--active');
      });

      link.classList.add('is--active');

      if (currentIndex === tabPane.length - 1) {
        nextButn.classList.add('is--disabled');
      } else {
        nextButn.classList.remove('is--disabled');
      }

      if (currentIndex <= 0) {
        prevButn.classList.add('is--disabled');
      } else {
        prevButn.classList.remove('is--disabled');
      }
    });
  });

  //Prev and Nex functionality
  function handleIndexChange() {
    //tab Panes
    if (tabPane[currentIndex]) {
      tabPane.forEach((pane) => {
        pane.classList.remove('is--active');
      });
      tabPane[currentIndex].classList.add('is--active');
    }

    if (allLinks[currentIndex]) {
      allLinks.forEach((link) => {
        link.classList.remove('is--active');
      });
      allLinks[currentIndex].classList.add('is--active');
    }

    if (currentIndex === tabPane.length - 1) {
      nextButn.classList.add('is--disabled');
    } else {
      nextButn.classList.remove('is--disabled');
    }

    if (currentIndex <= 0) {
      prevButn.classList.add('is--disabled');
    } else {
      prevButn.classList.remove('is--disabled');
    }

    //tab links
  }

  nextButn.addEventListener('click', () => {
    if (currentIndex < tabPane.length - 1) {
      currentIndex++;
      handleIndexChange();
    }
  });

  prevButn.addEventListener('click', () => {
    if (currentIndex > -1) {
      currentIndex--;
      handleIndexChange();
    }
  });

  handleIndexChange();
}

//calling function
document.addEventListener('DOMContentLoaded', function () {
  teamCatTab();
});
