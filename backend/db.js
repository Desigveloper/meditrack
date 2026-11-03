import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// FIREBASE_SERVICE_ACCOUNT_KEY should be a base64-encoded JSON string of the Firebase service account credentials.
// Example: export FIREBASE_SERVICE_ACCOUNT_KEY=$(cat serviceAccount.json | base64 -w 0)
const encodedKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!encodedKey) {
    throw new Error(
        "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. " +
        "Please set it in your environment. For example, you can add it to your .env file:\n" +
        "FIREBASE_SERVICE_ACCOUNT_KEY=your_base64_encoded_service_account_json"
    );
}

let serviceAccount;
try {
    serviceAccount = JSON.parse(
        Buffer.from(encodedKey, 'base64').toString('utf-8')
    );
} catch (error) {
    throw new Error(
        "Failed to decode or parse FIREBASE_SERVICE_ACCOUNT_KEY: " + error.message +
        ".\nPossible causes: the environment variable is not valid base64, or the decoded content is not valid JSON."
    );
}


const firebaseApp = initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore(firebaseApp);

export { db, firebaseApp };