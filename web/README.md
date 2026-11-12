# MediTrack web dashboard

## Development

1. Create `web/.env` and set `VITE_API_URL=http://localhost:4000`.
2. Install dependencies with `npm install`.
3. Start the dashboard with `npm run dev`.

The Firebase client configuration is in `src/services/firebase.js`. The backend
must be running and configured with its Firebase Admin service-account
credential for authenticated inventory requests to work.

Run `npm run lint` and `npm run build` to validate the frontend.
