import ProfileCard from "./ProfileCard";
import Layout from "../../layout/Layout";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../reusable-components/Loading";
import adminNavbarLinks from "../../layout/admin-navlinks";

const Profile = () => {

    const {apiData, error, loading} = useFetch('/users/me')
    


    return ( 
        <>
        <Layout navlinks={adminNavbarLinks}>
            {loading && <Loading/>}
            {error && <div>Error In loading data.</div>}
            {apiData && <ProfileCard data={apiData.data} title="Your Profile" url="/users/changepassword"/>}
        </Layout>
        </>
     );
}
 
export default Profile;