// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBriSZR2zkgKdxtHcHwEJEtIlMwvUuPWl8",
  authDomain: "journal-app-react-d5912.firebaseapp.com",
  projectId: "journal-app-react-d5912",
  storageBucket: "journal-app-react-d5912.appspot.com",
  messagingSenderId: "372285721904",
  appId: "1:372285721904:web:25ece4d348d9cc169cccf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


