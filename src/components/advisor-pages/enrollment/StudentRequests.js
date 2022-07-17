import Layout from "../../layout/Layout";
import advisorNavbarLinks from "../../layout/advisor-navlinks";
import StudentRequestsGrid from "./StudentRequestsList";



const StudentRequests = () => {
   

    return (<Layout navlinks={advisorNavbarLinks} title="Student Requests">
        <StudentRequestsGrid />
    </Layout> );
}
 
export default StudentRequests;
