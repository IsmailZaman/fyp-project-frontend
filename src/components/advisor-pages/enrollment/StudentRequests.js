import Layout from "../../layout/Layout";
import advisorNavbarLinks from "../../layout/advisor-navlinks";
import AdvisorBatches from "./AdvisorBatches";


const StudentRequests = () => {
    return (<Layout navlinks={advisorNavbarLinks} title="Student Requests">
        <AdvisorBatches />
    </Layout> );
}
 
export default StudentRequests;
