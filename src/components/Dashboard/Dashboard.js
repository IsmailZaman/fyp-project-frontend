import useAuth from "../../hooks/useAuth";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";



const Dashboard = () => {
    const {auth} = useAuth()

    if(auth?.roles.includes('admin')){
        return <AdminDashboard />
    }
    if(auth?.roles.includes('student')){
        return <StudentDashboard />
    }


    
    
}
 
export default Dashboard;