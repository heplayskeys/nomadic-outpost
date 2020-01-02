import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCtPgSMBwWZ2__zJZkFEpzYQ5BE650viks",
    authDomain: "nomadic-outpost-db.firebaseapp.com",
    databaseURL: "https://nomadic-outpost-db.firebaseio.com",
    projectId: "nomadic-outpost-db",
    storageBucket: "nomadic-outpost-db.appspot.com",
    messagingSenderId: "976484080189",
    appId: "1:976484080189:web:0eb5f7f4ca36bffb516854",
    measurementId: "G-RSNCMC5VD5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;