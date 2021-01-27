import { createContext, useContext, useState } from 'react';
import jwt from 'shared/jwt.js';

const AUTHENTICATION_SERVICE_URL = process.env.REACT_APP_AUTHENTICATION_SERVICE_URL;
const JWT_LOCAL_STORAGE_KEY = process.env.REACT_APP_JWT_LOCAL_STORAGE_KEY;

const useAuthProvider = () => {
    const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    const [user, setUser] = useState(jwt.verify(token));

    const login = ({ login, password }) => new Promise((resolve, reject) => {

        const base64Creds = Buffer
            .from(JSON.stringify({ login, password }), 'ascii')
            .toString('base64');

        const options = {
            method: 'GET',
            headers: { 'Authorization': base64Creds }
        }

        fetch(AUTHENTICATION_SERVICE_URL, options)
            .then(response => {
                if (response.status === 500) {
                    throw new Error("Something went wrong.");
                }

                if (response.status === 401) {
                    throw new Error("Incorrect login or password.");
                }

                return response;
            })
            .then(response => response.json())
            .then(json => {
                const { token } = json;
                localStorage.setItem(JWT_LOCAL_STORAGE_KEY, token);
                setUser(jwt.verify(token));
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    })

    const logout = () => {
        localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
        setUser(null);
    }

    const check = () => {
        const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
        const user = jwt.verify(token);
        if (!user) {
            localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
            setUser(null);
        }
    }

    return {
        user,
        token: localStorage.getItem(JWT_LOCAL_STORAGE_KEY),
        login,
        logout,
        check
    };
}

const AuthenticationContext = createContext();

export const Authentication = ({ children, ...props }) => {
    const auth = useAuthProvider();

    return (
        <AuthenticationContext.Provider value={auth}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuth = () => useContext(AuthenticationContext);
