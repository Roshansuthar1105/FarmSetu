import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}= useAuthContext();
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", { email, password });
            const data= response.data;
            if(response.status!=201 || data.error){
                throw new Error(data.error || 'Error has occured');
            }
            localStorage.setItem('user', JSON.stringify(data));
            setAuthUser(data);
        } catch (err) {
            toast.error(err.message || "An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
};

export default useLogin;
