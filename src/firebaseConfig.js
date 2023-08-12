import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_o9UtXgAFWzPNj33I_VAIL-DWjPrGAx4",
  authDomain: "typing-website-f9302.firebaseapp.com",
  projectId: "typing-website-f9302",
  storageBucket: "typing-website-f9302.appspot.com",
  messagingSenderId: "346519885213",
  appId: "1:346519885213:web:c4da9428c38edf03aa4b74",
  measurementId: "G-7694JHWWQR"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();

  export {auth, db};