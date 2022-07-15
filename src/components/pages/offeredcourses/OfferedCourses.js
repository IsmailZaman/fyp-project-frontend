import Layout from "../../layout/Layout";
import OfferedCoursesGrid from "./OfferedCoursesList";
import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom"
import adminNavbarLinks from "../../layout/admin-navlinks";
import { DataContext } from "../../../context/DataContext";
import { useContext } from "react";
import { useEffect } from "react";
import SuccessSnackbar from "../../reusable-components/SuccessSnackbar";
import { useState } from "react";


const OfferedCourses = () => {
   const navigate = useNavigate()
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
        <Layout title="Offered Courses" navlinks={adminNavbarLinks}>
           <Button variant="outlined" onClick={ ()=> navigate('/addcourses')}>
               Add Courses
            </Button>
           <OfferedCoursesGrid/>
           {open && <SuccessSnackbar msg={msg} setOpen={setOpen} open={open}/>}
        </Layout>
     );
}
 
export default OfferedCourses;
