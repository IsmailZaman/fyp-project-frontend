import Layout from "../../layout/Layout"
import { useParams } from "react-router-dom";
import OldCoursesTable from "./OldCoursesTable";
import studentNavbarLinks from "../../layout/student-navlinks";


const OldCoursesPage = () => {
    const{id}=useParams()
    console.log(id)

    return (  
        <Layout navlinks={studentNavbarLinks} title = "Session Courses">
        <div> <OldCoursesTable sessionId={id}/> </div>
        </Layout>
    );
}
 
export default OldCoursesPage;

//Hello from the Old Courses Pages :D
//<OldCoursesTable sessionId={id}/>