import styles from './login.module.css'
import { useState , useContext} from 'react';
import axios from '../../api/axios';
import ErrorMsg from '../reusable-components/errors/ErrorMsg'
import AuthContext from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const {setAuth} = useContext(AuthContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState('')
    const [success,setSuccess] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setPending(true)
        
        const body = {email,password}
        console.log(body)
        try{
            const loginUser = await axios.post('/users/login',body)
            console.log(loginUser)
            setPending(false)
            const accessToken = loginUser?.data?.accessToken
            const user = loginUser?.data?.user
            const roles = loginUser?.data?.user.roles

            setAuth({email,password, user,accessToken, roles})
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
            console.log(error)
        }


    }



    return ( 

        <div className="container">
            <div className={styles.logo}></div>
            <div className={styles.title}>TWITTER</div>
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
                    
                    <button type="submit">LOGIN</button>
                    {isPending && <p>Loading...</p>}
                    {success && <Link to="/dashboard"><p>Dashboard</p></Link>}
                </form>
            </div>
        </div>

     );
}
 
export default LoginPage;