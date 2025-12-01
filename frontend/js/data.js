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

// make them available globally
window.getData = getData;
window.getLocations = getLocations;
