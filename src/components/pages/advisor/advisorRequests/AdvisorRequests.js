import Layout from "../../../layout/Layout";
import adminNavbarLinks from "../../../layout/admin-navlinks";
import { useParams } from "react-router-dom";
import StudentRequestsGrid from "../../../advisor-pages/enrollment/StudentRequestsList";

const AdvisorRequests = () => {
    const {advisorId} = useParams()
    return ( <>
        <Layout navlinks={adminNavbarLinks} >

        {<StudentRequestsGrid url={'/advisor/student/requests/'+advisorId} />}

        

        
        </Layout>
    </> );
}
 
export default AdvisorRequests;