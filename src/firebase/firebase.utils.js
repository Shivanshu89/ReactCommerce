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

  //store data in firestore database
  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();
         try{
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
         }catch(error) {
            console.log('error creating user', error.message);
         }
    }
    return userRef;
  }

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;