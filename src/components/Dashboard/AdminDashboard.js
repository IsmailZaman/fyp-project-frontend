import Layout from "../layout/Layout";
import DashboardCard from "../reusable-components/DashboardCard";
import adminNavbarLinks from  "../layout/admin-navlinks";


const AdminDashboard = () => {
    
    
    
    return ( 
        <Layout  navlinks={adminNavbarLinks}>
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