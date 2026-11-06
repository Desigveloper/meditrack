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
This section grows as the project grows. Planned layout:

meditrack/
├── README.md          # Project documentation (this file)
├── backend/           # Node.js/Express API application (Phase 2)
├── web/               # React web dashboard (Phase 3)
├── ai/                # AI guidance service (Phase 4)
└── mobile/            # React Native app (Phase 5)

# Getting Started
## Backend (Phase 2)
Express server exists in backend/. Setup instructions below.

Prerequisite: a Firebase project with Firestore and Email/Password authentication enabled, and a Google service account private key.
1. Copy backend/.env.example to backend/.env and fill in FIREBASE_SERVICE_ACCOUNT_KEY with the base64 encoding of your service account key (run node scripts/encode-service-account.js from backend/ to generate it).
2. From backend/, install dependencies: npm install.
3. Start the server: node server.js.
4. Verify: GET http://localhost:4000/health returns {"status":"ok"}.

The web dashboard (Phase 3) will be added to this section as it takes shape.

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
3.     | React web dashboard                       | Planned      |
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