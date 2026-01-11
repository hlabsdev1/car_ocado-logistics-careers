function individualPage() {
  console.log('city page');
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
      { Name: 'Nottingham', Latitude: '52.8891615', Longitude: '-1.2119526' },
      {
        Name: 'Welwyn Garden',
        Latitude: '51.8004995',
        Longitude: '-0.2154367',
      },
      { Name: 'Cheadle', Latitude: '53.3892279', Longitude: '-2.2219235' },
      { Name: 'Bristol', Latitude: '51.5034318', Longitude: '-2.692053' },
      { Name: 'Batley', Latitude: '53.7177488', Longitude: '-1.649682' },
      { Name: 'Sheffield', Latitude: '53.4060214', Longitude: '-1.4355539' },
      { Name: 'West Drayton', Latitude: '51.5067427', Longitude: '-0.482832' },
      { Name: 'Peterborough', Latitude: '52.5872424', Longitude: '-0.4656888' },
      { Name: 'West Byfleet', Latitude: '51.3359755', Longitude: '-0.5150371' },
      { Name: 'Faringdon', Latitude: '51.6533271', Longitude: '-1.5913673' },
      { Name: 'Enfield', Latitude: '51.6770953', Longitude: '-0.0253464' },
      { Name: 'Walthamstow', Latitude: '51.5869295', Longitude: '-0.0364782' },
      { Name: 'Dordon', Latitude: '52.5973413', Longitude: '-1.6361482' },
      { Name: 'Purfleet', Latitude: '51.4819849', Longitude: '0.2189419' },
      { Name: 'Acton', Latitude: '51.5110082', Longitude: '-0.285113' },
      { Name: 'Merton', Latitude: '51.4108579', Longitude: '-0.2303774' },
      { Name: 'Leeds', Latitude: '53.8060756', Longitude: '-1.6181321' },
      { Name: 'Weybridge', Latitude: '51.3643145', Longitude: '-0.4936076' },
      { Name: 'Wimbledon', Latitude: '51.4273718', Longitude: '-0.2444494' },
      { Name: 'Hatfield', Latitude: '51.7677521', Longitude: '-0.2856383' },
      { Name: 'Leyton', Latitude: '51.5657024', Longitude: '-0.0441656' },
      { Name: 'Manchester', Latitude: '53.4722462', Longitude: '-2.3793467' },
      { Name: 'Oxford', Latitude: '51.7570462', Longitude: '-1.2570928' },
      { Name: 'Park Royal', Latitude: '51.5303258', Longitude: '-0.2826022' },
      { Name: 'Knowsley', Latitude: '53.4484602', Longitude: '-2.8639499' },
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
    map(dataItems, locations, cities);
    addingCityJobs(allJobs);
    addingNumToCards();
  }

  init();

  function map(jobData, locations, cities) {
    /*===========
      VARIABLES
      ==============*/
    const mapCanva = document.querySelector('#map-canva');
    const accessToken =
      'pk.eyJ1IjoiaGxhYnMiLCJhIjoiY2w1d2JqeHZlMGR6eTNibTViZ3czc28ycyJ9.p5A4twIQJID-f1Tci32wWA';
    const hStyle = 'mapbox://styles/hlabs/cmj7a440w000f01s929gs8c9d';
    const searchTemplate = document.getElementById('search-template');
    const bodyAttr = document
      .querySelector('body')
      .getAttribute('city-name')
      .toLowerCase();

    //Mapping function - getting key from jobData to match with specific city
    const jobMap = new Map();
    jobData.forEach((job) => {
      const key = job.location.location_code;
      if (!jobMap.has(key)) {
        jobMap.set(key, []);
      }
      jobMap.get(key).push(job);
    });

    //checking if jobMap data match with locations if yes-
    // then adding jobMap inside locations.
    const enrichedLocation = locations.map((loc) => ({
      ...loc,
      allJobs: jobMap.get(loc.Code) || [],
    }));

    // console.log(enrichedLocation);

    //Checking key in enrichedlocation
    const enrichedMap = new Map();
    enrichedLocation.forEach((loc) => {
      const key = loc.City;
      if (!enrichedMap.has(key)) {
        enrichedMap.set(key, []);
      }
      enrichedMap.get(key).push(loc);
    });

    //Adding all data in cities
    cities.forEach((city) => {
      city.locations = enrichedMap.get(city.Name) || [];
    });

    // console.log(cities);

    const InnerLocations = cities.find((cityName) => {
      const city = cityName?.Name.toLowerCase();
      // console.log(city, bodyAttr);
      return city === bodyAttr;
    });

    // console.log(InnerLocations);
    // console.log(InnerLocations.locations);

    // console.log(mainListItems);

    // create empty locations geojson object
    let mapLocations = {
      type: 'FeatureCollection',
      features: [],
    };

    let selectedMapLocations = [];

    mapboxgl.accessToken = accessToken;

    const isMobile = window.innerWidth <= 768; // Check for mobile devices
    const map = new mapboxgl.Map({
      container: mapCanva,
      style: hStyle,
      center: [InnerLocations.Longitude, InnerLocations.Latitude], //28.334115149095556, -81.50494910779616
      // zoom: 4.0,
      zoom: isMobile ? 12.0 : 12.0, // Different zoom for mobile
      minZoom: 5,
      maxZoom: 18,
      attributionControl: false, // Remove Mapbox branding
    });
    map.scrollZoom.disable();

    // Remove the Mapbox logo
    const logo = document.querySelector('.mapboxgl-ctrl-logo');
    if (logo) logo.remove();

    // Add zoom and rotation controls to the map.
    // Add zoom controls only
    const zoomControl = new mapboxgl.NavigationControl({
      showZoom: true, // Enable zoom controls
      showCompass: false, // Disable the compass (rotation controls)
    });

    // Add the controls to the bottom-right corner
    map.addControl(zoomControl, 'bottom-right');

    // console.log(listLocations.length);

    const cityMarkers = [];

    // For each colleciton item, grab hidden fields and convert to geojson proerty
    function getGeoData() {
      InnerLocations.locations.forEach((loc, i) => {
        const coordinates = {
          lng: loc.Logtitude,
          lat: loc.Latitude,
        };
        const cityName = loc.Name;

        let arrayID = i + 1 - 1;
        let geoData = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          properties: {
            arrayID: arrayID,
            cityName: cityName,
            allJobs: loc.allJobs,
            address: loc['Address Line 1'],
          },
        };
        if (mapLocations.features.includes(geoData) === false) {
          mapLocations.features.push(geoData);
        }
      });
    }

    // define mapping function to be invoked later
    function addMapPoints() {
      let missingData = [];

      const icon =
        'https://cdn.prod.website-files.com/691db317d5523108e489fad8/6925c33b02c9af6561d992cf_Location%20Pin.svg';

      //NEW CUSTOM MAP PINS CODE
      mapLocations.features.forEach((location) => {
        const { coordinates } = location.geometry;
        const { arrayID, cityName, coords, allJobs, address } =
          location.properties;

        // console.log(location.properties);

        // City Marker
        const cityEl = document.createElement('div');
        cityEl.className = 'map-marker is--inner';
        cityEl.style.position = 'absolute';

        // imgElement.src = icon;
        const imgElement = searchTemplate.content
          .cloneNode(true)
          .querySelector('[map-marker]');

        cityEl.append(imgElement);

        cityEl.setAttribute('data-marker-id', `marker-${arrayID}`);
        cityEl.setAttribute('location-name', `${cityName}`);

        if (!coordinates) {
          // console.log(placeName);
          missingData.push(placeName);
          return;
        }
        //only add city markers when more than 1 job
        //for now changing it to 0- Change later
        const cityMarker = new mapboxgl.Marker(cityEl)
          .setLngLat(coordinates)
          .addTo(map);
        cityMarkers.push({
          marker: cityMarker,
          markerEl: cityEl,
          arrayID,
          cityName,
        });

        //------------------------------------------------------------------

        // Add event listeners for interactivity
        cityEl.addEventListener('click', () => {
          // map.flyTo({
          //   center: coordinates,
          //   speed: 0.5,
          //   curve: 1,
          //   zoom: 9,
          // });

          // Push event details to the Data Layer
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'map_pin_click',
            place_name: arrayID, // Replace 'id' with the name or ID of the place
          });

          // console.log("Pin clicked:", id); // Debugging

          // const panel = document.getElementById('city-map-card');
          // panel.innerHTML = getPopupHtml(address, jobArray);
          // panel.classList.remove('is--hidden');
        });

        const jobArray = Array.isArray(allJobs) ? allJobs : [];
        if (!jobArray) return;

        // Create a popup
        const popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true,
          //offset: -40,
        });

        const addingPopup = popup
          .setLngLat(coordinates)
          .setHTML(getPopupHtml(address, jobArray));

        function popupMediaQuery() {
          const desktopMedia = window.innerWidth > 991;
          // Add hover event listeners for marker
          cityEl.addEventListener('click', (e) => {
            e.stopPropagation();

            document.querySelectorAll('.mapboxgl-popup').forEach((p) => {
              p.remove();
            });
            addingPopup.addTo(map);
            cityEl.style.zIndex = '3';
          });
        }

        // Check on page load
        popupMediaQuery();
      });
    }

    // console.log(locations);

    function getPopupHtml(address, jobArray) {
      const jobList = jobArray
        .map((a) => {
          const category = a.job_family?.job_family_name || '';
          return `
                <li category="${category}" class="popup_vac-list-item">
                   <a href=${a.application_url} target="_blank" class="popup_vac-link">${a.title}</a>
                </li>
                `;
        })
        .join('');

      return `
                <div class="popup-box_inner"><div class="popup-box_logo"><img   
                src="https://cdn.prod.website-files.com/691db317d5523108e489fad8/69258ded2f4eac43ffca5f1b_ocado-logo.svg" loading="lazy" alt=""></div>
                <div class="popup-box_content">
                <div>${address}</div>
                <div class="popup-box_vac">
                <div class="popup-box-header">Vacancies</div>
                <ul role="list" class="popup-box_vac-list">
                ${jobList}
                </ul>
                </div>
                </div></div>
        `;
    }

    getGeoData();

    //Hiding Map is there is zero jobs
    let totalJobs = 0;
    mapLocations.features.forEach((loc) => {
      const lengthOfJobs = loc.properties.allJobs.length;
      totalJobs += lengthOfJobs;
    });

    // if (mapLocations.features.length === 0 && totalJobs === 0) {
    //   const mapSec = document.querySelector('.map-section');
    //   mapSec.style.display = 'none';
    // } else {
    //   addMapPoints();
    // }

    if (totalJobs === 0) {
      const mapSec = document.querySelector('.map-section');
      mapSec.style.display = 'none';
    } else {
      addMapPoints();
    }
  }

  function addingCityJobs(allJobs) {
    const bodyAttr = document
      .querySelector('body')
      .getAttribute('city-name')
      .toLowerCase();

    // console.log(allJobs);

    const filteredJobs = allJobs.filter((job) => {
      const city = job.subLocation[0]?.City.toLowerCase();
      return city === bodyAttr;
    });

    const swiperComp = document.querySelector("[swiper-component='city-jobs']");
    const swiperWrap = swiperComp.querySelector('.swiper-wrapper');
    const swiperItem = swiperComp.querySelector('.swiper-slide');
    const noJobCard = document.querySelector('.no-job-card');
    swiperItem.remove();

    if (filteredJobs.length === 0) {
      noJobCard.style.display = 'flex';
      noJobCard.style.opacity = '1';
      const jobSectionPadding = document.querySelector(
        '.job-2col-section .padding-vertical'
      );
      jobSectionPadding.classList.add('is--bottom-0px');
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
      "[swiper-component='city-jobs']"
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

  function addingNumToCards() {
    // Test Function
    const allCards = document.querySelectorAll('.why-join_card');
    if (!allCards) return;

    allCards.forEach((card, index) => {
      const tag = card.querySelector('.num-tag');
      tag.innerHTML = `0${index + 1}`;
    });
  }
}

individualPage();
