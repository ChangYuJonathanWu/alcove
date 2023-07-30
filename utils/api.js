import { getAuth } from "firebase/auth";
export const protectedApiCall = async (url, method, body) => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken(true);
    const response = await fetch(url, {
        method: method,
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        },
        body: body
    });
    const data = await response.json();
    return data;
    }