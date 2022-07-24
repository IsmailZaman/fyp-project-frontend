import Layout from "../../layout/Layout";
import studentNavbarLinks from "../../layout/student-navlinks";
import SemesterTable from "./SemesterTable";
import {useParams} from "react-router-dom";


const SemesterPage = () => {
    //const{id}=useParams()

    return ( 
        <Layout navlinks={studentNavbarLinks} title = "Student Sessions">
            <SemesterTable/>
            </Layout>
     );
}
 
export default SemesterPage;