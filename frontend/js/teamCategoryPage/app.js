function individualPage() {
  async function init() {
    const data = await getData();
    const locations = await getLocations();

    const dataItems = data.items;

    const cities = globalCities;

    const teamCategories = [
      { Name: 'Head Office', Color: '#f7ea48' },
      { Name: 'Warehouse', Color: '#6ad1e3' },
      { Name: 'HGV/LGV Transport', Color: '#fb83ad' },
      { Name: 'Customer Delivery', Color: '#49c5b1' },
    ];

    // COMBINNING ALL DATA STRUCTURE-
    // HOW'S ITS NESTED
    // Jobs > subLocation(example: CFC Dordon) > City(Tamworth)
    const city_map = new Map();
    cities.forEach((city) => {
      const key = city.Name;
      if (!city_map.has(key)) {
        city_map.set(key, []);
      }
      city_map.get(key).push({
        lat: city.Latitude,
        lan: city.Longitude,
      });
    });

    const teamCat_map = new Map();
    teamCategories.forEach((cat) => {
      const key = cat.Name;
      teamCat_map.set(key, cat.Color);
    });

    //Using City map array and adding it to locations object
    const enrichedSubLocation = locations.map((loc) => ({
      ...loc,
      cityCoords: city_map.get(loc.City) || [],
      color: teamCat_map.get(loc.Category) || null,
    }));

    //With the new location map object we are mapping new array for jobs that matches with each other
    const subLoc_map = new Map();
    enrichedSubLocation.forEach((loc) => {
      const key = loc.Code;
      if (!subLoc_map.has(key)) {
        subLoc_map.set(key, []);
      }
      subLoc_map.get(key).push(loc);
    });

    //Adding all match location with matched jobs
    const allJobs = dataItems.map((job) => ({
      ...job,
      subLocation: subLoc_map.get(job.location.location_code) || [],
    }));

    //Function calling-
    addingCityJobs(allJobs);
    sectionHideIfEmpty();
    await globalScrollAnimation();
  }

  init();

  function addingCityJobs(allJobs) {
    const body = document.querySelector('body');
    let bodyAttr = body.getAttribute('team-category');

    if (bodyAttr === 'LGV Drivers') {
      bodyAttr = 'HGV/LGV Transport';
      console.log(bodyAttr);
    }

    // console.log(bodyAttr);

    // console.log(allJobs);

    const filteredJobs = allJobs.filter((job) => {
      const city = job.subLocation[0]?.Category.toLowerCase();
      // console.log(city, bodyAttr);
      return city === bodyAttr.toLowerCase();
    });

    // console.log(filteredJobs);

    const swiperComp = document.querySelector(
      "[swiper-component='team-category']",
    );
    const swiperWrap = swiperComp.querySelector('.swiper-wrapper');
    const swiperItem = swiperComp.querySelector('.swiper-slide');
    const noJobCard = document.querySelector('.no-job-card');
    swiperItem.remove();

    if (filteredJobs.length === 0) {
      noJobCard.style.display = 'flex';
      noJobCard.style.opacity = '1';
      return;
    }

    // if (filteredJobs.length === 0) return;

    filteredJobs.forEach((job) => {
      const newItem = swiperItem.cloneNode(true);
      const card = newItem.querySelector('.search-item');
      const job_name = card.querySelector('[search-field="job-name"]');
      const job_type = card.querySelector('[search-field="job-type"]');
      const job_category = card.querySelector('[search-field="category"]');
      const locationName = card.querySelector('[search-field="location-name"]');
      const date = card.querySelector('[search-field="date-posted"]');
      const applyLink = card.querySelector('.cta-link');
      const job_categoryWrap = job_category.parentNode;

      const newUrl = job.application_url.split('/apply')[0];
      job_categoryWrap.style.background = job.subLocation[0]?.color;

      job_name.innerHTML = job.title;
      locationName.innerHTML = job.subLocation[0]?.Name;
      job_type.innerHTML = job.job_schedule.replace('_', ' ');
      job_category.innerHTML = job.subLocation[0]?.Category;
      date.innerHTML = formatCreatedAgo(job.creation_date);
      applyLink.href = newUrl;
      swiperWrap.appendChild(newItem);
    });
    citySlider();
  }

  function citySlider() {
    const swiperComponent = document.querySelector(
      "[swiper-component='team-category']",
    );

    const swiperContainer = swiperComponent.querySelector('.swiper');
    const nextEl = swiperComponent.querySelector('.swiper-arrow.is--next');
    const prevEl = swiperComponent.querySelector('.swiper-arrow.is--prev');
    const pagination = swiperComponent.querySelector('.swiper-pagination');
    const bullet = swiperComponent.querySelector('.swiper-bullet');
    const swiperComp = new Swiper(swiperContainer, {
      slidesPerView: 'auto',
      followFinger: true,
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
      //   pagination: {
      //     el: pagination,
      //     bulletClass: 'swiper-bullet',
      //     bulletActiveClass: 'is--active',
      //     clickable: true,
      //   },
    });
  }

  function sectionHideIfEmpty() {
    const sec = document.querySelector('.life-logistic-section');
    const container = sec.querySelector('.container');
    console.log(sec);
    if (container.classList.contains('w-condition-invisible')) {
      const vertPad = sec.querySelector('.padding-vertical');
      vertPad.classList.add('is--top-0px');
    }
  }
}

individualPage();
