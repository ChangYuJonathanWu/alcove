import { getAuth } from "firebase/auth";
export const protectedApiCall = async (url, method, body) => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken(true);
    const response = await fetch(url, {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: body
    });
    return response;
}