import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBme01MIh7uMD_ahKH3TiZVlVajz06lvFA",
  authDomain: "react-auth-f1deb.firebaseapp.com",
  projectId: "react-auth-f1deb",
  storageBucket: "react-auth-f1deb.appspot.com",
  messagingSenderId: "847233287551",
  appId: "1:847233287551:web:7522c96577e1d7cbebc64a",
});

export default firebaseConfig;
