function search(allJobs) {
  //So here we are creating a new map array that city has

  // console.log(allJobs);

  //Html targets variable for search features
  const searchInput = document.getElementById('home-search');
  const searchTemplate = document.getElementById('search-template');
  const resultContainer = document.querySelector('.search-results-wrap');

  // console.log(searchTemplate);

  //Creating new objects with allJobs and adding job cards in the search area. And changing text and all
  let activeJobs = allJobs.map((job) => {
    const card = searchTemplate.content.cloneNode(true).children[0];
    const job_name = card.querySelector('[search-field="job-name"]');
    const summary = card.querySelector('[search-field="summary"]');
    const locationName = card.querySelector('[search-field="location-name"]');
    const address = card.querySelector('[search-field="address"]');

    job_name.innerHTML = job.job_family?.job_family_name;
    summary.innerHTML = job.short_description;
    locationName.innerHTML = job.subLocation[0]?.Name;
    address.innerHTML = job.subLocation[0]?.['Address Line 1'];

    card.classList.add('is--hide');
    resultContainer.append(card);
    //Returing the data we can filter with.
    return {
      jobName: job.job_family?.job_family_name,
      cityName: job.subLocation[0]?.City,
      locationName: job.subLocation[0]?.Name,
      postalCode: job.subLocation[0]?.['Postal Code'],
      element: card,
    };
  });

  //Adding event listener for input change
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    if (value === '') {
      activeJobs.forEach((job) => job.element.classList.add('is--hide'));
      return;
    }
    //With returned data on activeJobs we can filter if anything we type includes the below data if yes then toggle class.
    activeJobs.forEach((job) => {
      const isVisible =
        (job.jobName || '').toLowerCase().includes(value) ||
        (job.cityName || '').toLowerCase().includes(value) ||
        (job.locationName || '').toLowerCase().includes(value);

      job.element.classList.toggle('is--hide', !isVisible);
    });
  });
}

window.search = search;
