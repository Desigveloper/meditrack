# Project structure

The repository is organized as two applications: the Express API in `backend/`
and the React dashboard in `web/`. `ai/` and `mobile/` are reserved for future
applications; they contain no implementation yet.

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
│   │   ├── config/firebase.js
│   │   ├── middleware/auth.js
│   │   ├── routes/index.js
│   │   ├── validators/stock.js
│   │   ├── controllers/
│   │   ├── services/
│   │   └── repositories/
│   ├── scripts/
│   ├── tests/
│   ├── package.json
│   └── package-lock.json
├── web/
│   ├── public/
│   ├── src/
│   │   ├── app/App.jsx
│   │   ├── components/SignIn.jsx
│   │   ├── features/inventory/
│   │   │   ├── AddStockForm.jsx
│   │   │   ├── Inventory.jsx
│   │   │   └── alerts.js
│   │   ├── services/firebase.js
│   │   ├── styles/
│   │   ├── assets/
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
├── ai/                 # Reserved for the future AI service
└── mobile/             # Reserved for the future mobile application
```

## Backend responsibilities

- `src/app.js` configures Express middleware and mounts the API routes.
- `src/server.js` loads environment configuration and starts the HTTP server.
- `src/config/` initializes external services such as Firebase Admin.
- `src/middleware/` contains request middleware, including token verification.
- `src/routes/` maps HTTP paths to request handlers.
- `src/controllers/`, `src/services/`, and `src/repositories/` are ready for
  separation of HTTP handling, business workflows, and Firestore access as the
  API grows. They are intentionally empty until that separation is useful.
- `src/validators/` contains stock input validation.
- `scripts/` contains administrative and local credential utility scripts.
- `tests/` is the location for backend tests; a test runner is not configured
  yet.

## Web responsibilities

- `src/app/` contains the root application component and app-level composition.
- `src/components/` contains UI shared across dashboard features.
- `src/features/inventory/` groups inventory UI and related logic.
- `src/services/` contains client integrations such as Firebase.
- `src/styles/` contains global and app-level stylesheets.
- `src/assets/` contains imported frontend assets; `public/` contains static
  files served directly by Vite.

Root-level package/configuration files stay with their respective application.
Local `.env` files, dependencies, and generated build output are not source
files and should remain in their current ignored locations. The ignored root
`tests.js` is a scratch file rather than a test suite and is therefore not part
of the application structure.
