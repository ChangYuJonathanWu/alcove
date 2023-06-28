import React, { useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import { firebase } from '@/lib/Firebase';
import nookies from 'nookies';

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState(null);

    const auth = getAuth();
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
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

    useEffect(() => {
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);

        return () => clearInterval(handle);
    }, [auth]);


    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};
