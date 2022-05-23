import Layout from "../layout/Layout"
import studentNavbarLinks from "../layout/student-navlinks"

const StudentDashboard = () => {
    return (
        <Layout title="Student Dashboard" navlinks={studentNavbarLinks}>
            <h1>Welcome to Student Dashboard</h1>
        </Layout>
        
    )
}

export default StudentDashboard