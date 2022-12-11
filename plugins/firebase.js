import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAYKxl_A7UBhjz73PPxgqLBEAf_fuA6qDs",
    authDomain: "modern-practice-5ba00.firebaseapp.com",
    projectId: "modern-practice-5ba00",
    storageBucket: "modern-practice-5ba00.appspot.com",
    messagingSenderId: "588593274650",
    appId: "1:588593274650:web:e5356943029864246216a3",
    measurementId: "G-F17RTSY177",
  });
}

export default firebase;
