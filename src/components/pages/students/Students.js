import Layout from "../../layout/Layout";
import { Typography } from "@mui/material";
import StudentDataGrid from "./StudentList";
import FormDialog from "./AddStudent";
import { Divider } from "@mui/material";

const Students = () => {
    return ( <Layout title="Student Management">
            <FormDialog />
            
            <StudentDataGrid/>
        </Layout>
    )
}
 
export default Students;