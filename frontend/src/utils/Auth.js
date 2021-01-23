import { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'shared/jwt.js';

// TODO: read the following env vars from .env file
const AUTHENTICATION_SERVICE_URL = 'http://localhost:50000/authenticate';
const JWT_LOCAL_STORAGE_KEY = '_jwt_token';

const useAuthProvider = () => {
    const [user, setUser] = useState(jwt.verify(localStorage.getItem(JWT_LOCAL_STORAGE_KEY)));

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
                if (response.status === 500) { throw new Error("Something went wrong."); }
                if (response.status === 401) { throw new Error("Incorrect login or password."); }
                return response.json();
            })
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
        console.log("logout");
        localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
        setUser(null);
    }

    return {
        user,
        login,
        logout
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

export const useAuth = () => {
    /*useEffect(() => {
        if the token isn not valid anymore - logout
    });*/
    return useContext(AuthenticationContext);
}
