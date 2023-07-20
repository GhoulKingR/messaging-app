// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import function for creating firestore database
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqpoiabXckHu6Dcr1roTEO9bZR3N_Uk2c",
  authDomain: "messenger-clone-33b04.firebaseapp.com",
  projectId: "messenger-clone-33b04",
  storageBucket: "messenger-clone-33b04.appspot.com",
  messagingSenderId: "369119230568",
  appId: "1:369119230568:web:6b74be1abe6d4105d219dd",
  measurementId: "G-WRPZTYYLZS",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Get firestore database
const db = getFirestore();

// Export database
export default db;
