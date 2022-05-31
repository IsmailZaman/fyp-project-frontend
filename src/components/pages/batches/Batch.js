import Layout from "../../layout/Layout"
import adminNavbarLinks from "../../layout/admin-navlinks"
import BatchDataGrid from "./BatchList"
import BatchForm from "./BatchForm"
import { useState,useContext,useEffect } from "react"
import { DataContext } from "../../../context/DataContext"
import SuccessSnackbar from "../../reusable-components/SuccessSnackbar"

const Batch = () => {
    const {feedback, updateData } = useContext(DataContext)

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [updated,setUpdated] = useState(false)


    useEffect(()=>{
      if(feedback?.success){
         setMsg(feedback?.successMsg)
         setOpen(true)
         updateData('feedback', {success: false, successMsg: ''})
      }
   },[updated])
    



    return ( <Layout title="Batch Management" navlinks={adminNavbarLinks}>
            <BatchForm update={{updated,setUpdated}}/>
            <BatchDataGrid updated={updated}/>
            {open && <SuccessSnackbar msg={msg} setOpen={setOpen} open={open}/>}
        </Layout>
    )
}
 
export default Batch