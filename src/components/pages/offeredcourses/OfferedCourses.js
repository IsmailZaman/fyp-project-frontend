import Layout from "../../layout/Layout";
import OfferedCoursesGrid from "./OfferedCoursesList";
import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom"
import adminNavbarLinks from "../../layout/admin-navlinks";


const OfferedCourses = () => {
   const navigate = useNavigate()
   


    return ( 
        <Layout title="Offered Courses" navlinks={adminNavbarLinks}>
           <Button variant="outlined" onClick={ ()=> navigate('/addcourses')}>
               Add Courses
            </Button>
           <OfferedCoursesGrid/>
        </Layout>
     );
}
 
export default OfferedCourses;