import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const encodedKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!encodedKey) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.");
}

const serviceAccount = JSON.parse(
    Buffer.from(encodedKey, 'base64').toString('utf-8')
);

const firebaseApp = initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore(firebaseApp);

export default db;
export { firebaseApp };