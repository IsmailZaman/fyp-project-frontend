import AdminProfileCard from "./AdminProfileCard";
import Layout from "../../layout/Layout";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../reusable-components/Loading";
import adminNavbarLinks from "../../layout/admin-navlinks";
import studentNavbarLinks from "../../layout/student-navlinks"
import useAuth from "../../../hooks/useAuth";
import StudentProfileCard from "./StudentProfileCard";

const Profile = () => {

    const {apiData, error, loading} = useFetch('/users/me')
    const{auth}=useAuth()
    


    return ( 
        <>
        <Layout navlinks={auth?.roles?.includes('admin') ? adminNavbarLinks : studentNavbarLinks}>
            {loading && <Loading/>}
            {error && <div>Error In loading data.</div>}
            {apiData && (auth?.roles?.includes('admin') ? 
                <AdminProfileCard data={apiData.data} title="Your Profile" url="/users/changepassword"/> :
                <StudentProfileCard data={apiData.data} title="Your Profile" url="/users/changepassword"/>)}
        </Layout>
        </>
     );
}
 
export default Profile;