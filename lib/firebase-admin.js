import { credential } from 'firebase-admin';
import { initializeApp, applicationDefault, getApps, getApp } from 'firebase-admin/app';

let app;
try {
    console.log("Initiating Firebase Admin")
    if(!getApps().length) {
        app = initializeApp({
            credential: credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            })
        })
    } else {
        console.log("Firebase admin app already exists - using existing")
        app = getApp()
    }
} catch (e) {
    console.error(e)
}
export default app