function success(position) {
  console.log(
    `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
  );
}

function error() {
  alert('sorry, no position availabe');
}

//User current Location
function getLocation() {
  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser');
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: false,
    timeout: 10000,
    maxiumAge: 0,
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
      console.log('granted');
    } else if (result.state === 'prompt') {
      console.log('still choosing');
    } else if (result.state === 'denied') {
      console.log('Permission denied.');
    }
  } catch (err) {
    console.warn('Error checking Permission API: ', err);
  }
}

geoButn.addEventListener('click', getLocation);
