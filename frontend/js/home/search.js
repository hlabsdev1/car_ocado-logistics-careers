function search(allJobs) {
  //So here we are creating a new map array that city has

  // console.log(allJobs);

  //Html targets variable for search features
  const searchInput = document.getElementById('home-search');
  const searchTemplate = document.getElementById('search-template');
  const resultContainer = document.querySelector('.search-results-wrap');
  const emptyCard = searchTemplate.content.cloneNode(true).children[2];

  console.log(allJobs);

  //Creating new objects with allJobs and adding job cards in the search area. And changing text and all
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

    card.classList.add('is--hide');
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

  //Adding empty job card
  resultContainer.append(emptyCard);
  emptyCard.classList.add('is--hide');

  //Adding event listener for input change
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    let jobShowing = false;

    if (value === '') {
      activeJobs.forEach((job) => job.element.classList.add('is--hide'));
      return;
    }
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

    if (value !== '') {
      emptyCard.classList.toggle('is--hide', jobShowing);
    }
  });
}

window.search = search;
