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
      { Name: 'Park Royal', Latitude: '51.5303261', Longitude: '-0.2780103' },
      { Name: 'Dordon', Latitude: '52.5973413', Longitude: '-1.6361482' },
      {
        Name: 'Purfleet',
        Latitude: '51.4819849',
        Longitude: '0.2189419',
      },
      { Name: 'Hatfield', Latitude: '51.7657433', Longitude: '-0.2562941' },
      { Name: 'Crawley', Latitude: '51.1121672', Longitude: '-0.1967593' },
      {
        Name: 'Milton Keynes',
        Latitude: '52.0410458',
        Longitude: '-0.7898619',
      },
      { Name: 'Knowsley', Latitude: '53.4484602', Longitude: '-2.8639499' },
      { Name: 'Nottingham', Latitude: '52.9565093', Longitude: '-1.2170722' },
      {
        Name: 'Welwyn Garden',
        Latitude: '51.8004995',
        Longitude: '-0.2154367',
      },
      { Name: 'Manchester', Latitude: '53.4722462', Longitude: '-2.3793461' },
      { Name: 'Bristol', Latitude: '51.4661608', Longitude: '-2.630469' },
      { Name: 'Leeds', Latitude: '53.8060756', Longitude: '-1.6181321' },
      { Name: 'Sheffield', Latitude: '53.3865941', Longitude: '-1.5758543' },
      { Name: 'West Drayton', Latitude: '51.5067427', Longitude: '-0.482832' },
      { Name: 'Peterborough', Latitude: '52.5872424', Longitude: '-0.4656888' },
      { Name: 'Weybridge', Latitude: '51.3643145', Longitude: '-0.4936075' },
      { Name: 'Oxford', Latitude: '51.7504622', Longitude: '-1.2887872' },
      { Name: 'Enfield', Latitude: '51.6501606', Longitude: '-0.1515596' },
      { Name: 'Wimbledon', Latitude: '51.4273718', Longitude: '-0.2444494' },
      { Name: 'Merton', Latitude: '51.4108579', Longitude: '-0.2303773' },
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
    latestJobs(allJobs);
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
      center: userLat && userLang ? userCoords : [-2.19842, 51.8206118], //28.334115149095556, -81.50494910779616
      // zoom: 4.0,
      zoom: isMobile ? 6.25 : 6.25, // Different zoom for mobile
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

        // imgElement.src = icon;
        const numElement = document.createElement('div');
        numElement.className = 'map-marker-num';
        // numElement.innerHTML = totalJobs;
        numElement.setAttribute('totalJobs', totalJobs);
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

        let cityTeamCategories = new Set();
        locations.forEach((loc) => {
          const cat = loc.Category;
          if (cat) cityTeamCategories.add(cat);
        });
        cityTeamCategories = [...cityTeamCategories];

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
            cityTeamCategories,
          });
        } else {
          cityMarkers.push({
            marker: null,
            markerEl: cityEl,
            isSingleJob: true,
            arrayID,
            cityName,
            cityCategories,
            cityTeamCategories,
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

        // console.log(locations);

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
            innerEl.setAttribute('team-category', `${loc.Category}`);

            const address = loc['Address Line 1'];

            const imgElement = searchTemplate.content
              .cloneNode(true)
              .querySelector('[map-marker]');

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
              .setHTML(getPopupHtml(address, jobArray));

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
              teamCategory: loc.Category,
            });
          });
        }

        innerLocShow();
      });

      handleZoomVisibility();
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
    const teamCategory_Menu = filter_wrap.querySelector(
      `[map-filter="team-category"] .filter-tab-menu`
    );
    const filter_link = filter_wrap.querySelector('.filter-tab-links');
    filter_link.remove();

    //All button
    const cloneAllButn1 = filter_link.cloneNode(true);
    const cloneAllButn2 = filter_link.cloneNode(true);
    const cloneAllButn3 = filter_link.cloneNode(true);
    cloneAllButn1.innerHTML = 'All';
    cloneAllButn1.setAttribute('location-name', 'all');
    cloneAllButn2.innerHTML = 'All';
    cloneAllButn2.setAttribute('category-name', 'all');
    cloneAllButn3.innerHTML = 'All';
    cloneAllButn3.setAttribute('team-category-name', 'all');
    location_Menu.append(cloneAllButn1);
    category_Menu.append(cloneAllButn2);
    teamCategory_Menu.append(cloneAllButn3);

    //Adding multiple item at once using documentFragment
    const locationFragment = document.createDocumentFragment();
    const categoryFragment = document.createDocumentFragment();
    const teamCategoryFragment = document.createDocumentFragment();

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

    // console.log(jobCategories);

    jobCategories.forEach((item) => {
      const clone2 = filter_link.cloneNode(true);

      clone2.textContent = item;
      clone2.setAttribute('category-name', item);
      categoryFragment.appendChild(clone2);
    });

    const teamCategories = [
      ...new Set(locations.map((item) => item.Category).filter(Boolean)),
    ];

    // console.log(teamCategories);

    teamCategories.forEach((item) => {
      const clone = filter_link.cloneNode(true);
      clone.textContent = item;
      clone.setAttribute('team-category-name', item);
      teamCategoryFragment.appendChild(clone);
    });

    // console.log(cityMarkers);

    // append all at once (fast reflow)
    location_Menu.appendChild(locationFragment);
    category_Menu.appendChild(categoryFragment);
    teamCategory_Menu.appendChild(teamCategoryFragment);

    function filteringSystem() {
      const locationLinks = location_Menu.querySelectorAll('.filter-tab-links');
      const categoryLinks = category_Menu.querySelectorAll('.filter-tab-links');
      const teamCategoryLinks =
        teamCategory_Menu.querySelectorAll('.filter-tab-links');

      //Set active filters
      //Apply filters
      //Add location each click function
      let activeFilters = {
        location: [],
        category: [],
        teamCategory: [],
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

        // console.log(cityMarkers);
        // console.log(innerMarkers);

        innerMarkers.forEach((inner) => {
          const teamCategoryMatch =
            activeFilters.teamCategory.length === 0 ||
            activeFilters.teamCategory.includes(inner.teamCategory);

          if (!teamCategoryMatch) {
            innerFilteredCounts.set(inner.Name, 0);

            const prev = cityFilteredCounts.get(inner.cityName) || 0;
            cityFilteredCounts.set(inner.cityName, prev);

            return;
          }

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
            badge.setAttribute('totalJobs', total);
            city.markerEl.style.display = total > 0 ? '' : 'none';
          }
        });

        let filterCityMarker = cityMarkers.filter((item) => {
          const cityName = item.cityName;
          const locationMatch =
            activeFilters.location.length === 0 ||
            activeFilters.location.includes(cityName);
          const cityTotal = cityFilteredCounts.get(cityName) || 0;
          return locationMatch && cityTotal > 0;
        });
        let filterInnerMarker = innerMarkers.filter((item) => {
          const cityName = item.cityName;
          const locationMatch =
            activeFilters.location.length === 0 ||
            activeFilters.location.includes(cityName);
          const teamCategoryMatch =
            activeFilters.teamCategory.length === 0 ||
            activeFilters.teamCategory.includes(item.teamCategory);
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
      teamCategoryLinks.forEach((link) => {
        link.addEventListener('click', () => {
          const attr = link.getAttribute('team-category-name');
          if (attr === 'all') {
            activeFilters.teamCategory = [];
          } else {
            activeFilters.teamCategory = attr;
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
      // console.log(cityMarkers);
      // console.log(innerMarkers);
    }

    // initFilterToggle();
    filteringSystem();
    setUserCoordsToMap(map);
  }

  function latestJobs(allJobs) {
    //Get all Filters to add to filter buttons
    //show all items
    //Create 2 filters - 1. filter button , 2. Search filer

    // console.log(allJobs);

    const filterComp = document.querySelector('[hs-list-element="job-page"]');
    const filters = filterComp.querySelector('[hs-list-element="filter"]');
    const resultContainer = filterComp.querySelector(
      '[hs-list-element="list"]'
    );
    const location_Menu = filterComp.querySelector(
      ".filter-dropdown[map-filter='location'] .filter-tab-menu"
    );
    const team_Menu = filterComp.querySelector(
      ".filter-dropdown[map-filter='team-category'] .filter-tab-menu"
    );
    const contract_Menu = filterComp.querySelector(
      ".filter-dropdown[map-filter='contract-type'] .filter-tab-menu"
    );

    const noResult = resultContainer.querySelector('.listing-no-result-card');
    const searchTemplate = document.getElementById('search-template');
    const filter_li = document.createElement('li');

    //All Buttons
    const createAllBtn = (attr, value) => {
      const li = document.createElement('li');
      li.textContent = 'All';
      li.className = 'filter-tab-links';
      li.setAttribute(attr, value);
      return li;
    };
    location_Menu.append(createAllBtn('hs-location', 'all'));
    team_Menu.append(createAllBtn('hs-team', 'all'));
    contract_Menu.append(createAllBtn('hs-contract', 'all'));

    const locationCategories = [
      ...new Set(
        allJobs.map((item) => item.subLocation[0]?.City).filter(Boolean)
      ),
    ];
    const teamCategories = [
      ...new Set(
        allJobs.map((item) => item.subLocation[0]?.Category).filter(Boolean)
      ),
    ];
    const contractTypeCategories = [
      ...new Set(
        allJobs.map((item) => item.job_family?.job_family_name).filter(Boolean)
      ),
    ];

    //Adding multiple item at once using documentFragment
    const locationFragment = document.createDocumentFragment();
    const teamCategoryFragment = document.createDocumentFragment();
    const contractTypeFragment = document.createDocumentFragment();

    //Adding Location to the filter list
    locationCategories.forEach((cat) => {
      const clone = filter_li.cloneNode(true);
      clone.textContent = cat;
      clone.className = 'filter-tab-links';
      clone.setAttribute('hs-location', cat);
      locationFragment.appendChild(clone);
    });

    location_Menu.appendChild(locationFragment);

    //Adding team Category to the filter list
    teamCategories.forEach((cat) => {
      const clone = filter_li.cloneNode(true);
      clone.textContent = cat;
      clone.className = 'filter-tab-links';
      clone.setAttribute('hs-team', cat);
      teamCategoryFragment.appendChild(clone);
    });

    team_Menu.appendChild(teamCategoryFragment);

    //Adding Contract Type to the filter list
    contractTypeCategories.forEach((cat) => {
      const clone = filter_li.cloneNode(true);
      clone.textContent = cat;
      clone.className = 'filter-tab-links';
      clone.setAttribute('hs-contract', cat);
      contractTypeFragment.appendChild(clone);
    });

    contract_Menu.appendChild(contractTypeFragment);

    // console.log(allJobs);

    allJobs.forEach((job) => {
      const card = searchTemplate.content.cloneNode(true).children[0];
      card.setAttribute('hs-location', job.subLocation[0]?.City);
      card.setAttribute('hs-team', job.subLocation[0]?.Category);
      card.setAttribute('hs-contract', job.job_family?.job_family_name || '');
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

      // card.classList.add('is--hide');
      resultContainer.append(card);
    });

    function filterSystem() {
      const locButtons = location_Menu.querySelectorAll('li');
      const teamButtons = team_Menu.querySelectorAll('li');
      const contractButtons = contract_Menu.querySelectorAll('li');
      const prevButn = document.querySelector('.filter-pag-button.is--prev');
      const nextButn = document.querySelector('.filter-pag-button.is--next');
      const pageIndicator = document.querySelector('.filter-pagination-page');
      let currentPage = 1;
      let itemsPerPage = 6;

      let activeFilters = {
        location: [],
        team: [],
        contract: [],
      };

      //Get paginatedJobs helper function
      function getPaginatedJobs(jobs) {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return jobs.slice(start, end);
      }

      const addedJobs = filterComp.querySelectorAll('.search-item');

      let currentFilteredJobs = [];

      function applyFilters() {
        currentPage = 1;
        currentFilteredJobs = Array.from(addedJobs).filter((item) => {
          const loc_attr = item.getAttribute('hs-location');
          const team_attr = item.getAttribute('hs-team') || '';
          const contract_attr = item.getAttribute('hs-contract') || '';

          const locMatch =
            activeFilters.location.length === 0 ||
            activeFilters.location.includes(loc_attr);

          const teamMatch =
            activeFilters.team.length === 0 ||
            activeFilters.team.includes(team_attr);

          const contractMatch =
            activeFilters.contract.length === 0 ||
            activeFilters.contract.includes(contract_attr);

          return locMatch && teamMatch && contractMatch;
        });

        renderActiveJobs();
      }

      // console.log(currentFilteredJobs);

      function renderActiveJobs() {
        // console.log(activeJobs);
        addedJobs.forEach((item) => {
          item.classList.add('is--hide');
        });

        const pageJobs = getPaginatedJobs(currentFilteredJobs);

        pageJobs.forEach((item) => {
          item.classList.remove('is--hide');
        });

        updatePaginationUI();

        if (pageJobs.length === 0) {
          noResult.classList.remove('is--hide');
        } else {
          if (!noResult.classList.contains('is--hide')) {
            noResult.classList.add('is--hide');
          }
        }
      }

      locButtons.forEach((link) => {
        link.addEventListener('click', () => {
          const attr = link.getAttribute('hs-location');
          if (attr === 'all') {
            activeFilters.location = [];
          } else {
            activeFilters.location = attr;
          }
          applyFilters();
        });
      });

      teamButtons.forEach((link) => {
        link.addEventListener('click', () => {
          const attr = link.getAttribute('hs-team');
          if (attr === 'all') {
            activeFilters.team = [];
          } else {
            activeFilters.team = attr;
          }
          applyFilters();
        });
      });

      contractButtons.forEach((link) => {
        link.addEventListener('click', () => {
          const attr = link.getAttribute('hs-contract');
          if (attr === 'all') {
            activeFilters.contract = [];
          } else {
            activeFilters.contract = attr;
          }
          applyFilters();
        });
      });

      prevButn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderActiveJobs();
        }
      });
      nextButn.addEventListener('click', () => {
        const totalPages = Math.ceil(currentFilteredJobs.length / itemsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          renderActiveJobs();
        }
      });

      function updatePaginationUI() {
        const totalPages = Math.ceil(currentFilteredJobs.length / itemsPerPage);

        pageIndicator.textContent = `${currentPage} / ${totalPages || 1}`;

        prevButn.disabled = currentPage === 1;
        nextButn.disabled = currentPage === totalPages;
      }

      applyFilters();
    }

    filterSystem();
  }
}

individualPage();
