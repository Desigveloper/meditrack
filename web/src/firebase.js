import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD5KFc4hX5Xm9Pto_94mlmKF2qAPOBRBXk",
  authDomain: "meditrackghana.firebaseapp.com",
  projectId: "meditrackghana",
  storageBucket: "meditrackghana.firebasestorage.app",
  messagingSenderId: "95312857018",
  appId: "1:95312857018:web:a76a1cd90dd49d682cbf83"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
