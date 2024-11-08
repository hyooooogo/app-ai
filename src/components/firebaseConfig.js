// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXYmr_hvMfWBNh1v_HmJYbquRL-G1A9AQ",
  authDomain: "app-ai-7bb01.firebaseapp.com",
  projectId: "app-ai-7bb01",
  storageBucket: "app-ai-7bb01.appspot.com", // 修正
  messagingSenderId: "760775895383",
  appId: "1:760775895383:web:fca20d144587f29f99b612"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, db };