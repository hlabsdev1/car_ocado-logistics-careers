console.log('what');

const JOB_URL =
  'https://ocado-logistic-careers3.car-ocado-logistic.workers.dev/api/jobs';
const LOCATION_API =
  'https://ocado-logistic-careers3.car-ocado-logistic.workers.dev/api/location';

async function getData() {
  try {
    const response = await fetch(JOB_URL);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function getLocations() {
  try {
    const response = await fetch(LOCATION_API);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function init() {
  const data = await getData();
  const locations = await getLocations();

  const dataItems = data.items;

  console.log(dataItems, locations);

  map(dataItems, locations);
}

function map(jobData, locations) {
  /*===========
    VARIABLES
    ==============*/
  const mapCanva = document.querySelector('#map-canva');
  const accessToken =
    'pk.eyJ1IjoiZGVzaWduaGxhYnMiLCJhIjoiY21jajVjY3RlMDBmdTJrczltNWI0MjY0YyJ9.CgE9quHcoUQVtt84P5L5WQ';
  const hStyle = 'mapbox://styles/designhlabs/cmdrfnjwt00iu01r13kn5f6r8';

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
    center: [-2.19842, 53.3378146], //28.334115149095556, -81.50494910779616
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

  // For each colleciton item, grab hidden fields and convert to geojson proerty
  function getGeoData(jobData, locations) {
    const locationMap = new Map();
    locations.forEach((loc) => {
      const key = `${loc.Code}_${loc.Name}`;
      locationMap.set(key, {
        latitude: loc.Latitude,
        longitude: loc.Logtitude,
        city: loc.City,
        country: loc.Country,
      });
    });

    jobData.forEach((job, i) => {
      const code = job.location.location_code;
      const name = job.location.location_name;

      const key = `${code}_${name}`;
      const matchedLocation = locationMap.get(key);
      const job_ID = job.location.location_id;
      const jobName = job.title;
      const popup_heading = job.title;
      // const cityName = job.City;
      let popup_job;
      if (!job.job_family) {
        popup_job = 'null';
        return;
      }
      popup_job = job.job_family.job_family_name;
      // console.log(popup_job);

      if (matchedLocation) {
        // ✅ Inject extra data into job object
        job.location.coordinates = {
          lng: matchedLocation.longitude,
          lat: matchedLocation.latitude,
        };

        job.location.city = matchedLocation.city;
        job.location.country = matchedLocation.country;
      }
      // console.log(job.location.city);
      let arrayID = i + 1 - 1;
      let geoData = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: job.location.coordinates,
        },
        properties: {
          id: job_ID,
          placeName: jobName,
          arrayID: arrayID,
          locationName: name,
          cityName: job.location.city,
          popupDATA: {
            popup_heading: popup_heading,
            popup_job: popup_job,
          },
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
    const icon =
      'https://cdn.prod.website-files.com/691db317d5523108e489fad8/691db317d5523108e489faf0_favicon.png';
    //NEW CUSTOM MAP PINS CODE
    mapLocations.features.forEach((location) => {
      const { coordinates } = location.geometry;
      const { placeName, id, arrayID, locationName, cityName } =
        location.properties;
      const { popup_heading, popup_job } = location.properties.popupDATA;

      // console.log(location.properties);

      // Create a custom HTML element for the marker
      const el = document.createElement('div');
      el.className = 'map-marker';
      el.style.position = 'absolute';
      el.width = 200;
      el.height = 200;

      const imgElement = document.createElement('img');
      imgElement.src = icon;
      // const markerClone = commanInnerMarker.cloneNode(true);
      el.appendChild(imgElement);

      el.setAttribute('data-marker-id', `marker-${arrayID}`);
      el.setAttribute('location-name', `${cityName}`);
      el.setAttribute('category-name', `${locationName}`);

      const popupBox = document.createElement('div');
      popupBox.className = 'popup-box_inner';

      const headTxt = document.createElement('div');
      headTxt.innerHTML = `${popup_heading}`;
      const bodyTxt = document.createElement('div');
      bodyTxt.innerHTML = `${popup_job}`;

      popupBox.appendChild(headTxt);
      popupBox.appendChild(bodyTxt);

      //------------------------------------------------------------------
      // Create a popup
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        //offset: -40,
      });

      // console.log(popupBox);

      function popupMediaQuery() {
        const desktopMedia = window.innerWidth > 991;
        // Add hover event listeners for marker
        if (desktopMedia) {
          el.addEventListener('mouseenter', () => {
            popup.setLngLat(coordinates).setDOMContent(popupBox).addTo(map);

            el.style.zIndex = '3';
          });

          el.addEventListener('mouseleave', () => {
            popup.remove();
            el.style.zIndex = '1';
          });
        } else {
          popup.setLngLat(coordinates).setDOMContent(popupBox).addTo(map);

          //filter button
          filterButtons.forEach((butn) => {
            butn.addEventListener('click', () => {
              const elHidden = window.getComputedStyle(el);
              if (elHidden.display === 'none') {
                popup.remove();
              } else {
                popup.setLngLat(coordinates).setDOMContent(popupBox).addTo(map);
              }
            });
          });
          //all category button
          allCategoryButton.addEventListener('click', () => {
            popup.setLngLat(coordinates).setDOMContent(popupBox).addTo(map);
          });
        }

        $('[hs-close-button]').click(function () {
          $(this)
            .closest("[hs-location='inner-location']")
            .removeClass('is--show');
        });
        //--------------------------------------------------------------------------------

        // Add event listeners for interactivity
        el.addEventListener('click', () => {
          map.flyTo({
            center: coordinates,
            speed: 0.5,
            curve: 1,
            // zoom: 12,
          });
          // el.style.zIndex = "3";
          // console.log(el);
          clicked = true;

          //Add another instance to trigger pop-up labels for the pins----****
          // popup.addTo(map);
          // console.log(popup);
          // console.log("registered click");
          //-------------------------------------------------------------------

          // Show the side card with relevant details
          $("[hs-location='inner-location']").removeClass('is--show');
          // $(".locations-map_item").addClass("is--show");
          //   //find collection item by array ID and show it
          $("[hs-location='inner-location']").eq(arrayID).addClass('is--show');

          // console.log($(`#${id}`).closest(".locations-map_item"));

          // Push event details to the Data Layer
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'map_pin_click',
            place_name: id, // Replace 'id' with the name or ID of the place
          });

          // console.log("Pin clicked:", id); // Debugging
        });
      }

      // Check on page load
      popupMediaQuery();

      if (!coordinates) {
        // console.log(placeName);
        missingData.push(placeName);
        return;
      }
      // Add the marker to the map
      new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);
    });
    // console.log(missingData);
  }

  getGeoData(jobData, locations);
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

  const locationFragment = document.createDocumentFragment();
  const categoryFragment = document.createDocumentFragment();

  const uniqueCity = [...new Set(locations.map((item) => item.City))];

  uniqueCity.forEach((item) => {
    const clone1 = filter_link.cloneNode(true);
    clone1.textContent = item;
    clone1.setAttribute('location-name', item);
    locationFragment.appendChild(clone1);
  });

  locations.forEach((item) => {
    const clone2 = filter_link.cloneNode(true);

    clone2.textContent = item.Name;
    clone2.setAttribute('category-name', item.Name);
    categoryFragment.appendChild(clone2);
  });

  // console.log(uniqueCity);

  // append all at once (fast reflow)
  location_Menu.appendChild(locationFragment);
  category_Menu.appendChild(categoryFragment);

  //INITIALIZE FILTER TOGGLE SYSTEM
  function initFilterToggle() {
    const OPEN_CLASS = 'is--open';
    const dropdowns = document.querySelectorAll(
      '.map_filter-col .filter-dropdown'
    );

    console.log(dropdowns);

    dropdowns.forEach((dropdown) => {
      const toggleBtn = dropdown.querySelector('.filter-dropdown-toggle');
      const menu = dropdown.querySelector('.filter-dropdown-list');
      if (!toggleBtn || !menu) return;

      // Toggle on button click
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent click from bubbling to document
        dropdowns.forEach((item) => {
          if (item !== dropdown) {
            item.classList.remove(OPEN_CLASS);
          }
        });
        dropdown.classList.toggle(OPEN_CLASS);
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        // if click is NOT inside the dropdown, close it
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove(OPEN_CLASS);
        }
      });
      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          dropdown.classList.remove(OPEN_CLASS);
        }
      });
    });
  }

  function filteringSystem() {
    const locationLinks = location_Menu.querySelectorAll('.filter-tab-links');
    const categoryLinks = category_Menu.querySelectorAll('.filter-tab-links');
    // locationLinks.forEach((link) => {
    //   link.addEventListener('click', () => {
    //     const attr = link.getAttribute('location-name');
    //     console.log(attr);
    //     const allMarkers = document.querySelectorAll('.map-marker');
    //     allMarkers.forEach((marker) => {
    //       if (marker.getAttribute('location-name') !== attr) {
    //         marker.style.display = 'none';
    //       } else {
    //         marker.style.display = '';
    //         // console.log(marker);
    //       }
    //     });
    //   });
    // });
    // categoryLinks.forEach((link) => {
    //   link.addEventListener('click', () => {
    //     const attr = link.getAttribute('category-name');
    //     const allMarkers = document.querySelectorAll('.map-marker');
    //     allMarkers.forEach((marker) => {
    //       if (marker.getAttribute('category-name') !== attr) {
    //         marker.style.display = 'none';
    //       } else {
    //         marker.style.display = '';
    //         // console.log(marker);
    //       }
    //     });
    //   });
    // });

    //Set active filters
    //Apply filters
    //Add location each click function
    let activeFilters = {
      location: [],
      category: [],
    };

    const allMarkers = document.querySelectorAll('.map-marker');

    function applyFilters() {
      let filterItems = Array.from(allMarkers).filter((item) => {
        const loc_attr = item.getAttribute('location-name');
        const cat_attr = item.getAttribute('category-name');
        const locationMatch =
          activeFilters.location.length === 0 ||
          activeFilters.location.includes(loc_attr);
        const categoryMatch =
          activeFilters.category.length === 0 ||
          activeFilters.category.includes(cat_attr);
        return locationMatch && categoryMatch;
      });

      renderActiveMarkers(filterItems);
    }

    locationLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const attr = link.getAttribute('location-name');
        activeFilters.location = attr;
        applyFilters();
      });
    });
    categoryLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const attr = link.getAttribute('category-name');
        activeFilters.category = attr;
        applyFilters();
      });
    });

    function renderActiveMarkers(markers) {
      allMarkers.forEach((marker) => {
        marker.style.display = 'none';
      });

      markers.forEach((marker) => {
        marker.style.display = '';
      });
    }

    applyFilters();
  }

  initFilterToggle();
  filteringSystem();
}

init();
