# MediTrack
An AI-powered pharmacy stock and prescription assistant. MediTrack helps community pharmacies manage medicine inventory, avoid stock outs and expiry losses, and give patients reliable information about medicine availability — all through a web dashboard and a mobile app.

Status: In active development. This project is being built step by step as a documented learning journey; every phase below records what was built and why.

## The Problem
Community pharmacies commonly manage stock with notebooks or spreadsheets. The consequences:
- Expiry losses — medicines expire on the shelf unnoticed, destroying their value.
- Stockouts — patients arrive and find essential medicines unavailable, with no way to locate the nearest pharmacy that has them.
- No data — pharmacy owners cannot see which products are profitable or which suppliers to reorder from.

MediTrack addresses all three with a simple inventory model, proactive alerts, and an AI guidance layer with safety guardrails.

## Features
- Medicine stock intake with quantity, pricing, expiry dates, and suppliers
- Automatic low-stock and expiry alerts
- Medicine availability search
- AI-powered symptom-to-medicine-category guidance with safety disclaimers (never a diagnosis)
- Web dashboard for pharmacy owners
- Mobile app for stock management on the move
- REST API with Firebase authentication, per-user inventory isolation, and business-rule validation

## Tech Stack
 Layer              | Technology                        | Purpose
- Frontend (web)    | React, JavaScript                 | Pharmacy dashboard UI
- Frontend (mobile) | React Native                      | Mobile stock management app
- Backend           | Node.js/Express API               | REST API for stock and users
- Authentication    | Firebase Authentication           | Sign-in and identity for staff and patients
- Database          | Google Firestore                  | NoSQL document storage of stock records
- AI                | Python Microservices, LLM API     | Symptom guidance and stock insights

## Architecture
flowchart LR
    A[React Web Dashboard]                           -->     D[Express Backend]
    B[React Native Mobile App]                       -->     D[Express Backend]
    A[React Web Dashboard]                           -->     G[Firebase Authentication]
    B[React Native Mobile App]                       -->     G[Firebase Authentication]
    G[Firebase Authentication]   issues ID tokens    -->     G[Firebase Authentication]
    D[Node.js/Express Backend]                       -->     E[(Firestore)]
    D[Node.js/Express Backend]                       -->     F[Python AI Services]

## Project Structure

The repository layout is documented in
[docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md). API routes are
described in [docs/api.md](./docs/api.md).

## Getting Started

### Prerequisites

- Node.js and npm
- A Firebase project with Email/Password Authentication and Firestore enabled
- A Firebase Admin service-account key for the backend

### Backend

The backend reads `FIREBASE_SERVICE_ACCOUNT_KEY`, a base64-encoded service-account
JSON value, when it starts. Keep this credential private and do not commit it.

1. In `backend/`, install dependencies with `npm install`.
2. Set `FIREBASE_SERVICE_ACCOUNT_KEY` in your environment or a local `backend/.env`
   file. To encode a local `serviceAccountKey.json`, run
   `node scripts/encode-key.js` from `backend/`; the script prints the encoded
   credential, so handle its output as a secret.
3. Start the API from `backend/` with `npm start`. It listens on port 4000 by
   default; set `PORT` to use another port.

The API currently has no `/health` endpoint. The authenticated `GET /stock` route
is the available read endpoint and expects a Firebase ID token in a Bearer
authorization header.

### Web dashboard

1. Create web/.env containing VITE_API_URL=http://localhost:4000.
2. In `web/`, install dependencies with `npm install`.
3. Start the Vite development server with `npm run dev`. By default, the
   dashboard is served at `http://localhost:5173`.
4. Use `npm run lint` and `npm run build` in `web/` to lint and build the
   frontend.
5. Sign in with a registered MediTrack account.

# Development Progress Log
Phase  | Scope                                     | Status       | Key Learning
__________________________________________________________________________________________________
1.     | Repository setup and documentation        | Complete     | Git, commits, README
__________________________________________________________________________________________________
2.     | Node.js/Express backend API with          |              | Express routing,     
       | Firebase Authentication                   | Complete     | request/response 
       |                                           |              | cycle, status codes,
       |                                           |              | Firestore persistence,
       |                                           |              | async/await, ES modules,
       |                                           |              | secret management via 
       |                                           |              | environment variable,
       |                                           |              | Firebase Authentication,
       |                                           |              | ID Token verification 
       |                                           |              | middleware, user registration,
       |                                           |              | user registration, ownership
       |                                           |              | ownership-based authorization,
       |                                           |              | schema migration, route 
       |                                           |              | parameters, status codes
       |                                           |              | 401/403/400/500/404/409,
       |                                           |              | validation modules & separation
       |                                           |              | of concerns
___________________________________________________________________________________________________
3.     | React web dashboard                       | In progress  | Vite Scaffolding, components,
       |                                           |              | JSX, useState, controlled input,
       |                                           |              | props, useEffect & subscription,
       |                                           |              | Firebase session persistence, 
       |                                           |              | git branch workflow, 
___________________________________________________________________________________________________
4.     | Python AI guidance microservices          | Planned      |
____________________________________________________________________________________________________
5.     | React Native mobile app                   | Planned      |
____________________________________________________________________________________________________
6.     | Assembly and polish                       | Planned      |
____________________________________________________________________________________________________

## Safety and Ethics
MediTrack provides over-the-counter guidance only and never diagnoses. All AI responses carry a disclaimer directing users to a licensed pharmacist or medical professional for prescription decisions.

## License
MIT (to be finalized in Phase 6).