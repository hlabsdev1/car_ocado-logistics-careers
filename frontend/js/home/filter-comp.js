function filterComp(allJobs) {
  console.log(allJobs);
  const filterComponent = document.querySelectorAll(
    '[hs-list-element="filter-wrap"]'
  );
  const searchTemplate = document.getElementById('search-template');

  filterComponent.forEach((comp) => {
    const filterWrap = comp.querySelector('[hs-list-element="filter"]');
    const resultWrap = comp.querySelector('[hs-list-element="list"]');
    const city_filterMenu = comp.querySelector(
      '[map-filter="city"] .filter-tab-menu'
    );
    const category_filterMenu = comp.querySelector(
      '[map-filter="category"] .filter-tab-menu'
    );
    const jobType_filterMenu = comp.querySelector(
      '[map-filter="jobType"] .filter-tab-menu'
    );

    //Adding all jobs in the page
    allJobs.forEach((job) => {
      const card = searchTemplate.content.cloneNode(true).children[0];
      card.setAttribute('hs-city', job.subLocation[0]?.City);
      card.setAttribute('hs-category', job.job_family?.job_family_name || '');
      card.setAttribute('hs-jobType', job.job_schedule || '');
      const job_name = card.querySelector('[search-field="job-name"]');
      const summary = card.querySelector('[search-field="summary"]');
      const locationName = card.querySelector('[search-field="location-name"]');
      const jobType = card.querySelector('[search-field="address"]');

      job_name.innerHTML = job.title;
      summary.innerHTML = job.job_family?.job_family_name || '';
      locationName.innerHTML = job.subLocation[0]?.City || '';
      jobType.innerHTML = job.job_schedule;

      // card.classList.add('is--hide');
      resultWrap.append(card);
    });

    //Adding filters content

    //Mapping job data for filter categories
    const cities = [
      ...new Set(allJobs.map((item) => item.subLocation[0]?.City)),
    ];
    const categories = [
      ...new Set(
        allJobs.map((item) => item.job_family?.job_family_name).filter(Boolean)
      ),
    ];
    const jobTypes = [...new Set(allJobs.map((item) => item.job_schedule))];

    //Adding cities
    cities.forEach((e) => {
      const li = searchTemplate.content
        .cloneNode(true)
        .children[1].querySelector('li');
      li.setAttribute('hs-city', e);
      li.innerHTML = e;
      city_filterMenu.append(li);
    });

    //Adding Categories
    categories.forEach((e) => {
      const li = searchTemplate.content
        .cloneNode(true)
        .children[1].querySelector('li');
      li.setAttribute('hs-category', e);
      li.innerHTML = e;
      category_filterMenu.append(li);
    });

    //Adding Job Types
    jobTypes.forEach((e) => {
      const li = searchTemplate.content
        .cloneNode(true)
        .children[1].querySelector('li');
      li.setAttribute('hs-jobType', e);
      li.innerHTML = e;
      jobType_filterMenu.append(li);
    });

    function filterSystem() {
      const addedJobs = comp.querySelectorAll('.search-item');
      const cityButtons = city_filterMenu.querySelectorAll('li');
      const categoryButtons = category_filterMenu.querySelectorAll('li');
      const jobTypesButtons = jobType_filterMenu.querySelectorAll('li');

      let activeFilters = {
        city: [],
        category: [],
        jobType: [],
      };

      function applyFilters() {
        // console.log(activeFilters.category.length);
        let activeJobs = Array.from(addedJobs).filter((item) => {
          const city_attr = item.getAttribute('hs-city');
          const category_attr = item.getAttribute('hs-category') || '';
          const jobType_attr = item.getAttribute('hs-jobType');
          const cityMatch =
            activeFilters.city.length === 0 ||
            activeFilters.city.includes(city_attr);
          const categoryMatch =
            activeFilters.category.length === 0 ||
            activeFilters.category.includes(category_attr);
          const jobTypeMatch =
            activeFilters.jobType.length === 0 ||
            activeFilters.jobType.includes(jobType_attr);

          return cityMatch && categoryMatch && jobTypeMatch;
        });
        renderActiveJobs(activeJobs);
      }

      function renderActiveJobs(activeJobs) {
        addedJobs.forEach((item) => {
          item.classList.add('is--hide');
        });

        activeJobs.forEach((item) => {
          item.classList.remove('is--hide');
        });
      }

      cityButtons.forEach((butn) => {
        butn.addEventListener('click', () => {
          const attr = butn.getAttribute('hs-city');
          activeFilters.city = attr;
          applyFilters();
        });
      });

      categoryButtons.forEach((butn) => {
        butn.addEventListener('click', () => {
          const attr = butn.getAttribute('hs-category');
          activeFilters.category = attr;
          console.log(activeFilters.category);
          applyFilters();
        });
      });

      jobTypesButtons.forEach((butn) => {
        butn.addEventListener('click', () => {
          const attr = butn.getAttribute('hs-jobType');
          activeFilters.jobType = attr;
          applyFilters();
        });
      });

      applyFilters();
    }

    filterSystem();
  });
}

window.filterComp = filterComp;
