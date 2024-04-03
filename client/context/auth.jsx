import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    axios.defaults.headers.common["Authorization"] = auth.token


    useEffect(() => {
        const data = localStorage.getItem("auth")
        if(data) {
            const parseData = JSON.parse(data)
            setAuth(prevAuth => ({
                ... prevAuth,
                user: parseData.user,
                token: parseData.token,
            }))
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}