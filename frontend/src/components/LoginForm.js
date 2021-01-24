import { useAuth } from '../utils/Auth.js';
import { useState } from 'react';

export const LoginForm = () => {
    const auth = useAuth();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        auth
            .login({login, password})
            .catch(error => setError(error.message))
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Login:
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                </label>
                <label>
                    Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <input type="submit" value="Sign In" />
                <p>{error}</p>
            </form>
        </div>
    )
}
