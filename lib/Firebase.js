import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const storage = firebase.storage();
export { firebase, storage }