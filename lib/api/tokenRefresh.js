import {
    getAuth,
} from 'firebase/auth';

export const refreshFirebaseToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const token = await user.getIdToken()
    return token
}

