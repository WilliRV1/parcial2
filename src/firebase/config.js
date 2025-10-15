// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";           

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm2jhOQ5b3qbn1eRE6rmi1tTZtg2oWTnM",
  authDomain: "parcial2-ff81f.firebaseapp.com",
  projectId: "parcial2-ff81f",
  storageBucket: "parcial2-ff81f.firebasestorage.app",
  messagingSenderId: "1034911797253",
  appId: "1:1034911797253:web:21626b71c0bf24917c8c6c",
  measurementId: "G-7P8H6X9CX4"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);