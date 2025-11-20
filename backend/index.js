import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import 'dotenv/config';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const locations = require('./ocado-location.json');

const app = express();
app.use(cors()); // allow your browser to call this server

// console.log(process.env.API_KEY);

// Proxy endpoint
app.get('/api/jobs', async (req, res) => {
  try {
    const r = await fetch(process.env.API_KEY);
    if (!r.ok) {
      return res.status(r.status).json({ error: `Upstream error ${r.status}` });
    }
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Proxy error' });
  }
});

//Get location data
app.get('/api/location', (req, res) => {
  return res.json(locations);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
