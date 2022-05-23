import Layout from "../../layout/Layout";
import StudentDataGrid from "./StudentList";
import StudentForm from "./CreateStudentForm";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import createStudentFields from "./createStudentFields";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import adminNavbarLinks from "../../layout/admin-navlinks";

const Students = () => {
    
    const [success,setSuccess] = useState(false)
    const [msg, setMsg] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm();


    return ( <Layout title="Student Management" navlinks={adminNavbarLinks}>

            <StudentForm register={register} 
            handleSubmit={handleSubmit} 
            errors={errors} 
            url='/users/students' 
            fields={createStudentFields}
            setSuccess={setSuccess}
            setMsg={setMsg} />
            {success && <Alert
                action={
                <Button color="inherit" size="small" onClick={()=>{
                    setSuccess(false)
                    window.location.reload()
                }}>
                    Refresh
                </Button>
                }
            >
        {msg}
      </Alert>}
            <StudentDataGrid/>
            
            
        </Layout>
    )
}
 
export default Students;