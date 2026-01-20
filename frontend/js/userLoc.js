/* 
======= User GeoLocation Function ==============
======= User GeoLocation Function ==============
======= User GeoLocation Function ==============
*/

const geoButn = document.querySelectorAll('[get-userloc]');
const mapLayer = document.querySelector('.ma-get_loc-wrap');
const searchLocation = document.querySelectorAll('.search-utils-location');
const homeMap = document.querySelector('[home-map]');
let userLat, userLang;
function success(position) {
  // console.log('GetCurrentPos', position);
  userLat = position.coords.latitude;
  userLang = position.coords.longitude;

  window.__USER_LOCATION__ = {
    lat: userLat,
    lng: userLang,
  };

  if (userLat !== undefined && userLang !== undefined) {
    console.log('all good');
    if (mapLayer) {
      mapLayer.classList.add('is--hide');
    }
    if (geoButn) {
      geoButn.forEach((butn) => {
        butn.classList.add('is--active');
      });
    }
    window.dispatchEvent(
      new CustomEvent('user:locationReady', {
        detail: { lat: userLat, lng: userLang },
      }),
    );
  }
}

function error() {
  alert('sorry, no position availabe');
}

function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      const msg = 'Geolocation not supported by this browser';
      console.warn(msg);
      return reject(new Error(msg));
    }
    const opts = { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log("GetCurrentPos", position);
        success(position);
        resolve(position);
      },
      (err) => {
        console.warn('getCurrentPosition error', err);
        reject(err);
      },
    );
  });
}

//On Page load check if Geolocation is on
async function geoCheckonLoad() {
  console.log('is this working?');
  // secure context check
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    console.warn('Geolocation & Permissions API require HTTPS or localhost.');
    return;
  }
  if (!navigator.permissions || !navigator.permissions.query) {
    console.log('Permissions API not supported');

    return;
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state === 'granted') {
      await getLocation().catch((e) => console.warn('autoget failed:', e));
    } else if (result.state === 'prompt') {
      console.log('still choosing');
    } else if (result.state === 'denied') {
      console.log('Permission denied.');
    }

    // listen for live changes (user flips permission in browser UI)
    if (typeof result.onchange === 'function') {
      result.onchange = async () => {
        console.log('Permission changed ->', result.state);
        if (result.state === 'granted') {
          try {
            await getLocation();
            // call any follow-up logic that depends on userLat/userLng
            wait();
          } catch (e) {
            console.warn('getLocation after permission change failed:', e);
          }
        }
      };
    } else {
      console.log('Permissions result.onchange not supported in this browser.');
    }
  } catch (err) {
    console.warn('Error checking Permission API: ', err);
  }
}

function wait() {
  console.log('what the heck?');
}

function drawRadiusCircle(map, lng, lat) {
  const circle = turf.circle([lng, lat], 50, {
    units: 'miles',
    steps: 64,
  });

  if (map.getSource('radius-circle')) {
    map.getSource('radius-circle').setData(circle);
    return;
  }

  map.addSource('radius-circle', {
    type: 'geojson',
    data: circle,
  });

  map.addLayer({
    id: 'radius-circle-fill',
    type: 'fill',
    source: 'radius-circle',
    paint: {
      'fill-color': '#2563eb',
      'fill-opacity': 0.15,
    },
  });

  map.addLayer({
    id: 'radius-circle-outline',
    type: 'line',
    source: 'radius-circle',
    paint: {
      'line-color': '#2563eb',
      'line-width': 2,
    },
  });
}

window.drawRadiusCircle = drawRadiusCircle;

function setUserCoordsToMap(map) {
  if (!geoButn) return;

  geoButn.forEach((butn) => {
    butn.addEventListener('click', async (e) => {
      try {
        const position = await getLocation();

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        map.setCenter([lng, lat]);
        drawRadiusCircle(map, lng, lat);
        if (homeMap) {
          const mapElementPos = homeMap.getBoundingClientRect().top;
          const offsetMap = mapElementPos + window.scrollY - 100;
          window.scrollTo({
            top: offsetMap,
            behavior: 'smooth',
          });
        }
      } catch (err) {
        console.warn('User location not available on click:', err);
        if (err && err.code === err.PERMISSION_DENIED) {
          alert('Please enable location in your browser or device settings.');
        }
      }
    });
  });
}

window.addEventListener('load', () => {
  console.log('loaded');
  geoCheckonLoad();
});
