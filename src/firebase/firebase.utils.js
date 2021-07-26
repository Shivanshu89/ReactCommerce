import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAQAk1nTRuK3D0OWW0Kp3iRV1BhhOanCi8",
    authDomain: "reactcommercedb-757cf.firebaseapp.com",
    projectId: "reactcommercedb-757cf",
    storageBucket: "reactcommercedb-757cf.appspot.com",
    messagingSenderId: "789669280645",
    appId: "1:789669280645:web:25c1a0fc2850c4bcd9a2ec",
    measurementId: "G-ENH5CPSHYW"
  };

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;