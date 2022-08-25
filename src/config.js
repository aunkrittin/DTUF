import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAVF6asQANw9KrwNpmDnfr-xIHmiONu6-Y",
  authDomain: "dtuf-finalproject.firebaseapp.com",
  projectId: "dtuf-finalproject",
  storageBucket: "dtuf-finalproject.appspot.com",
  messagingSenderId: "418252907526",
  appId: "1:418252907526:web:d9e91764fb66b3f3134f87",

  // apiKey: "AIzaSyBme01MIh7uMD_ahKH3TiZVlVajz06lvFA",
  // authDomain: "react-auth-f1deb.firebaseapp.com",
  // projectId: "react-auth-f1deb",
  // storageBucket: "react-auth-f1deb.appspot.com",
  // messagingSenderId: "847233287551",
  // appId: "1:847233287551:web:7522c96577e1d7cbebc64a",
});

// const storage = getStorage(firebaseConfig);

export default firebaseConfig;
