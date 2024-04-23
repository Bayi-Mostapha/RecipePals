import { createContext, useEffect, useState } from "react";

export const authContext = createContext({
    user: {},
    setUser: () => { },
    logout: () => { },
})

export function AuthWrapper({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = tokenData.exp * 1000;
            const currentTime = Date.now();
            if (currentTime > expirationTime) {
                logout()
            } else {
                setUser(JSON.parse(localStorage.getItem('user')))
            }
        }
    }, [])

    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        } catch (err) {
            console.error("error logging out: ", err);
        }
    };

    return <>
        <authContext.Provider value={{
            user, setUser,
            logout,
        }}>
            {children}
        </authContext.Provider>
    </>
}