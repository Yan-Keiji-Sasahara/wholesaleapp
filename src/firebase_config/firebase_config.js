import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8faJnJ5sZZSGxUMD1CY2C_x-Z9GVDPHg",
  authDomain: "wholesaleapp-584ef.firebaseapp.com",
  projectId: "wholesaleapp-584ef",
  storageBucket: "wholesaleapp-584ef.appspot.com",
  messagingSenderId: "125361823887",
  appId: "1:125361823887:web:169f6871c005b2a2bc90fa",
  measurementId: "G-6694TC8MD5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
