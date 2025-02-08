// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWq1-Dst9nyWJCJVkMNrfnC0Xp4od8SGY",
  authDomain: "projekt-9ef39.firebaseapp.com",
  projectId: "projekt-9ef39",
  storageBucket: "projekt-9ef39.firebasestorage.app",
  messagingSenderId: "215580281626",
  appId: "1:215580281626:web:2d9b2c372b441ffa8c7aa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Nastav persistence na LOCAL
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to LOCAL');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

// Debug logy
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed in firebase.ts:', user?.email);
});