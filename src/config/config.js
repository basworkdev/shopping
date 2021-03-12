import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBhWd4dUR5lEJbvTMNUvn0inVmJb8WQMrw",
    authDomain: "rodxshop.firebaseapp.com",
    projectId: "rodxshop",
    storageBucket: "rodxshop.appspot.com",
    messagingSenderId: "892711424114",
    appId: "1:892711424114:web:2216066eed7c48b0c332eb",
    measurementId: "G-7EWM2MDQNF"
  });

  export default firebaseConfig;