import useRefreshToken from "../../hooks/useRefreshToken";



const Dashboard = () => {
    const refresh = useRefreshToken()
    
    return ( 
        <div>
            <h1>Welcome to the Dashboard, you have logged in.</h1>
            <button onClick={()=>refresh()}>Refresh</button>
        </div>
     );
}
 
export default Dashboard;