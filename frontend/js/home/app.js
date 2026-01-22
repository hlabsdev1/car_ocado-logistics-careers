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
  
      console.log(allJobs);
  
      //Function calling-
      map(dataItems, locations, cities);
      search(allJobs);
      latestJobs(allJobs);
  
      await globalScrollAnimation();
  
      //Calling v text formating
      await markDivsWithDirectText();
      await formatingV_Text();
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
      const initMapCoords = [-2.19842, 51.8206118];
  
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
        center: initMapCoords, //28.334115149095556, -81.50494910779616
        // zoom: 4.0,
        zoom: isMobile ? 6.1 : 6.1, // Different zoom for mobile
        minZoom: 4,
        maxZoom: 14,
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
              coordinates,
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
              coordinates,
            });
          }
  
          // Add event listeners for interactivity
          cityEl.addEventListener('click', () => {
            map.flyTo({
              center: coordinates,
              speed: 1,
              curve: 1,
              zoom: 13,
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
                    .filter(Boolean),
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
        `[map-filter="location"] .filter-tab-menu`,
      );
      const category_Menu = filter_wrap.querySelector(
        `[map-filter="category"] .filter-tab-menu`,
      );
      const teamCategory_Menu = filter_wrap.querySelector(
        `[map-filter="team-category"] .filter-tab-menu`,
      );
      const filter_link = filter_wrap.querySelector('.filter-tab-links');
      filter_link.remove();
  
      //All button
      const cloneAllButn1 = filter_link.cloneNode(true);
      const cloneAllButn2 = filter_link.cloneNode(true);
      const cloneAllButn3 = filter_link.cloneNode(true);
      cloneAllButn1.innerHTML = 'All';
      cloneAllButn1.setAttribute('location-name', 'all');
      cloneAllButn1.classList.add('is-active');
      cloneAllButn2.innerHTML = 'All';
      cloneAllButn2.setAttribute('category-name', 'all');
      cloneAllButn2.classList.add('is-active');
      cloneAllButn3.innerHTML = 'All';
      cloneAllButn3.setAttribute('team-category-name', 'all');
      cloneAllButn3.classList.add('is-active');
      location_Menu.append(cloneAllButn1);
      category_Menu.append(cloneAllButn2);
      teamCategory_Menu.append(cloneAllButn3);
  
      //Adding multiple item at once using documentFragment
      const locationFragment = document.createDocumentFragment();
      const categoryFragment = document.createDocumentFragment();
      const teamCategoryFragment = document.createDocumentFragment();
  
      const sortedCities = [...cities].sort((a, b) =>
        a.Name.localeCompare(b.Name),
      );
  
      sortedCities.forEach((item) => {
        const clone1 = filter_link.cloneNode(true);
        clone1.textContent = item.Name;
        clone1.setAttribute('location-name', item.Name);
        locationFragment.appendChild(clone1);
      });
  
      const jobCategories = [
        ...new Set(
          jobData.map((item) => item.job_family?.job_family_name).filter(Boolean),
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
        const locationActivePill = filter_wrap.querySelectorAll(
          "[map-filter-pill='location']",
        );
        const categoryActivePill = filter_wrap.querySelectorAll(
          "[map-filter-pill='team-category']",
        );
        const mapNoResult = document.querySelector('.map-no-result');
  
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
  
          //Remove filter location if there's no job
          locationLinks.forEach((link) => {
            const cityName = link.getAttribute('location-name');
  
            if (cityName === 'all') {
              link.style.display = '';
              return;
            }
  
            const total = cityFilteredCounts.get(cityName) || 0;
            link.style.display = total > 0 ? '' : 'none';
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
          //Click event
          link.addEventListener('click', () => {
            const attr = link.getAttribute('location-name');
            //Toggling active Class
            locationLinks.forEach((e) => {
              if (e.classList.contains('is-active')) {
                e.classList.remove('is-active');
              }
            });
            link.classList.add('is-active');
            //Adding Filter function
            if (attr === 'all') {
              activeFilters.location = [];
              flyBackToInit();
            } else {
              activeFilters.location = attr;
              flyToCity(attr);
            }
            applyFilters();
            // locationActivePill.innerHTML = link.innerHTML;
            locationActivePill.forEach(pill => {
                pill.innerHTML = link.innerHTML;
              });
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
            //Toggling active Class
            teamCategoryLinks.forEach((e) => {
              if (e.classList.contains('is-active')) {
                e.classList.remove('is-active');
              }
            });
            link.classList.add('is-active');
            //Adding Filter function
            if (attr === 'all') {
              activeFilters.teamCategory = [];
            } else {
              activeFilters.teamCategory = attr;
            }
            applyFilters();
            // categoryActivePill.innerHTML = link.innerHTML;
            categoryActivePill.forEach(pill => {
                pill.innerHTML = link.innerHTML;
              });
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
  
          if (cityM.length === 0) {
            if (!mapNoResult.classList.contains('is--active')) {
              mapNoResult.classList.add('is--active');
            }
          } else {
            if (mapNoResult.classList.contains('is--active')) {
              mapNoResult.classList.remove('is--active');
            }
          }
        }
  
        //Fly to city when clicking on cities
        function flyToCity(attr) {
          const filterButnAttr = attr;
          cityMarkers.forEach((item) => {
            const cityName = item.cityName;
            if (cityName === filterButnAttr) {
              map.flyTo({
                center: item.coordinates,
                speed: 1,
                curve: 1,
                zoom: 13,
              });
            }
          });
        }
  
        //Fly back to initial Position of Map
        function flyBackToInit() {
          map.flyTo({
            center: initMapCoords,
            speed: 0.5,
            zoom: isMobile ? 6.1 : 6.1,
          });
        }
  
        applyFilters();
        // console.log(cityMarkers);
        // console.log(innerMarkers);
      }
  
      // initFilterToggle();
      filteringSystem();
      setUserCoordsToMap(map);
  
      map.on('load', () => {
        // 1️⃣ Listen for future updates
        window.addEventListener('user:locationReady', (e) => {
          const { lat, lng } = e.detail;
          // console.log('User location ready:', lat, lng);
          applyUserLocation(map, lat, lng);
        });
  
        // 2️⃣ Catch reload case (location already exists)
        if (window.__USER_LOCATION__) {
          const { lat, lng } = window.__USER_LOCATION__;
          applyUserLocation(map, lat, lng);
        }
      });
  
      function applyUserLocation(map, lat, lng) {
        map.setCenter([lng, lat]);
        drawRadiusCircle(map, lng, lat);
      }
    }
  
    function search(allJobs) {
      //So here we are creating a new map array that city has
  
      // console.log(allJobs);
  
      //Html targets variable for search features
      const searchComponent = document.querySelector(
        '[search-component="hero-search"]',
      );
      const searchInput = document.getElementById('home-search');
      const searchTemplate = document.getElementById('search-template');
      const resultContainer = searchComponent.querySelector(
        '.search-results-wrap',
      );
      const emptyCard = searchTemplate.content.cloneNode(true).children[2];
      const searchButn = searchTemplate.content
        .cloneNode(true)
        .getElementById('search-job-butn');
  
      // console.log(allJobs);
  
      //Creating new objects with allJobs and adding job cards in the search area. And changing text and all
      let activeJobs = allJobs.map((job) => {
        const card = searchTemplate.content.cloneNode(true).children[0];
        const job_name = card.querySelector('[search-field="job-name"]');
        const job_type = card.querySelector('[search-field="job-type"]');
        const job_category = card.querySelector('[search-field="category"]');
        const locationName = card.querySelector('[search-field="location-name"]');
        const date = card.querySelector('[search-field="date-posted"]');
        const applyLink = card.querySelector('.cta-link');
        const job_categoryWrap = job_category.parentNode;
  
        const newUrl = job.application_url.split('/apply')[0];
        job_categoryWrap.style.backgroundColor = job.subLocation[0]?.color;
  
        job_name.innerHTML = job.title;
        locationName.innerHTML = job.subLocation[0]?.Name;
        job_type.innerHTML = job.job_schedule.replace('_', ' ');
        job_category.innerHTML = job.subLocation[0]?.Category;
        date.innerHTML = formatCreatedAgo(job.creation_date);
        applyLink.href = newUrl;
  
        card.classList.add('is--hide');
        resultContainer.append(card);
        //Returing the data we can filter with.
        return {
          jobName: job.title,
          jobCategory: job.subLocation[0]?.Category,
          cityName: job.subLocation[0]?.City,
          locationName: job.subLocation[0]?.Name,
          postalCode: job.subLocation[0]?.['Postal Code'],
          element: card,
        };
      });
  
      //Adding empty job card
      resultContainer.append(emptyCard);
      emptyCard.classList.add('is--hide');
  
      //Adding button
      resultContainer.append(searchButn);
      searchButn.classList.add('is--hide');
  
      //Adding event listener for input change
      searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        let jobShowing = false;
        let visibleCount = 0;
  
        if (value === '') {
          activeJobs.forEach((job) => job.element.classList.add('is--hide'));
          emptyCard.classList.add('is--hide');
          searchButn.classList.add('is--hide');
          resultContainer.classList.remove('is--active');
          return;
        }
        //With returned data on activeJobs we can filter if anything we type includes the below data if yes then toggle class.
        activeJobs.forEach((job) => {
          const isMatch =
            (job.jobName || '').toLowerCase().includes(value) ||
            (job.jobCategory || '').toLowerCase().includes(value) ||
            (job.cityName || '').toLowerCase().includes(value) ||
            (job.locationName || '').toLowerCase().includes(value);
  
          const isVisible = isMatch && visibleCount < 5;
  
          // const isVisible = isMatch && visibleCount < 5;
          job.element.classList.toggle('is--hide', !isVisible);
          if (isVisible) {
            visibleCount++;
            jobShowing = true;
          }
        });
  
        if (value !== '') {
          emptyCard.classList.toggle('is--hide', jobShowing);
          searchButn.classList.toggle('is--hide', !jobShowing);
          resultContainer.classList.add('is--active');
        }
      });
  
      //Close search if click outside
      document.addEventListener('click', function (event) {
        const isClickInside = searchComponent.contains(event.target);
        if (!isClickInside) {
          searchInput.value = '';
          // activeJobs.forEach((job) => job.element.classList.add('is--hide'));
          activeJobs.forEach((job) => {
            if (!job.element.classList.contains('is--hide')) {
              job.element.classList.add('is--hide');
            }
          });
          if (!searchButn.classList.contains('is--hide')) {
            searchButn.classList.add('is--hide');
          }
          if (!emptyCard.classList.contains('is--hide')) {
            emptyCard.classList.add('is--hide');
          }
          if (resultContainer.classList.contains('is--active')) {
            resultContainer.classList.remove('is--active');
          }
        }
      });
    }
  
    function teamCatTab() {
      const tabs = document.querySelector('.team-cat_tabs');
      const allLinks = tabs.querySelectorAll('.team-cat_menu .team-cat_link');
      const tabPane = tabs.querySelectorAll('.team-cat_pane');
      const nextButn = tabs.querySelector('.swiper-arrow.is--next');
      const prevButn = tabs.querySelector('.swiper-arrow.is--prev');
      allLinks[0].classList.add('is--active');
      tabPane[0].classList.add('is--active');
      let currentIndex = 0;
  
      allLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
          const attr = link.getAttribute('team-cat');
          currentIndex = index;
          console.log(currentIndex);
          //Tab pane method
          tabPane.forEach((pane) => {
            if (pane.getAttribute('team-cat') === attr) {
              pane.classList.add('is--active');
            } else {
              pane.classList.remove('is--active');
            }
          });
  
          //tab link
          allLinks.forEach((link) => {
            link.classList.remove('is--active');
          });
  
          link.classList.add('is--active');
  
          if (currentIndex === tabPane.length - 1) {
            nextButn.classList.add('is--disabled');
          } else {
            nextButn.classList.remove('is--disabled');
          }
  
          if (currentIndex <= 0) {
            prevButn.classList.add('is--disabled');
          } else {
            prevButn.classList.remove('is--disabled');
          }
        });
      });
  
      //Prev and Nex functionality
      function handleIndexChange() {
        //tab Panes
        if (tabPane[currentIndex]) {
          tabPane.forEach((pane) => {
            pane.classList.remove('is--active');
          });
          tabPane[currentIndex].classList.add('is--active');
        }
  
        if (allLinks[currentIndex]) {
          allLinks.forEach((link) => {
            link.classList.remove('is--active');
          });
          allLinks[currentIndex].classList.add('is--active');
        }
  
        if (currentIndex === tabPane.length - 1) {
          nextButn.classList.add('is--disabled');
        } else {
          nextButn.classList.remove('is--disabled');
        }
  
        if (currentIndex <= 0) {
          prevButn.classList.add('is--disabled');
        } else {
          prevButn.classList.remove('is--disabled');
        }
  
        //tab links
      }
  
      nextButn.addEventListener('click', () => {
        if (currentIndex < tabPane.length - 1) {
          currentIndex++;
          handleIndexChange();
        }
      });
  
      prevButn.addEventListener('click', () => {
        if (currentIndex > -1) {
          currentIndex--;
          handleIndexChange();
        }
      });
  
      handleIndexChange();
    }
  
    function latestJobs(allJobs) {
      //Get all Filters to add to filter buttons
      //show all items
      //Create 2 filters - 1. filter button , 2. Search filer
  
      const filterComp = document.querySelector(
        '[hs-list-element="filter-wrap2"]',
      );
      const filters = filterComp.querySelector('[hs-list-element="filter"]');
      const resultContainer = filterComp.querySelector(
        '[hs-list-element="list"]',
      );
      const searchInput = filterComp.querySelector(
        '[hs-list-element="search"] input',
      );
      const noResult = resultContainer.querySelector('.listing-no-result-card');
      const searchTemplate = document.getElementById('search-template');
  
      const teamCategories = [
        ...new Set(
          allJobs.map((item) => item.subLocation[0]?.Category).filter(Boolean),
        ),
      ];
  
      //Adding all button
      const allButn = document.createElement('div');
      allButn.classList.add('filter-button');
      allButn.innerHTML = 'All';
      allButn.setAttribute('filter-category', 'All');
      filters.append(allButn);
  
      //Adding categories to the filter list
      teamCategories.forEach((cat) => {
        const div = document.createElement('div');
        div.classList.add('filter-button');
        div.innerHTML = cat;
        div.setAttribute('filter-category', cat);
        filters.append(div);
      });
  
      //Get all filter button
      const allFilterButns = filters.querySelectorAll('.filter-button');
      allFilterButns[0].classList.add('is--active');
  
      const MAX_ITEMS = 6;
      let initialCount = 0;
  
      let activeJobs = allJobs.map((job) => {
        const card = searchTemplate.content.cloneNode(true).children[0];
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
  
        // 👇 Hide everything first
        card.classList.add('is--hide');
  
        // 👇 Show only first 9
        if (initialCount < MAX_ITEMS) {
          card.classList.remove('is--hide');
          initialCount++;
        }
  
        // card.classList.add('is--hide');
        resultContainer.append(card);
        //Returing the data we can filter with.
        return {
          jobName: job.title,
          jobCategory: job.subLocation[0]?.Category,
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
        let visibleCount = 0;
  
        if (value === '') {
          if (!allFilterButns[0].classList.contains('is--active')) {
            allFilterButns[0].classList.add('is--active');
          }
          if (!noResult.classList.contains('is--hide')) {
            noResult.classList.add('is--hide');
          }
        }
  
        //With returned data on activeJobs we can filter if anything we type includes the below data if yes then toggle class.
        activeJobs.forEach((job) => {
          const isMatch =
            (job.jobName || '').toLowerCase().includes(value) ||
            (job.jobCategory || '').toLowerCase().includes(value) ||
            (job.cityName || '').toLowerCase().includes(value) ||
            (job.locationName || '').toLowerCase().includes(value);
  
          const isVisible = isMatch && visibleCount < MAX_ITEMS;
  
          job.element.classList.toggle('is--hide', !isVisible);
          if (isVisible) {
            visibleCount++;
            jobShowing = true;
          }
        });
  
        if (value !== '') {
          allFilterButns.forEach((butn) => {
            butn.classList.remove('is--active');
          });
          noResult.classList.toggle('is--hide', jobShowing);
        }
      });
  
      //Filter Button Click functionality
      allFilterButns.forEach((butn) => {
        const attr = butn.getAttribute('filter-category').toLowerCase();
        butn.addEventListener('click', () => {
          let visibleCount = 0;
          if (attr !== 'all') {
            activeJobs.forEach((job) => {
              const isMatch = (job.jobCategory || '').toLowerCase() === attr;
              const isVisible = isMatch && visibleCount < MAX_ITEMS;
              job.element.classList.toggle('is--hide', !isVisible);
              if (isVisible) visibleCount++;
            });
          } else {
            activeJobs.forEach((job) => {
              const isVisible = visibleCount < MAX_ITEMS;
              job.element.classList.toggle('is--hide', !isVisible);
              if (isVisible) visibleCount++;
            });
          }
  
          allFilterButns.forEach((item) => {
            item.classList.remove('is--active');
          });
          butn.classList.add('is--active');
        });
      });
    }
  
    let directTextProcessed = false;
    async function markDivsWithDirectText() {
      if (directTextProcessed) return;
      directTextProcessed = true;
  
      const divs = document.querySelectorAll(
        '[hs-list-element="filter-wrap2"] div',
      );
  
      divs.forEach((div) => {
        const hasDirectText = Array.from(div.childNodes).some(
          (node) =>
            node.nodeType === Node.TEXT_NODE &&
            node.textContent.trim().length > 0,
        );
  
        if (hasDirectText) {
          div.setAttribute('text-content-div', '');
        }
      });
    }
  
    async function formatingV_Text() {
      function isVisuallyUppercase(el) {
        const style = window.getComputedStyle(el);
        return style.textTransform === 'uppercase';
      }
      function highlightV(element) {
        const forceUppercase = isVisuallyUppercase(element);
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          null,
          false,
        );
  
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
  
        nodes.forEach((node) => {
          const text = node.nodeValue;
          // skip if no possible v/V
          if (!/[vV]/.test(text)) return;
  
          const fragment = document.createDocumentFragment();
          const parts = text.split(/([vV])/g);
          // console.log(parts);
  
          parts.forEach((part) => {
            const isV = part === 'V';
            const isLowerV = part === 'v';
            if (isV || (isLowerV && forceUppercase)) {
              const span = document.createElement('span');
              span.className = 'kerning-v';
              span.textContent = part;
              fragment.appendChild(span);
            } else {
              fragment.appendChild(document.createTextNode(part));
            }
          });
  
          node.parentNode.replaceChild(fragment, node);
        });
      }
  
      document
        .querySelectorAll(
          '[hs-list-element="filter-wrap2"] h1,[hs-list-element="filter-wrap2"] h2, [hs-list-element="filter-wrap2"] h3,[hs-list-element="filter-wrap2"], [hs-list-element="filter-wrap2"] p, [hs-list-element="filter-wrap2"] [text-content-div]',
        )
        .forEach(highlightV);
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      teamCatTab();
    });
  }
  
  individualPage();

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const clickedFilterOption = e.target.closest('.filter-tab-links');
    if (!clickedFilterOption) return;

    const filterDropdown = clickedFilterOption.closest('[map-filter]');

    setTimeout(() => {
      // Close the filter dropdown
      if (filterDropdown) {
        filterDropdown.classList.remove('is--open');
      }

      // Close any open Mapbox popups
      document
        .querySelectorAll('.mapboxgl-popup-close-button')
        .forEach((closeButton) => closeButton.click());

    }, 100);
  });
});
