import { initializeApp, applicationDefault, getApps, getApp } from 'firebase-admin/app';
import creds from 'alcove-db989-firebase-adminsdk-v293v-44e3dffb1a.json'

let app;
try {
    console.log("Initiating Firebase Admin")
    if(!getApps().length) {
        app = initializeApp({
            credential: applicationDefault()
        })
    } else {
        console.log("Firebase admin app already exists - using existing")
        app = getApp()
    }

} catch (e) {
    console.error(e)
}


export default app