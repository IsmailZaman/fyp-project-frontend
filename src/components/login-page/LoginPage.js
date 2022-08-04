import styles from './login.module.css'
import { useState , useContext} from 'react';
import { axiosPrivate } from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import Arfa from './Arfa.mp4';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../reusable-components/Loading';
import ErrorMsg from '../reusable-components/feedback/ErrorMsg';


const LoginPage = () => {
    const {setAuth} = useContext(AuthContext)
    const location = useLocation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState('')
    const [success,setSuccess] = useState(false)

    const handleSubmit = async (e)=>{
        setError('')
        e.preventDefault()
        setPending(true)
        
        const body = {email,password}
        try{
            
            const loginUser = await axiosPrivate.post('/users/login',body)
            setPending(false)
            const accessToken = loginUser?.data?.accessToken
            const user = loginUser?.data?.user
            const roles = loginUser?.data?.user.roles

            setAuth({email,password, user,accessToken, roles})
            localStorage.setItem('isLoggedIn', true)
            setSuccess(true)
            
        }catch(e){
            setPending(false)
            if(!e?.response){
                setError('Server not responding')
            }
            else if(e.response?.status === 400){
                setError('Wrong username or password')
            }
            else if(e.response?.status === 401){
                setError('Unauthorized')
            }
            else{
                setError('Login Failed')
            }
        }


    }



    return ( !localStorage.getItem('isLoggedIn') ?
        <div className="container">
            <video autoPlay loop muted id = 'video'>
                <source src = {Arfa} type = 'video/mp4'/>
            </video>
            <div className={styles.logo}></div>
            {/* <div className={styles.title}>WELCOME</div> */}
            <div className={styles.inputs}>
                <form onSubmit={handleSubmit}>
                    <label>EMAIL</label>
                    <input type="email" placeholder="example@itu.edu.pk"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                    <label>PASSWORD</label>
                    <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    required
                    />
                    {!isPending && <button type="submit">LOGIN</button>}
                    {isPending && <Loading />}
                    {success && <Navigate to ="/dashboard" state={{from: location}} replace/>}
                    {error !== '' && <ErrorMsg msg={error}/> }
                    
                </form>
            </div>
        </div> : <Navigate to ="/dashboard" state={{from: location}} replace/>

     );
}
 
export default LoginPage;