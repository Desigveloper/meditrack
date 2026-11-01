// db.js — Firestore connection module (ESM)

/** Shared Firebase Admin and Firestore connection for backend modules. */
import admin from "firebase-admin";

// Decode the base64-encoded service-account JSON from the environment.
const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64")
    .toString("utf-8")
);

// Initialize the Admin SDK with the service-account credentials.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

/** Firestore database client. */
const db = admin.firestore();

// Export the database client and Admin SDK for use by backend modules.
export default db;
export { admin };