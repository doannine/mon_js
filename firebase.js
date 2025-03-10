// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGBzpX-JXsRGnZ4Krln3ABWICyULUWNNo",
    authDomain: "crudphone-9e69a.firebaseapp.com",
    projectId: "crudphone-9e69a",
    storageBucket: "crudphone-9e69a.firebasestorage.app",
    messagingSenderId: "580297471397",
    appId: "1:580297471397:web:74a64f8ed5d4b4d9e5244c",
    measurementId: "G-CYD7D3263B"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


