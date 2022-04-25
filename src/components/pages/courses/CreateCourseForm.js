import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../reusable-components/Loading';
import ErrorMsg from '../../reusable-components/feedback/ErrorMsg';
import { Container } from '@mui/material';
import MenuItem from '@mui/material/MenuItem'







export default function CourseForm(props) {
  
    const {register, handleSubmit, setSuccess, url, fields, setMsg} = props
    const axiosPrivate = useAxiosprivate()
    const [open, setOpen] = useState(false)
    const [error,setError] = useState('')
    const [isPending, setPending] = useState(false)

    const {apiData} = useFetch('/departments')
    const [department, setDepartment] = useState('Computer Science')
    

    const handleChange = (e) => {
        setDepartment(e.target.value)
    }


    const handleClickOpen = () => {
        setOpen(true);
    };
   
    const handleClose = () => {
        setError('')
        setOpen(false);
    };




    const onSubmit = async(data) => {
        console.log(data);
        setError('')
        try{
            setPending(true)
            const addedResource = await axiosPrivate.post(url, data)
            setPending(false)
            setMsg(addedResource.data)
            setOpen(false)
            setSuccess(true)
        }catch(e){
            console.log(e)
            setError(e?.response?.data)
        }finally{
            setPending(false)
        }
        


    }


    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen} sx={{marginBottom: '20px'}}>
            Add New Course
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Course</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                <DialogContentText>
                    To add a new Course, please fill the fields below
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


                <TextField
                    id="dept"
                    select
                    fullWidth
                    variant='standard'
                    label='Department'
                    value={department}
                    {...register("dept")}
                    onChange={handleChange}
                    >
                        {apiData?.data?.map((dept)=>(

                            <MenuItem key={dept.name} value={dept.name}>
                            {dept.name}
                            </MenuItem>
                        ))}
                    </TextField>






                
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