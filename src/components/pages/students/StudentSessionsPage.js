import Layout from "../../layout/Layout";
import {useParams} from "react-router-dom";
import adminNavbarLinks from "../../layout/admin-navlinks"; 
import StudentSessionsTable from "./StudentSessionsTable";

const StudentSessionsPage = () => {
    const{id}=useParams()

    //try to add student's roll number in page heading???
    return (  <Layout navlinks={adminNavbarLinks} title = "Student Sessions">
    <div> <StudentSessionsTable userId={id} /></div>
    </Layout>
);
}
 
export default StudentSessionsPage;