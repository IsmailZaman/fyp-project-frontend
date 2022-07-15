import useAuth from "../../hooks/useAuth";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import AdvisorDashboard from "./AdvisorDashboard";



const Dashboard = () => {
    const {auth} = useAuth()

    if(auth?.roles.includes('admin')){
        return <AdminDashboard />
    }
    if(auth?.roles.includes('student')){
        return <StudentDashboard />
    }
    if(auth?.roles?.includes('advisor')){
        return <AdvisorDashboard />
    }

    
    
}
 
export default Dashboard;
