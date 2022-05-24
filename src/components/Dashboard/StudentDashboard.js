import Layout from "../layout/Layout"
import studentNavbarLinks from "../layout/student-navlinks"
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const StudentDashboard = () => {
    return (
        <Layout title="Student Dashboard" navlinks={studentNavbarLinks}>
            <h1>Welcome to Student Dashboard</h1>
            <Box variant="outlined" sx={{height:"100%" ,width: "75%", border: "2px solid rgba(0, 0, 0, 0.10)",borderRadius: "12px"}}>
            <React.Fragment>
            <CardContent>
                <Typography align="left" sx={{ fontSize: 30, mb: 2}} color="text.secondary" gutterBottom>
                    Enrollment Spring 2022
                </Typography>
                <Typography sx={{ mb: 0 }} color="text.secondary" align="left">
                    Open now
                </Typography>
                <Typography variant="body2" align="left"sx={{mb:8}}>
                    Click on the buttom below to enroll in courses for spring 2022
                </Typography>
                <Typography variant = "body2" align="left">
                     Deadline - 30/5/2022
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant = "contained" sx={{width: "25%",height: "5vh", borderRadius: "12px"}}>ENROLL</Button>
            </CardActions>
            </React.Fragment>
            </Box>
            <Typography sx={{mb: 2.0}}>
                                 
            </Typography>
            <Box variant="outlined" sx={{height:"100%" ,width: "75%", border: "2px solid rgba(0, 0, 0, 0.10)",borderRadius: "12px"}}>
            <React.Fragment>
            <CardContent>
                <Typography align="left" sx={{ fontSize: 30, mb: 2}} color="text.secondary" gutterBottom>
                    Enrollment Spring 2022
                </Typography>
                <Typography sx={{ mb: 0 }} color="text.secondary" align="left">
                    Open now
                </Typography>
                <Typography variant="body2" align="left"sx={{mb:8}}>
                    Click on the buttom below to enroll in courses for spring 2022
                </Typography>
                <Typography variant = "body2" align="left">
                     Deadline - 30/5/2022
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant = "contained" sx={{width: "25%",height: "5vh", borderRadius: "12px"}}>ENROLL</Button>
            </CardActions>
            </React.Fragment>
            </Box>
            
        </Layout>         
    )
}

export default StudentDashboard






