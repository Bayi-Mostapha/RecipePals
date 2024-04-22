import { createContext, useEffect, useState } from "react";

export const authContext = createContext({
    user: {},
    setUser: () => { },
    logout: () => { },
})

export function AuthWrapper({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const logout = async () => {
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