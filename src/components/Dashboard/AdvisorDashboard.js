import Layout from "../layout/Layout";
import advisorNavbarLinks from "../layout/advisor-navlinks";
import SessionInfo from "../advisor-pages/dashboard/SessionInfo";
import AdvisorInfo from "../advisor-pages/dashboard/AdvisorInfo";
import useFetch from "../../hooks/useFetch";
import Loading from "../reusable-components/Loading";
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";

const AdvisorDashboard = () => {

    const {apiData,loading} = useFetch('/session/active')
    const {apiData: advisorSessionData, loading: loadingAdvisor} = useFetch('/advisor/sessiondata')

    return ( <Layout navlinks={advisorNavbarLinks}>
        <Stack spacing={4}>
            <Box sx={{height: apiData ? "65%" : "30%", border: "1px solid rgba(0, 0, 0, 0.12)",borderRadius: "12px"}}>
                        
                        {loading && <Loading/>}
                        {apiData && <SessionInfo sessionData={apiData.data}/>}
                        {!apiData && (!loading &&
                            <div>No active session found.</div>)
                        }
            </Box>


            <Box sx={{height: apiData ? "65%" : "30%", border: "1px solid rgba(0, 0, 0, 0.12)",borderRadius: "12px"}}>
                        
                        {loadingAdvisor && <Loading/>}
                        {advisorSessionData && <AdvisorInfo advisorData={advisorSessionData?.data} />}
                        {(!advisorSessionData && !loading) &&
                            <div>You have not been assigned any batch</div>
                        }
            </Box>

            


         </Stack>
    </Layout>);
}
 
export default AdvisorDashboard;
