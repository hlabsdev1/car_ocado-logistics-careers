// src/worker.js

// Import your JSON file (Wrangler will bundle this)
import locations from '../ocado-location.json' assert { type: 'json' };

// Common CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Helper to build JSON responses with CORS
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET /api/jobs  (proxy)
    if (pathname === '/api/jobs' && request.method === 'GET') {
      try {
        const r = await fetch(env.API_KEY); // env.API_KEY is your URL

        if (!r.ok) {
          return jsonResponse(
            { error: `Upstream error ${r.status}` },
            r.status
          );
        }

        const data = await r.json();
        return jsonResponse(data);
      } catch (err) {
        return jsonResponse({ error: err.message || 'Proxy error' }, 500);
      }
    }

    // GET /api/location  (static JSON)
    if (pathname === '/api/location' && request.method === 'GET') {
      return jsonResponse(locations);
    }

    // Fallback 404
    return new Response('Not found', { status: 404 });
  },
};
