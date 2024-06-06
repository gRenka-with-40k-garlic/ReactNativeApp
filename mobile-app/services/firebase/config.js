// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2-7m1jnkee1eZqcQpDsBstSAtFQ-bGYw",
  authDomain: "mobile-app-2c7d0.firebaseapp.com",
  projectId: "mobile-app-2c7d0",
  storageBucket: "mobile-app-2c7d0.appspot.com",
  messagingSenderId: "426576633714",
  appId: "1:426576633714:web:bb8c629779b6302c7c47eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;