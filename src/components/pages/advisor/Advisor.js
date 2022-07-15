import Layout from "../../layout/Layout";
import adminNavbarLinks from "../../layout/admin-navlinks";
import AdvisorDataGrid from "./AdvisorList";
import AddAdvisorModal from "./AddAdvisorModal";
import SuccessSnackbar from "../../reusable-components/SuccessSnackbar";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../../context/DataContext";


const Advisor = () => {

   const {feedback, updateData, update } = useContext(DataContext)
   const [open, setOpen] = useState(false)
   const [msg, setMsg] = useState('')
   
   useEffect(()=>{
    if(feedback?.success){
       setMsg(feedback?.successMsg)
       setOpen(true)
       updateData('feedback', {success: false, successMsg: ''})
    }
    },[update])

    return ( <Layout title='Advisor Management' navlinks={adminNavbarLinks}>
        <AddAdvisorModal/>
        <AdvisorDataGrid/>
        {open && <SuccessSnackbar msg={msg} setOpen={setOpen} open={open}/>}
    </Layout> );
}
 
export default Advisor;
