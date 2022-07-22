import Layout from "../../layout/Layout";
import adminNavbarLinks from "../../layout/admin-navlinks"
import advisorNavbarLinks from "../../layout/advisor-navlinks";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import StudentsEnrolledTable from "./StudentsEnrolledTable";

const StudentsEnrolledPage =() =>
{
    
    const{id}=useParams()
    const{auth} = useAuth()
    //console.log(id)
    return ( <Layout navlinks={auth?.roles?.includes('admin') ? adminNavbarLinks : advisorNavbarLinks} title="Student Requests">
            <StudentsEnrolledTable courseId={id}/>
        </Layout> );
}

export default StudentsEnrolledPage;