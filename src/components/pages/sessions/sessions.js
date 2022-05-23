import Layout from "../../layout/Layout";
import useFetch from "../../../hooks/useFetch";
import Box from '@mui/material/Box';
import Loading from "../../reusable-components/Loading";
import ActiveSession from "./ActiveSession";
import InactiveSession from "./InactiveSession";
import SessionDataGrid from "./SessionList";
import { Stack } from "@mui/material";
import adminNavbarLinks from "../../layout/admin-navlinks";

const Sessions = () => {

    
    const {apiData,loading} = useFetch('/session/active')


  
    

    return ( 
        <Layout title="Sessions" navlinks={adminNavbarLinks}>
            <Stack spacing={4}>
                <Box sx={{height: apiData ? "65%" : "30%", border: "1px solid rgba(0, 0, 0, 0.12)",borderRadius: "12px"}}>
                    
                        {loading && <Loading/>}
                        {apiData && <ActiveSession sessionData={apiData.data}/>}
                        {!apiData && (!loading &&
                            <InactiveSession/>)
                        }
                
                
                </Box>
                <SessionDataGrid/>
            </Stack>
        </Layout>
        );
}
 
export default Sessions;