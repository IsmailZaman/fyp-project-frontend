import axios from "../api/axios";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useLogout = ()=>{
    const {setAuth} = useAuth()

    const logout = async()=>{
        localStorage.removeItem('isLoggedIn')
        setAuth({})
        try{
            const response = await axiosPrivate.post('/users/logout',{withCredentials: true})
        }catch(e){
            console.log(e)
        }
    }
    return logout
}

export default useLogout