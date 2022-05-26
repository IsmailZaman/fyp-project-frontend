import Layout from "../layout/Layout";
import { Typography } from "@mui/material";
import DashboardCard from "../reusable-components/DashboardCard";


const AdminDashboard = () => {
    
    
    
    return ( 
        <Layout>
           <div style={{display: "flex", overflow:"hidden", flexWrap:"wrap"}}>
            <DashboardCard word="Hello Faieqah"/>

            <DashboardCard word="Hello Faieqah"/>
            <DashboardCard word="Hello Faieqah"/>
            <DashboardCard word="Hello Faieqah"/>
            <DashboardCard word="Hello Faieqah"/>
            <DashboardCard word="Hello Faieqah"/>
            <DashboardCard word="Hello Faieqah"/>
            <DashboardCard word="Hello Faieqah"/>

           </div>
          
        </Layout>
       
        
     );
}

export default AdminDashboard