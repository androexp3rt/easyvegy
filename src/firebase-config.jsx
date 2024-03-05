import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQ8ygvMHSHQbzicEcreA94chpKHEfhWe8",
  authDomain: "easyvegy-c6528.firebaseapp.com",
  projectId: "easyvegy-c6528",
  storageBucket: "easyvegy-c6528.appspot.com",
  messagingSenderId: "942343294793",
  appId: "1:942343294793:web:a38d904fc90e689d5a1498",
  measurementId: "G-BEJGSL009H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);