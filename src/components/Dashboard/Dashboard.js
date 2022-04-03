import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";




const Dashboard = () => {
    const refresh = useRefreshToken()
    const axiosPrivate = useAxiosprivate()
    const logout = useLogout()
    
    const signOut = async()=>{
        await logout()
        console.log("Logged Out")
    }


    const getProfile = async()=>{
        const response = await axiosPrivate.get('/users/me')
        console.log(response)
    }


    
    return ( 
        <div>
            <h1>Welcome to the Dashboard, you have logged in.</h1>
            <button onClick={()=>refresh()}>Refresh</button>
            <button onClick={()=>getProfile()}>Profile </button>
            <button onClick={()=>signOut()}>Logout </button>
        </div>
     );
}
 
export default Dashboard;