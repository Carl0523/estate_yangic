// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-yonder.firebaseapp.com",
  projectId: "home-yonder",
  storageBucket: "home-yonder.appspot.com",
  messagingSenderId: "893981092022",
  appId: "1:893981092022:web:420fa7faac456d91569e17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);