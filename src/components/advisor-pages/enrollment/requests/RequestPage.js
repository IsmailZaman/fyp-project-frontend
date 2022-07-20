import Layout from "../../../layout/Layout";
import adminNavbarLinks from "../../../layout/admin-navlinks"
import advisorNavbarLinks from "../../../layout/advisor-navlinks";
import { useParams } from "react-router-dom";
import RequestTable from "./RequestTable";
import useAuth from "../../../../hooks/useAuth";


const RequestPage = () => {
    const{id} = useParams()
    const{auth} = useAuth()
    
    return ( <Layout navlinks={auth?.roles?.includes('admin') ? adminNavbarLinks : advisorNavbarLinks} title="Student Requests">
            <RequestTable requestId={id}/>
        </Layout> );
}
 
export default RequestPage;
