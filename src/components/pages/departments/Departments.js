import Layout from "../../layout/Layout";
import DepartmentForm from "./CreateDeptForm";
import DepartmentDataGrid from "./DepartmentList";
import { useState } from "react";
import { useForm } from "react-hook-form";
import createDeptFields from "./createDeptFields";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


const Departments = () => {
    const [success,setSuccess] = useState(false)
    const [msg, setMsg] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm();

    return ( 
        <Layout title="Departments">
            <DepartmentForm
            register={register} 
            handleSubmit={handleSubmit} 
            errors={errors} 
            url='/departments' 
            fields={createDeptFields}
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

            <DepartmentDataGrid/>

        </Layout>
     );
}
 
export default Departments;