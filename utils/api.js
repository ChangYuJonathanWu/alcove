import { getAuth } from "firebase/auth";
import { Capacitor } from '@capacitor/core';
import { publicRuntimeConfig } from "@/next.config";

const buildUrl = (path) => {
    if (Capacitor.isNative && process.env.NODE_ENV === 'production') {
        console.log("Using native API URL")
        return `${publicRunTimeConfig.apiOrigin}${path}`
    }
    return path
}
export const protectedApiCall = async (url, method, body) => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken(true);
    const response = await fetch(buildUrl(url), {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: body
    });
    return response;
}