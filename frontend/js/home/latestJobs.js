function latestJobs(allJobs) {
  //Get all Filters to add to filter buttons
  //show all items
  //Create 2 filters - 1. filter button , 2. Search filer

  const filterComp = document.querySelector('[hs-list-element="filter-wrap2"]');
  const filters = filterComp.querySelector('[hs-list-element="filter"]');
  const resultContainer = filterComp.querySelector('[hs-list-element="list"]');
  const searchInput = filterComp.querySelector(
    '[hs-list-element="search"] input'
  );
  const searchTemplate = document.getElementById('search-template');

  const jobCategories = [
    ...new Set(
      allJobs.map((item) => item.job_family?.job_family_name).filter(Boolean)
    ),
  ];

  //Adding all button
  const allButn = document.createElement('div');
  allButn.classList.add('filter-button');
  allButn.innerHTML = 'All';
  allButn.setAttribute('filter-category', 'All');
  filters.append(allButn);

  //Adding categories to the filter list
  jobCategories.forEach((cat) => {
    const div = document.createElement('div');
    div.classList.add('filter-button');
    div.innerHTML = cat;
    div.setAttribute('filter-category', cat);
    filters.append(div);
  });

  let activeJobs = allJobs.map((job) => {
    const card = searchTemplate.content.cloneNode(true).children[0];
    const job_name = card.querySelector('[search-field="job-name"]');
    const job_type = card.querySelector('[search-field="job-type"]');
    const job_category = card.querySelector('[search-field="category"]');
    const locationName = card.querySelector('[search-field="location-name"]');
    const applyLink = card.querySelector('.cta-link');

    const newUrl = job.application_url.split('/apply')[0];

    job_name.innerHTML = job.title;
    locationName.innerHTML = job.subLocation[0]?.Name;
    job_type.innerHTML = job.job_schedule;
    job_category.innerHTML = job.job_family?.job_family_name;
    applyLink.href = newUrl;

    // card.classList.add('is--hide');
    resultContainer.append(card);
    //Returing the data we can filter with.
    return {
      jobName: job.title,
      jobCategory: job.job_family?.job_family_name,
      cityName: job.subLocation[0]?.City,
      locationName: job.subLocation[0]?.Name,
      postalCode: job.subLocation[0]?.['Postal Code'],
      element: card,
    };
  });

  //Adding event listener for input change
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    let jobShowing = false;

    //With returned data on activeJobs we can filter if anything we type includes the below data if yes then toggle class.
    activeJobs.forEach((job) => {
      const isVisible =
        (job.jobName || '').toLowerCase().includes(value) ||
        (job.jobCategory || '').toLowerCase().includes(value) ||
        (job.cityName || '').toLowerCase().includes(value) ||
        (job.locationName || '').toLowerCase().includes(value);

      job.element.classList.toggle('is--hide', !isVisible);
      if (isVisible) jobShowing = true;
    });
  });

  //Get all filter button
  const allFilterButns = filters.querySelectorAll('.filter-button');
  allFilterButns.forEach((butn) => {
    const attr = butn.getAttribute('filter-category').toLowerCase();
    butn.addEventListener('click', () => {
      if (attr !== 'all') {
        activeJobs.forEach((job) => {
          const isVisible = (job.jobCategory || '').toLowerCase() === attr;
          job.element.classList.toggle('is--hide', !isVisible);
        });
      } else {
        activeJobs.forEach((job) => {
          if (job.element.classList.contains('is--hide')) {
            job.element.classList.remove('is--hide');
          }
        });
      }
    });
  });
}

window.latestJobs = latestJobs;
