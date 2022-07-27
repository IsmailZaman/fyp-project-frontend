import Layout from '../../layout/Layout';
import {useParams} from "react-router-dom";
import adminNavbarLinks from '../../layout/admin-navlinks';
import StudentCoursesTable from './StudentCoursesTable';

const StudentCoursesPage = () => {
    const {sessionid, userid} = useParams()

    // console.log(params)

       return (  <Layout navlinks={adminNavbarLinks} title = "Student Courses">
       <div> <StudentCoursesTable sID={sessionid} uID={userid} /></div>
       </Layout>
       );
}
 
export default StudentCoursesPage;
