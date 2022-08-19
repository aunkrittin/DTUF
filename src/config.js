import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = firebase.initializeApp({
  // apiKey: "AIzaSyBe6eNw9EKPmZuN4RZ4th1110Y_zuxJ2-A",
  // authDomain: "react-testing-3b37a.firebaseapp.com",
  // projectId: "react-testing-3b37a",
  // storageBucket: "react-testing-3b37a.appspot.com",
  // messagingSenderId: "750914451151",
  // appId: "1:750914451151:web:81454b98d4e34807fd29ba",

  apiKey: "AIzaSyBme01MIh7uMD_ahKH3TiZVlVajz06lvFA",
  authDomain: "react-auth-f1deb.firebaseapp.com",
  projectId: "react-auth-f1deb",
  storageBucket: "react-auth-f1deb.appspot.com",
  messagingSenderId: "847233287551",
  appId: "1:847233287551:web:7522c96577e1d7cbebc64a",
});

// const storage = getStorage(firebaseConfig);

export default firebaseConfig;
