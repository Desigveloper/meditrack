import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

/** Firebase project configuration for the MediTrack Ghana web client. */
const firebaseConfig = {
  apiKey: "AIzaSyD5KFc4hX5Xm9Pto_94mlmKF2qAPOBRBXk",
  authDomain: "meditrackghana.firebaseapp.com",
  projectId: "meditrackghana",
  storageBucket: "meditrackghana.firebasestorage.app",
  messagingSenderId: "95312857018",
  appId: "1:95312857018:web:a76a1cd90dd49d682cbf83"
};

// Create the Firebase app instance used by this module.
const app = initializeApp(firebaseConfig);

// Export the app's Authentication service for use in other modules.
export const auth = getAuth(app);
