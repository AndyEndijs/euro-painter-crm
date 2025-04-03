// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8_5iE29ean4AXldpZHA76Pp3HDRvhxOM",
  authDomain: "europainters-33000.firebaseapp.com",
  projectId: "europainters-33000",
  storageBucket: "europainters-33000.appspot.com",
  messagingSenderId: "8510389135",
  appId: "1:8510389135:web:f14e38ea93025ec8dde9fa",
  measurementId: "G-5XZPQ6J207"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
