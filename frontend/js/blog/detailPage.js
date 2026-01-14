function blogDetail() {
  const section = document.querySelector('.blog-section');
  const blogWrap = section.querySelector('.blog-wrap');
  const emptyWrap = section?.querySelector('.w-dyn-empty');

  if (emptyWrap) {
    section.style.display = 'none';
  }
}

var Webflow = Webflow || [];

Webflow.push(function () {
  blogDetail();
  globalScrollAnimation();
});
