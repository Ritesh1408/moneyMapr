// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbJ98f8JGUmGsZqh2Aq2UK9ZlRn6MfNPo",
  authDomain: "moneymapr-9f593.firebaseapp.com",
  projectId: "moneymapr-9f593",
  storageBucket: "moneymapr-9f593.firebasestorage.app",
  messagingSenderId: "697922586036",
  appId: "1:697922586036:web:7588407d572e59cd18dee1",
  measurementId: "G-GC6HT9WL6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerfb = new FacebookAuthProvider();
export { db, auth, provider, providerfb, doc, setDoc };

