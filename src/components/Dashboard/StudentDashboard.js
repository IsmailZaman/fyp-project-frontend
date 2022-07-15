import Layout from "../layout/Layout"
import studentNavbarLinks from "../layout/student-navlinks"
import EnrollmentCard from "../EnrollmentCard";
import TableCard from "../TableCard";
import { Typography } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import { useContext,useEffect, useState } from "react";
import SuccessSnackbar from "../reusable-components/SuccessSnackbar";


const StudentDashboard = () => {
    const {feedback, updateData } = useContext(DataContext)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(()=>{
        if(feedback?.success){
            setMsg(feedback?.successMsg)
            setOpen(true)
            updateData('feedback', {success: false, successMsg: ''})
         }
    },[])


    return (
        <Layout title="Student Dashboard" navlinks={studentNavbarLinks}>
            <h1>Welcome to Student Dashboard</h1>
            <EnrollmentCard/>
            <Typography sx={{mb: 2}}></Typography>
            <TableCard/>
            {open && <SuccessSnackbar msg={msg} setOpen={setOpen} open={open}/>}
        </Layout>         
    )
}

export default StudentDashboard






