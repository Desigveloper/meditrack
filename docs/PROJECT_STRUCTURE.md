# Project files and structure

This document describes the files that exist today and a practical structure to
grow into. The suggested folders are not all implemented yet.

## Current files

### Repository root

| Path | Purpose |
|---|---|
| `README.md` | Project overview, current setup instructions, and development status |
| `.gitignore` | Excludes local editor settings, environment files, dependencies, service-account keys, and the standalone `tests.js` file |
| `.vscode/settings.json` | Workspace-specific editor settings |
| `tests.js` | A small JavaScript scratch file; it is not a test suite and is ignored by Git |

### `backend/`

| Path | Purpose |
|---|---|
| `server.js` | Express application, registration endpoint, and stock create/read/update routes |
| `db.js` | Initializes Firebase Admin and Firestore from `FIREBASE_SERVICE_ACCOUNT_KEY` |
| `middleware/auth.js` | Verifies Firebase ID tokens and attaches the decoded user to requests |
| `validators/stock.js` | Validates required stock fields and price/quantity rules |
| `scripts/encode-key.js` | Base64-encodes a local `serviceAccountKey.json` for configuring the backend credential |
| `scripts/migrate-owner.js` | Assigns an owner UID to stock records that do not have one |
| `package.json`, `package-lock.json` | Backend dependencies and their lockfile; a backend test script is not configured yet |
| `.env` | Local environment configuration; should remain untracked and private |

### `web/`

| Path | Purpose |
|---|---|
| `src/main.jsx` | Browser entry point that mounts the React application |
| `src/App.jsx` | Authentication-state listener and top-level sign-in/dashboard switch |
| `src/firebase.js` | Initializes the Firebase client SDK used by the dashboard |
| `src/components/SignIn.jsx` | Email/password sign-in form |
| `src/components/Inventory.jsx` | Loads and displays the signed-in user's stock |
| `src/App.css`, `src/index.css` | Application and global styles |
| `src/assets/` | Images and starter/template assets imported by the frontend |
| `public/` | Static assets served without being imported by the application |
| `index.html` | Vite HTML entry point |
| `vite.config.js` | Vite and React plugin configuration |
| `eslint.config.js` | Frontend lint rules |
| `.gitignore` | Frontend-specific ignored files |
| `package.json`, `package-lock.json` | Frontend dependencies, scripts, and lockfile |
| `README.md` | Vite starter documentation; replace it with web-specific setup notes when needed |

## Recommended next-step layout

Keep the current two applications as separate deployable units. Avoid moving
files until a change needs the extra separation; when routes and business logic
grow, use a structure like this:

```text
meditrack/
├── README.md
├── docs/
│   ├── PROJECT_STRUCTURE.md
│   └── api.md
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── validators/
│   │   └── repositories/
│   ├── scripts/
│   ├── tests/
│   ├── package.json
│   └── package-lock.json
├── web/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/inventory/
│   │   ├── services/
│   │   ├── styles/
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
├── ai/                 # Add when the AI service is implemented
└── mobile/             # Add when the mobile app is implemented
```

The backend layers should have distinct responsibilities: routes map HTTP paths,
controllers translate requests and responses, services own business workflows,
repositories encapsulate Firestore access, and validators enforce input rules.
For a small API, keep these layers only where they reduce complexity rather
than creating empty placeholder files. Frontend feature folders can group
inventory-specific UI and API access as that feature expands.

## Organization follow-ups

- Replace the ignored root `tests.js` scratch file with actual tests under
  `backend/tests/` and `web/src/**/__tests__/`, or remove it when it is no longer
  useful.
- Add backend start and test scripts to `backend/package.json` when the test
  runner and test coverage are established.
- Retire unused Vite starter assets and documentation after confirming they
  are not referenced.
- Keep secrets in ignored local environment files or a deployment secret
  manager; commit only a placeholder `.env.example` with variable names and
  non-secret examples.
