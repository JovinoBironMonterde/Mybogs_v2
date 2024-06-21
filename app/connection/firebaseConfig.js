// connection/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEx9-ImqGesqMr_ZiQ9xfyrUUtxP44q7Y",
  authDomain: "jovinosblog.firebaseapp.com",
  projectId: "jovinosblog",
  storageBucket: "jovinosblog.appspot.com",
  messagingSenderId: "837149057214",
  appId: "1:837149057214:web:7fd7b93bb19469ec46feef",
  measurementId: "G-JVZYZDSBTJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
