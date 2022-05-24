import Layout from "../layout/Layout"
import studentNavbarLinks from "../layout/student-navlinks"
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EnrollmentCard from "../EnrollmentCard";



const StudentDashboard = () => {
    return (
        <Layout title="Student Dashboard" navlinks={studentNavbarLinks}>
            <h1>Welcome to Student Dashboard</h1>
        <EnrollmentCard/>
        </Layout>         
    )
}

export default StudentDashboard






