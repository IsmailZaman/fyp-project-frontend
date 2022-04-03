import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {setAuth} = useAuth()
    
    const refresh = async()=>{
        
        const response = await axiosPrivate.get('/refresh');
        
        setAuth(prev=>{
            return {...prev, 
                accessToken: response.data.accessToken,
                roles: response.data.roles
            }
        })

        return response.data.accessToken


    }
    return refresh;
}
 
export default useRefreshToken;