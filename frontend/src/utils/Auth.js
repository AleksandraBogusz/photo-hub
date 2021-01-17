import { createContext, useContext, useState, useEffect } from 'react';

const useAuthProvider = () => {
    const [user, setUser] = useState(null);

    //TODO: call the authentication-service
    //keep the token in localStorage
    //keep the token's payload in the context
    const login = ({login, password}) => new Promise((resolve, reject) => {
        if (login === "login" && password === "password") {
            setUser("user");
            return resolve();
        }
        reject();
    })

    const logout = () => {
        console.log("logout");
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
