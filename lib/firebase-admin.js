import * as firebaseAdmin from 'firebase-admin';
import { initializeApp, applicationDefault, getApps, getApp, } from 'firebase-admin/app';

try {
    console.log("Initiating Firebase Admin")
    if(!getApps().length) {
        initializeApp({
            credential: firebaseAdmin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        })
    } else {
        console.log("Firebase admin app already exists - using existing")
    }
} catch (e) {
    console.error(e)
}
export { firebaseAdmin }