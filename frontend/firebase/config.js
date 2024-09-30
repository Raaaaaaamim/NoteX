// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase Authentication

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkle6KBKSJTXl7AVbsvISnIRfDlVWY2Lw",
  authDomain: "notes-app-x1.firebaseapp.com",
  projectId: "notes-app-x1",
  storageBucket: "notes-app-x1.appspot.com",
  messagingSenderId: "644555519467",
  appId: "1:644555519467:web:66a8d48b48857bd5d6d5ae",
  measurementId: "G-P8L0JNVWJH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
