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

const globalCities = [
  { Name: 'Luton', Latitude: '51.9215049', Longitude: '-0.4904125' },
  { Name: 'Erith', Latitude: '51.4813071', Longitude: '0.1594783' },
  {
    Name: 'Bicester',
    Latitude: '51.88032426959815',
    Longitude: '-1.1261653314098603',
  },
  { Name: 'Andover', Latitude: '51.2158549', Longitude: '-1.4520688203' },
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

window.getData = getData;
window.getLocations = getLocations;
window.allCites = globalCities;
