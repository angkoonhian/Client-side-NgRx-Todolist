import firebase from "firebase"


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB4S7Yp_hbH1AY_kRN5WLR4Er58HfxkvsE",
    authDomain: "bt3103-week-6-49b9d.firebaseapp.com",
    projectId: "bt3103-week-6-49b9d",
    storageBucket: "bt3103-week-6-49b9d.appspot.com",
    messagingSenderId: "358753956595",
    appId: "1:358753956595:web:6e8981517b2ab4964f7d86",
    measurementId: "G-FMRX90ZS24"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.firestore();
export default database;