import Layout from "../layout/Layout"
import studentNavbarLinks from "../layout/student-navlinks"
import * as React from 'react';
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






