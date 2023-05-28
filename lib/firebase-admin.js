import { initializeApp, applicationDefault, getApps, getApp } from 'firebase-admin/app';


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