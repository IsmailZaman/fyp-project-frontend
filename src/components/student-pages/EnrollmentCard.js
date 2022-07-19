import * as React from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useFetch from '../../hooks/useFetch';
import Loading from '../reusable-components/Loading';
import { useNavigate } from 'react-router-dom';




const EnrollmentCard = () => {
    const navigate = useNavigate()
    const {loading,apiData, error} = useFetch('/session/active')
    

    

    return ( 
        <Box variant="outlined" sx={{ height: "100%", width: "75%", border: "2px solid rgba(0, 0, 0, 0.10)", borderRadius: "12px" }}>
            {loading && <Loading/>}
            {error && <div>Error...</div>}
            {apiData &&
            <React.Fragment>
                <CardContent>
                    <Typography align="left" sx={{ fontSize: 30, mb: 2 }} color="text.secondary" gutterBottom>
                        {`Enrollment ${apiData?.data?.name?.toUpperCase()}`}
                    </Typography>
                    <Typography sx={{ mb: 0 }} color="text.secondary" align="left">
                        Open now
                    </Typography>
                    <Typography variant="body2" align="left" sx={{ mb: 8 }}>
                        {`Click on the buttom below to enroll in courses for ${apiData?.data?.name}`}
                    </Typography>
                    <Typography variant="body2" align="left">
                        {`Deadline - ${new Date(apiData?.data?.enrollmentPeriod)?.toDateString()}`}
                        <br />
                        {`Time: ${new Date(apiData?.data?.enrollmentPeriod).toLocaleTimeString('en',
                        { timeStyle: 'short', hour12: true, timeZone: 'UTC' })}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={()=>navigate('/enrollmentform')} variant="contained" sx={{ width: "25%", height: "5vh", borderRadius: "12px" }}>ENROLL</Button>
                </CardActions>
            </React.Fragment>
            }
            {
                ((!apiData && !error) && !loading) && <div>No active session in progress.</div>
            }
        </Box>

     );
}
 
export default EnrollmentCard;



