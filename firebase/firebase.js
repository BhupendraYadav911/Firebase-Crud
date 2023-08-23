import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX8yQGdhlZCztEGBaeYXbZxOT2fJwRnys",
  authDomain: "employee-management-4039e.firebaseapp.com",
  projectId: "employee-management-4039e",
  storageBucket: "employee-management-4039e.appspot.com",
  messagingSenderId: "528695751281",
  appId: "1:528695751281:web:09955025f6375c0e68a1d0",
  measurementId: "G-1QQ4CNMTBL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);