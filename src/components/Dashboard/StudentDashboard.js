import Layout from "../layout/Layout"
import studentNavbarLinks from "../layout/student-navlinks"
import * as React from 'react';
import EnrollmentCard from "../EnrollmentCard";
import TableCard from "../TableCard";
import { Typography } from "@mui/material";


const StudentDashboard = () => {
    return (
        <Layout title="Student Dashboard" navlinks={studentNavbarLinks}>
            <h1>Welcome to Student Dashboard</h1>
            <EnrollmentCard/>
            <Typography sx={{mb: 2}}></Typography>
            <TableCard/>
        </Layout>         
    )
}

export default StudentDashboard






