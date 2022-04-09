import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";


const AdminDashboard = () => {
    
    const logout = useLogout()
    const refresh = useRefreshToken()
    const axiosPrivate = useAxiosprivate()

    const signOut = async()=>{
        await logout()
        console.log("Logged Out")
    }

    const profile = async() =>{
        const prof = await axiosPrivate.get('/users/me')
        console.log(prof)
    }
    
    return ( 
        <div>
            <h1>Welcome to the Dashboard, you have logged in.</h1>
            <button onClick={()=>refresh()}>Refresh</button>
            <button onClick={()=>profile()}>Profile</button>
            <button onClick={()=>signOut()}>Logout </button>
        </div>
     );
}

export default AdminDashboard