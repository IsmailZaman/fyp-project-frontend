import Layout from "../../layout/Layout";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../reusable-components/Loading";
import adminNavbarLinks from "../../layout/admin-navlinks";
import StudentProfileCard from "./StudentProfileCard";
import { useParams } from "react-router-dom";

const StudentProfile = () => {
    const {id} =useParams()

    const {apiData, error, loading} = useFetch(`/users/students/${id}`)
    
    


    return ( 
        <>
        <Layout navlinks={adminNavbarLinks}>
            {loading && <Loading/>}
            {error && <div>Error In loading data.</div>}
            {apiData && <StudentProfileCard data={apiData.data} title={`${apiData?.data?.rollNumber ? apiData.data.rollNumber : apiData?.data?.name}'s Profile`} url="/users/changepassword"/>}
        </Layout>
        </>
     );
}
 
export default StudentProfile;
