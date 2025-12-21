function individualPage() {
  async function init() {
    const data = await getData();
    const locations = await getLocations();

    const dataItems = data.items;

    const cities = [
      { Name: 'Luton', Latitude: '51.8924256', Longitude: '-0.4980802' },
      { Name: 'Erith', Latitude: '51.4813071', Longitude: '0.1594783' },
      { Name: 'Bicester', Latitude: '51.9019091', Longitude: '-1.1653087' },
      { Name: 'Andover', Latitude: '51.2125372', Longitude: '-1.5088589' },
      { Name: 'London', Latitude: '51.5394346', Longitude: '-0.1911704' },
      { Name: 'Tamworth', Latitude: '52.6309798', Longitude: '-1.7684685' },
      {
        Name: 'South Ockendon',
        Latitude: '51.5192234',
        Longitude: '0.2773649',
      },
      { Name: 'Hatfield', Latitude: '51.7657433', Longitude: '-0.2562941' },
      { Name: 'Crawley', Latitude: '51.1121672', Longitude: '-0.1967593' },
      {
        Name: 'Milton Keynes',
        Latitude: '52.0410458',
        Longitude: '-0.7898619',
      },
      { Name: 'Liverpool', Latitude: '53.3973117', Longitude: '-2.9966863' },
      { Name: 'Nottingham', Latitude: '52.9565093', Longitude: '-1.2170722' },
      {
        Name: 'Welwyn Garden',
        Latitude: '51.8004995',
        Longitude: '-0.2154367',
      },
      { Name: 'Cheadle', Latitude: '53.3892279', Longitude: '-2.2219235' },
      { Name: 'Bristol', Latitude: '51.4661608', Longitude: '-2.630469' },
      { Name: 'Batley', Latitude: '53.7177488', Longitude: '-1.649682' },
      { Name: 'Sheffield', Latitude: '53.3865941', Longitude: '-1.5758543' },
      { Name: 'West Drayton', Latitude: '51.5067427', Longitude: '-0.482832' },
      { Name: 'Peterborough', Latitude: '52.5872424', Longitude: '-0.4656888' },
      { Name: 'West Byfleet', Latitude: '51.3359755', Longitude: '-0.5150371' },
      { Name: 'Faringdon', Latitude: '51.6533271', Longitude: '-1.5913673' },
      { Name: 'Enfield', Latitude: '51.6501606', Longitude: '-0.1515596' },
    ];

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
  }

  init();

  function addingCityJobs(allJobs) {
    const bodyAttr = document
      .querySelector('body')
      .getAttribute('team-category')
      .toLowerCase();

    // console.log(allJobs);

    const filteredJobs = allJobs.filter((job) => {
      const city = job.subLocation[0]?.Category.toLowerCase();
      return city === bodyAttr;
    });

    // console.log(filteredJobs);

    const swiperComp = document.querySelector(
      "[swiper-component='team-category']"
    );
    const swiperWrap = swiperComp.querySelector('.swiper-wrapper');
    const swiperItem = swiperComp.querySelector('.swiper-slide');
    swiperItem.remove();

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
      "[swiper-component='team-category']"
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
      //   navigation: {
      //     nextEl: nextEl,
      //     prevEl: prevEl,
      //     disabledClass: 'is--disabled',
      //   },
      // custom pagination
      //   pagination: {
      //     el: pagination,
      //     bulletClass: 'swiper-bullet',
      //     bulletActiveClass: 'is--active',
      //     clickable: true,
      //   },
    });
  }
}

individualPage();
