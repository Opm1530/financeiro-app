import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase project config
// You get this from the Firebase Console -> Project Settings -> General -> "Your apps"
const firebaseConfig = {
    apiKey: "AIzaSyA_XuXfg5-WqkXNlcaD0bnNUOUOXJNYNQ0",
    authDomain: "pequidigital-7863c.firebaseapp.com",
    projectId: "pequidigital-7863c",
    storageBucket: "pequidigital-7863c.firebasestorage.app",
    messagingSenderId: "452279471477",
    appId: "1:452279471477:web:a36f8f02491c2971cf173c",
    measurementId: "G-H5L4XR0X5V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
