import Layout from "../../../layout/Layout";
import advisorNavbarLinks from "../../../layout/advisor-navlinks";
import { useParams } from "react-router-dom";
import RequestTable from "./RequestTable";


const RequestPage = () => {
    const{id} = useParams()
    
    return ( <Layout navlinks={advisorNavbarLinks} title="Student Requests">
            <RequestTable requestId={id}/>
        </Layout> );
}
 
export default RequestPage;
