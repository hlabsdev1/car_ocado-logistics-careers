console.log('what');

const API_URL = 'http://localhost:3000/api/jobs';
const LOCATION_API = 'http://localhost:3000/api/location';

async function getData() {
  try {
    const response = await fetch(API_URL);
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

  console.log(data, locations);
}

function map() {
  /*===========
    VARIABLES
    ==============*/
  const mapCanva = document.querySelector('[hs-map-canva]');
  const accessToken =
    'pk.eyJ1IjoiZGVzaWduaGxhYnMiLCJhIjoiY21jajVjY3RlMDBmdTJrczltNWI0MjY0YyJ9.CgE9quHcoUQVtt84P5L5WQ';
  const hStyle = 'mapbox://styles/designhlabs/cmdrfnjwt00iu01r13kn5f6r8';

  //PARENT LIST ITEMS
  const mainListItems = document.querySelectorAll(`[hs-list-item="main-list"]`);
  const mainListObject = {};

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
    center: [-81.50494910779616, 28.334115149095556], //28.334115149095556, -81.50494910779616
    // zoom: 4.0,
    zoom: isMobile ? 12.0 : 12.2, // Different zoom for mobile
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
  function getGeoData(listLocations) {
    listLocations.forEach((location, i) => {
      // console.log(location);
      let locationLat = location.querySelector('[hs-location-lat]').value;
      let locationLong = location.querySelector('[hs-location-long]').value;
      let coordinates = [locationLong, locationLat];

      let locationID = location.querySelector('[hs-location-id]').value;
      //custom icon variable
      let placeName = location.querySelector('[hs-location-name]').value;
      const icon = location.querySelector('[hs-marker-icon]');
      const popup = location.querySelector('.pin-popup');
      //add array ID
      let arrayID = i + 1 - 1;
      let geoData = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates,
        },
        properties: {
          id: locationID,
          placeName: placeName, // Add Place Name to properties
          // description: locationInfo,
          arrayID: arrayID,
          icon: icon,
          popupBox: popup,
        },
      };

      if (mapLocations.features.includes(geoData) === false) {
        mapLocations.features.push(geoData);
      }
    });
    console.log(mapLocations);
  }

  // define mapping function to be invoked later
  function addMapPoints() {
    //NEW CUSTOM MAP PINS CODE
    mapLocations.features.forEach((location) => {
      const { coordinates } = location.geometry;
      const { placeName, id, arrayID, icon, popupBox } = location.properties;

      // console.log(location.properties);

      // Create a custom HTML element for the marker
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.position = 'absolute';
      // const markerClone = commanInnerMarker.cloneNode(true);
      el.appendChild(icon);

      // Attach the marker to the CMS item as a reference for filtering
      const parentCMSItem = document.querySelectorAll(
        "[hs-location='inner-location']"
      )[arrayID];
      parentCMSItem.setAttribute('data-marker-id', `marker-${arrayID}`);
      el.setAttribute('data-marker-id', `marker-${arrayID}`);

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
        console.log(desktopMedia);
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

      // Add the marker to the map
      new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);
    });
  }

  const cmsItems = document.querySelectorAll("[hs-location='inner-location']");

  getGeoData(cmsItems);
  addMapPoints();

  const tabletMediaQuery = window.innerWidth < 991;
}

init();
