import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from "../hooks/useAuth";
import Loading from "./reusable-components/Loading";

const PersistLogin = ()=>{
    const [isLoading, setIsLoading] = useState(true)
    const refresh= useRefreshToken()
    const {auth} = useAuth()

    useEffect(()=>{
        let isMounted = true
        const verifyRefreshToken = async()=>{
            try{
                await refresh()
            }
            catch(e){
                localStorage.removeItem('isLoggedIn')
            }
            finally{
                isMounted && setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

        return ()=> isMounted = false
    },[])

    
    return <>
        {isLoading ? <Loading/> : <Outlet />}
    </>
}

export default PersistLogin