import Layout from "../../layout/Layout";
import studentNavbarLinks from "../../layout/student-navlinks";
import SemesterTable from "./SemesterTable";



const SemesterPage = () => {
    

    return ( 
        <Layout navlinks={studentNavbarLinks} title = "Student Sessions">
            <SemesterTable/>
            </Layout>
     );
}
 
export default SemesterPage;
