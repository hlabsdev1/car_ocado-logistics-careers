import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const locations = require('./temp.json');
console.log('ok', typeof locations);
