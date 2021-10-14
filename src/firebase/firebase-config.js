// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0VKbN0C0cVXb1jLwjUO75REi-_2XV4EI",
  authDomain: "infomedic-b0da5.firebaseapp.com",
  projectId: "infomedic-b0da5",
  storageBucket: "infomedic-b0da5.appspot.com",
  messagingSenderId: "312607861588",
  appId: "1:312607861588:web:c363418b3134c1111d76c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}