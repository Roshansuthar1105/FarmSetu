import axios from "axios";
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout= ()=>{
    const [loading, setLoading]= useState(false);
    const {setAuthUser}= useAuthContext
    const logout= async ()=>{
        setLoading(false);
        try{
            const res= await axios.post('/api/auth/logout');
            const data= res.data;
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem('user');
            setAuthUser(null);
        }
        catch(err){
            toast.error(err.message);
        }
        finally{
            setLoading(false);
        }
    }
}
export default useLogout;