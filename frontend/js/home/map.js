function map(jobData, locations, cities) {
  /*===========
    VARIABLES
    ==============*/
  const mapCanva = document.querySelector('#map-canva');
  const accessToken =
    'pk.eyJ1IjoiZGVzaWduaGxhYnMiLCJhIjoiY21jajVjY3RlMDBmdTJrczltNWI0MjY0YyJ9.CgE9quHcoUQVtt84P5L5WQ';
  const hStyle = 'mapbox://styles/designhlabs/cmdrfnjwt00iu01r13kn5f6r8';

  console.log(userLat, userLang);
  const userCoords = [userLang, userLat];

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
    center: userLat && userLang ? userCoords : [-2.19842, 53.3378146], //28.334115149095556, -81.50494910779616
    // zoom: 4.0,
    zoom: isMobile ? 12.0 : 6.25, // Different zoom for mobile
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

  //Mapping function - getting key from jobData to match
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

  const cityMarkers = [];
  const innerMarkers = [];

  // For each colleciton item, grab hidden fields and convert to geojson proerty
  function getGeoData() {
    cities.forEach((loc, i) => {
      const coordinates = {
        lng: loc.Longitude,
        lat: loc.Latitude,
      };
      const cityName = loc.Name;
      const locations = loc.locations;

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
          locations: locations,
        },
      };
      if (mapLocations.features.includes(geoData) === false) {
        mapLocations.features.push(geoData);
      }
    });

    // console.log(mapLocations);
  }

  // define mapping function to be invoked later
  function addMapPoints() {
    let missingData = [];

    // Handle zoom visibility toggle function
    function handleZoomVisibility() {
      const z = map.getZoom();
      const showInner = z >= 8;
      innerMarkers.forEach(({ markerEl, isSingleJob, popup }) => {
        // if (isSingleJob) return;
        markerEl.style.visibility = showInner ? 'visible' : 'hidden';
        if (!showInner) popup.remove();
      });
      cityMarkers.forEach(({ markerEl, isSingleJob }) => {
        // if (isSingleJob) return;
        markerEl.style.visibility = showInner ? 'hidden' : 'visible';
      });
    }

    map.on('zoomend', handleZoomVisibility);

    const icon =
      'https://cdn.prod.website-files.com/691db317d5523108e489fad8/6925c33b02c9af6561d992cf_Location%20Pin.svg';
    //NEW CUSTOM MAP PINS CODE
    mapLocations.features.forEach((location) => {
      const { coordinates } = location.geometry;
      const { arrayID, cityName, locations } = location.properties;

      if (!locations || locations.length === 0) return;

      let totalJobs = 0;
      let isSingleJob = false;

      locations.forEach((item) => {
        totalJobs += item.allJobs.length;
      });

      // isSingleJob = totalJobs === 1;
      isSingleJob = totalJobs === 0;

      // console.log(location.properties);

      // City Marker
      const cityEl = document.createElement('div');
      cityEl.className = 'map-marker is--city';
      cityEl.style.position = 'absolute';

      const imgElement = document.createElement('img');
      imgElement.src = icon;
      const numElement = document.createElement('div');
      numElement.className = 'map-marker-num';
      numElement.innerHTML = totalJobs;
      cityEl.appendChild(numElement);

      cityEl.setAttribute('data-marker-id', `marker-${arrayID}`);
      cityEl.setAttribute('location-name', `${cityName}`);
      // el.setAttribute('category-name', `${locationName}`);

      let cityCategories = new Set();
      locations.forEach((loc) => {
        if (!Array.isArray(loc.allJobs)) return;
        loc.allJobs.forEach((job) => {
          const cat = job.job_family?.job_family_name;
          if (cat) cityCategories.add(cat);
        });
      });
      cityCategories = [...cityCategories];

      if (!coordinates) {
        // console.log(placeName);
        missingData.push(placeName);
        return;
      }
      //only add city markers when more than 1 job
      //for now changing it to 0- Change later
      if (totalJobs > 0) {
        const cityMarker = new mapboxgl.Marker(cityEl)
          .setLngLat(coordinates)
          .addTo(map);
        cityMarkers.push({
          marker: cityMarker,
          markerEl: cityEl,
          isSingleJob: false,
          arrayID,
          cityName,
          cityCategories,
        });
      } else {
        cityMarkers.push({
          marker: null,
          markerEl: cityEl,
          isSingleJob: true,
          arrayID,
          cityName,
          cityCategories,
        });
      }

      // Add event listeners for interactivity
      cityEl.addEventListener('click', () => {
        map.flyTo({
          center: coordinates,
          speed: 0.5,
          curve: 1,
          zoom: 9,
        });
        clicked = true;

        // Push event details to the Data Layer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'map_pin_click',
          place_name: arrayID, // Replace 'id' with the name or ID of the place
        });

        // console.log("Pin clicked:", id); // Debugging
      });

      //ADDING INNER LOCATION DATA
      function innerLocShow() {
        locations.forEach((loc) => {
          if (!loc) return;
          const coords = {
            lng: loc.Logtitude,
            lat: loc.Latitude,
          };

          // Location Marker
          const innerEl = document.createElement('div');
          innerEl.className = 'map-marker is--inner';
          innerEl.style.position = 'absolute';
          // innerEl.style.visibility = isSingleJob ? 'visible' : 'hidden';
          innerEl.style.visibility = 'hidden';
          innerEl.setAttribute('category-name', `${loc.Name}`);
          innerEl.setAttribute('location-name', `${cityName}`);

          const imgElement = document.createElement('img');
          imgElement.src = icon;
          innerEl.append(imgElement);

          //skip locations with no jobs
          const jobArray = Array.isArray(loc.allJobs) ? loc.allJobs : [];

          if (!jobArray) return;

          //------------------------------------------------------------------
          // Create a popup
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            //offset: -40,
          });

          const addingPopup = popup
            .setLngLat(coords)
            .setHTML(getPopupHtml(cityName, jobArray));

          function popupMediaQuery() {
            const desktopMedia = window.innerWidth > 991;
            // Add hover event listeners for marker
            innerEl.addEventListener('click', (e) => {
              e.stopPropagation();

              document.querySelectorAll('.mapboxgl-popup').forEach((p) => {
                p.remove();
              });
              addingPopup.addTo(map);
              innerEl.style.zIndex = '3';
            });
          }

          // Check on page load
          popupMediaQuery();

          let categories;
          //Creating categories for each location

          categories = [
            ...new Set(
              jobArray
                .map((item) => item.job_family?.job_family_name)
                .filter(Boolean)
            ),
          ];

          const marker = new mapboxgl.Marker(innerEl)
            .setLngLat(coords)
            .addTo(map);

          innerMarkers.push({
            Name: loc.Name,
            marker,
            markerEl: innerEl,
            isSingleJob: isSingleJob,
            loc,
            cityName,
            jobArray,
            popup,
            categories: categories,
          });
        });
      }

      innerLocShow();
    });

    handleZoomVisibility();
  }

  function getPopupHtml(cityName, jobArray) {
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
              <div>${cityName}</div>
              <div class="popup-box_vac">
              <ul role="list" class="popup-box_vac-list">
              ${jobList}
              </ul>
              </div>
              </div></div>
      `;
  }

  getGeoData();
  addMapPoints();

  const tabletMediaQuery = window.innerWidth < 991;

  //FILTER FUNCTION HERE=============
  //FILTER FUNCTION HERE=============
  //FILTER FUNCTION HERE=============
  const filter_wrap = document.querySelector('.map_filter-col');
  const location_Menu = filter_wrap.querySelector(
    `[map-filter="location"] .filter-tab-menu`
  );
  const category_Menu = filter_wrap.querySelector(
    `[map-filter="category"] .filter-tab-menu`
  );
  const filter_link = filter_wrap.querySelector('.filter-tab-links');
  filter_link.remove();

  //All button
  const cloneAllButn1 = filter_link.cloneNode(true);
  const cloneAllButn2 = filter_link.cloneNode(true);
  cloneAllButn1.innerHTML = 'All';
  cloneAllButn1.setAttribute('location-name', 'all');
  cloneAllButn2.innerHTML = 'All';
  cloneAllButn2.setAttribute('category-name', 'all');
  location_Menu.append(cloneAllButn1);
  category_Menu.append(cloneAllButn2);

  //Adding multiple item at once using documentFragment
  const locationFragment = document.createDocumentFragment();
  const categoryFragment = document.createDocumentFragment();

  cities.forEach((item) => {
    const clone1 = filter_link.cloneNode(true);
    clone1.textContent = item.Name;
    clone1.setAttribute('location-name', item.Name);
    locationFragment.appendChild(clone1);
  });

  const jobCategories = [
    ...new Set(
      jobData.map((item) => item.job_family?.job_family_name).filter(Boolean)
    ),
  ];

  console.log(jobCategories);

  jobCategories.forEach((item) => {
    const clone2 = filter_link.cloneNode(true);

    clone2.textContent = item;
    clone2.setAttribute('category-name', item);
    categoryFragment.appendChild(clone2);
  });

  // console.log(cityMarkers);

  // append all at once (fast reflow)
  location_Menu.appendChild(locationFragment);
  category_Menu.appendChild(categoryFragment);

  //INITIALIZE FILTER TOGGLE SYSTEM
  // function initFilterToggle() {
  //   const OPEN_CLASS = 'is--open';
  //   const dropdowns = document.querySelectorAll(
  //     '.map_filter-col .filter-dropdown'
  //   );

  //   dropdowns.forEach((dropdown) => {
  //     const toggleBtn = dropdown.querySelector('.filter-dropdown-toggle');
  //     const menu = dropdown.querySelector('.filter-dropdown-list');
  //     if (!toggleBtn || !menu) return;

  //     // Toggle on button click
  //     toggleBtn.addEventListener('click', (e) => {
  //       e.stopPropagation(); // prevent click from bubbling to document
  //       dropdowns.forEach((item) => {
  //         if (item !== dropdown) {
  //           item.classList.remove(OPEN_CLASS);
  //         }
  //       });
  //       dropdown.classList.toggle(OPEN_CLASS);
  //     });

  //     // Close when clicking outside
  //     document.addEventListener('click', (e) => {
  //       // if click is NOT inside the dropdown, close it
  //       if (!dropdown.contains(e.target)) {
  //         dropdown.classList.remove(OPEN_CLASS);
  //       }
  //     });
  //     // Close on Escape key
  //     document.addEventListener('keydown', (e) => {
  //       if (e.key === 'Escape') {
  //         dropdown.classList.remove(OPEN_CLASS);
  //       }
  //     });
  //   });
  // }

  function filteringSystem() {
    const locationLinks = location_Menu.querySelectorAll('.filter-tab-links');
    const categoryLinks = category_Menu.querySelectorAll('.filter-tab-links');

    //Set active filters
    //Apply filters
    //Add location each click function
    let activeFilters = {
      location: [],
      category: [],
    };

    function jobMatchesCategory(job) {
      if (!activeFilters.category || activeFilters.category.length === 0)
        return true;
      const cat = job.job_family?.job_family_name;
      return !!cat && activeFilters.category.includes(cat);
    }

    function applyFilters() {
      const innerFilteredCounts = new Map();
      const cityFilteredCounts = new Map();

      innerMarkers.forEach((inner) => {
        const jobs = Array.isArray(inner.jobArray) ? inner.jobArray : [];
        const filteredCount = jobs.filter((job) => {
          if (!activeFilters.category || activeFilters.category.length === 0)
            return true;
          const cat = job.job_family?.job_family_name;
          return !!cat && activeFilters.category.includes(cat);
        }).length;

        innerFilteredCounts.set(inner.Name, filteredCount);

        // accumulate to city total
        const prev = cityFilteredCounts.get(inner.cityName) || 0;
        cityFilteredCounts.set(inner.cityName, prev + filteredCount);
      });

      innerMarkers.forEach((inner) => {
        if (!inner.popup || !Array.isArray(inner.jobArray)) return;
        const filteredJobs = inner.jobArray.filter(jobMatchesCategory);
        inner.popup.setHTML(getPopupHtml(inner.cityName, filteredJobs));
      });

      // console.log(innerFilteredCounts, cityFilteredCounts);
      cityMarkers.forEach((city) => {
        const total = cityFilteredCounts.get(city.cityName) || 0;
        const badge =
          city.markerEl && city.markerEl.querySelector('.map-marker-num');
        if (city.markerEl) {
          badge.innerHTML = total;
          city.markerEl.style.display = total > 0 ? '' : 'none';
        }
      });

      let filterCityMarker = cityMarkers.filter((item) => {
        const cityName = item.cityName;
        const category = item.cityCategories;
        const locationMatch =
          activeFilters.location.length === 0 ||
          activeFilters.location.includes(cityName);
        const cityTotal = cityFilteredCounts.get(cityName) || 0;
        return locationMatch && cityTotal > 0;
      });
      let filterInnerMarker = innerMarkers.filter((item) => {
        const cityName = item.cityName;
        const category = item.categories;
        const locationMatch =
          activeFilters.location.length === 0 ||
          activeFilters.location.includes(cityName);
        const filteredCount = innerFilteredCounts.get(item.Name) || 0;

        return locationMatch && filteredCount > 0;
      });

      renderActiveMarkers(filterCityMarker, filterInnerMarker);
    }

    locationLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const attr = link.getAttribute('location-name');
        if (attr === 'all') {
          activeFilters.location = [];
        } else {
          activeFilters.location = attr;
        }
        applyFilters();
      });
    });
    categoryLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const attr = link.getAttribute('category-name');
        if (attr === 'all') {
          activeFilters.category = [];
        } else {
          activeFilters.category = attr;
        }
        applyFilters();
      });
    });

    function renderActiveMarkers(cityM, innerM) {
      cityMarkers.forEach((marker) => {
        marker.markerEl.style.display = 'none';
      });
      cityM.forEach((marker) => {
        marker.markerEl.style.display = 'block';
      });
      innerMarkers.forEach((marker) => {
        marker.markerEl.style.display = 'none';
      });
      innerM.forEach((marker) => {
        marker.markerEl.style.display = 'block';
      });
      // console.log(innerMarker);
    }

    applyFilters();
    console.log(cityMarkers);
    console.log(innerMarkers);
  }

  // initFilterToggle();
  filteringSystem();
  setUserCoordsToMap(map);
}

window.map = map;
