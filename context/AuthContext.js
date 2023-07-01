import React, { useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import { firebase } from '@/lib/Firebase';
import nookies from 'nookies';

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

// https://colinhacks.com/essays/nextjs-firebase-authentication
export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    const auth = getAuth();
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            setAuthReady(true);
            if (!user) {
                setUser(null);
                nookies.set(undefined, 'token', '', { path: '/'});
                return;
            }

            const token = await user.getIdToken();
            setUser(user);
            nookies.set(undefined, 'token', token, { path: '/'});
        });
    }, [auth])

    return (
        <AuthContext.Provider value={{ user, authReady }}>
            {children}
        </AuthContext.Provider>
    );
};
