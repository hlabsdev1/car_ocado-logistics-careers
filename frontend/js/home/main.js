const geoButn = document.querySelector('.geo-butn');
let userLat, userLang;
function success(position) {
  // console.log(
  //   `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
  // );
  userLat = position.coords.latitude;
  userLang = position.coords.longitude;
}

function error() {
  alert('sorry, no position availabe');
}

//User current Location
// function getLocation() {
//   if (!navigator.geolocation) {
//     console.warn('Geolocation is not supported by this browser');
//     return;
//   }
//   navigator.geolocation.getCurrentPosition(success, error, {
//     enableHighAccuracy: false,
//     timeout: 10000,
//     maximumAge: 0,
//   });
// }

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
        console.log('GetCurrentPos', position);
        userLang = position.coords.longitude;
        userLat = position.coords.latitude;
        resolve(position);
      },
      (err) => {
        console.warn('getCurrentPosition error', err);
        reject(err);
      }
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

// geoButn.addEventListener('click', async (e) => {
//   try {
//     await getLocation();
//     wait();
//   } catch (err) {
//     console.warn('User location not available on click:', err);
//     if (err && err.code === err.PERMISSION_DENIED) {
//       alert('Please enable location in your browser or device settings.');
//     }
//   }
// });

function setUserCoordsToMap(map) {
  geoButn.addEventListener('click', async (e) => {
    try {
      await getLocation();
      wait();
      map.setCenter([userLang, userLat]);
    } catch (err) {
      console.warn('User location not available on click:', err);
      if (err && err.code === err.PERMISSION_DENIED) {
        alert('Please enable location in your browser or device settings.');
      }
    }
  });
}

window.addEventListener('load', () => {
  console.log('loaded');
  geoCheckonLoad();
});

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
    { Name: 'South Ockendon', Latitude: '51.5192234', Longitude: '0.2773649' },
    { Name: 'Hatfield', Latitude: '51.7657433', Longitude: '-0.2562941' },
    { Name: 'Crawley', Latitude: '51.1121672', Longitude: '-0.1967593' },
    { Name: 'Milton Keynes', Latitude: '52.0410458', Longitude: '-0.7898619' },
    { Name: 'Liverpool', Latitude: '53.3973117', Longitude: '-2.9966863' },
    { Name: 'Nottingham', Latitude: '52.9565093', Longitude: '-1.2170722' },
    { Name: 'Welwyn Garden', Latitude: '51.8004995', Longitude: '-0.2154367' },
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

  //Using City map array and adding it to locations object
  const enrichedSubLocation = locations.map((loc) => ({
    ...loc,
    cityCoords: city_map.get(loc.City) || [],
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
  search(allJobs);
  filterComp(allJobs);
}

init();
