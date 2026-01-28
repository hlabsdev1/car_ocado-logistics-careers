const JOB_URL =
  'https://ocado-logistic-careers3.car-ocado-logistic.workers.dev/api/jobs';
const LOCATION_API =
  'https://ocado-logistic-careers3.car-ocado-logistic.workers.dev/api/location';

async function getData() {
  try {
    const response = await fetch(JOB_URL);
    if (response.ok) {
      const result = await response.json();
      const EXCLUDED = [
        803, 163, 796, 819, 810, 590, 616, 772, 727, 823, 701, 781, 824,
      ];
      result.items = result.items.filter((job) => {
        const reqNum = Number(job.requisition_number);
        // console.log(reqNum);
        return !EXCLUDED.includes(reqNum);
      });
      // console.log('Filtered items:', result.items);
      return result;
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
    return { items: [] };
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
    Latitude: '51.5138663',
    Longitude: '0.192033501',
  },
  { Name: 'Hatfield', Latitude: '51.7657433', Longitude: '-0.2562941' },
  { Name: 'Crawley', Latitude: '51.1365656', Longitude: '-0.1917502' },
  {
    Name: 'Milton Keynes',
    Latitude: '52.0679192',
    Longitude: '-0.7314287',
  },
  { Name: 'Knowsley', Latitude: '53.4791484', Longitude: '-2.8713141' },
  { Name: 'Nottingham', Latitude: '52.8891615', Longitude: '-1.2119526' },
  {
    Name: 'Welwyn Garden City',
    Latitude: '51.8038573',
    Longitude: '-0.1985253',
  },
  { Name: 'Manchester', Latitude: '53.3534735', Longitude: '-2.2057892' },
  { Name: 'Bristol', Latitude: '51.511953', Longitude: '-2.6840311' },
  { Name: 'Leeds', Latitude: '53.7395884', Longitude: '-1.6569327' },
  { Name: 'Sheffield', Latitude: '53.4060214', Longitude: '-1.4355539' },
  { Name: 'West Drayton', Latitude: '51.5048165', Longitude: '-0.4498799' },
  { Name: 'Peterborough', Latitude: '52.5693504', Longitude: '-0.2146538' },
  { Name: 'Weybridge', Latitude: '51.3475427', Longitude: '-0.4931859' },
  { Name: 'Oxford', Latitude: '51.6341752', Longitude: '-1.5354347' },
  { Name: 'Enfield', Latitude: '51.6771013', Longitude: '-0.0253564' },
  { Name: 'Wimbledon', Latitude: '51.4346312', Longitude: '-0.2010254' },
  { Name: 'Merton', Latitude: '51.4122001', Longitude: '-0.1914294' },
  { Name: 'Acton', Latitude: '51.5018002', Longitude: '-0.2763387' },
  { Name: 'Leyton', Latitude: '51.5648302', Longitude: '-0.0338744' },
  { Name: 'Walthamstow', Latitude: '51.5722418', Longitude: '-0.0371206' },
];
// const testData = getData();
// console.log(testData);

window.getData = getData;
window.getLocations = getLocations;
window.allCites = globalCities;
