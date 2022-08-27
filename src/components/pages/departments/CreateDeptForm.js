import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { useState } from 'react';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../reusable-components/Loading';
import ErrorMsg from '../../reusable-components/feedback/ErrorMsg';
import { Container } from '@mui/material';





export default function DepartmentForm(props) {
  
    const {register, handleSubmit, setSuccess, url, fields, setMsg} = props
    const axiosPrivate = useAxiosprivate()
    const [open, setOpen] = useState(false)
    const [error,setError] = useState('')
    const [isPending, setPending] = useState(false)
    

    const handleClickOpen = () => {
        setOpen(true);
    };
   
    const handleClose = () => {
        setError('')
        setOpen(false);
    };




    const onSubmit = async(data) => {
        setError('')
        try{
            setPending(true)
            const addedResource = await axiosPrivate.post(url, data)
            setPending(false)
            setMsg(addedResource.data)
            setOpen(false)
            setSuccess(true)
            window.location.reload()
        }catch(e){
            setError(e?.response?.data)
        }finally{
            setPending(false)
        }
        


    }


    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen} sx={{marginBottom: '20px'}}>
            Add New Department
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Students</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                <DialogContentText>
                    To add a new department, please fill the fields below
                </DialogContentText>



                {fields.map((field)=>(
                
                    <TextField
                        key={field.id}
                        margin="dense"
                        id= {field.id}
                        label={field.label}
                        type={field.type}
                        fullWidth
                        variant='standard'
                        placeholder={field.placeholder}
                        {...register(field.id,{required: true})}
                        
                    /> 
                ))}

                
                </DialogContent>
            
                <DialogActions> 
                    {!isPending &&
                    <>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Add</Button>
                    </>
                    }  
                    {isPending && <Loading />}
                    
                </DialogActions>
                <Container>
                    {error !== '' && <ErrorMsg msg={error}/>}
                </Container>
            </form >
        </Dialog>
        </div>
    );
}
