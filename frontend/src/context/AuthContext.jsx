import { createContext, useContext, useState } from "react";

export const AuthContext= createContext();

export const useAuthContext= ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider= ({children})=>{
    const [authUser, setAuthUser]= useState(JSON.parse(localStorage.getItem('user') )|| null);
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    return <AuthContext.Provider value={{authUser, setAuthUser, BACKEND_URL}}>
        {children}
    </AuthContext.Provider>
}