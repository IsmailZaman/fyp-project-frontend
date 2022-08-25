import Layout from "../../layout/Layout";
import CoursesDataGrid from "./CoursesList";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import createCourseFields from "./createCourseFields";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CourseForm from "./CreateCourseForm";
import adminNavbarLinks from "../../layout/admin-navlinks";
import { DataContext } from "../../../context/DataContext";
import SuccessSnackbar from "../../reusable-components/SuccessSnackbar";


const Courses = () => {

    const [success,setSuccess] = useState(false)
    const [msg, setMsg] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm();
    const {feedback, updateData, update } = useContext(DataContext)
    const [open, setOpen] = useState(false)
    const [preReqMsg, setPreReqMsg] = useState('')

    useEffect(()=>{
        if(feedback?.success){
           setPreReqMsg(feedback?.successMsg)
           setOpen(true)
           updateData('feedback', {success: false, successMsg: ''})
        }
        },[update])


    return ( 
        <Layout title="Course Management" navlinks={adminNavbarLinks}>

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
            {open && <SuccessSnackbar msg={preReqMsg} setOpen={setOpen} open={open}/>}


        </Layout>
        );
}
 
export default Courses;
