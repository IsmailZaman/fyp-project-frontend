import Layout from "../../layout/Layout";
import CoursesDataGrid from "./CoursesList";
import { useState } from "react";
import { useForm } from "react-hook-form";
import createCourseFields from "./createCourseFields";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CourseForm from "./CreateCourseForm";


const Courses = () => {

    const [success,setSuccess] = useState(false)
    const [msg, setMsg] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm();


    return ( 
        <Layout title="Course Management">

        <CourseForm
            register={register} 
            handleSubmit={handleSubmit} 
            errors={errors} 
            url='/courses' 
            fields={createCourseFields}
            setSuccess={setSuccess}
            setMsg={setMsg}
            />
            
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




            <CoursesDataGrid/>



        </Layout>
        );
}
 
export default Courses;