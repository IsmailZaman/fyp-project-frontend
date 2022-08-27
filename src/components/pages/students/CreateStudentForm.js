import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../reusable-components/Loading';
import ErrorMsg from '../../reusable-components/feedback/ErrorMsg';
import { Container } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import MenuItem from '@mui/material/MenuItem';


const text = "To Create Students in a range enter, the initial, final and prefix values. For example, if prefix is bscs, initial is 18001 and final is 18010, then students from 18001 to 18010 will be created."

export default function StudentForm(props) {
  
    const {register, handleSubmit, setSuccess, url, fields, setMsg} = props
    const axiosPrivate = useAxiosprivate()
    const [open, setOpen] = useState(false)
    const [error,setError] = useState('')
    const [isPending, setPending] = useState(false)
    const [department, setDepartment] = useState('Computer Science')
    const [batch,setBatch] = useState('bscs18')
    //Fetching dropdowns
    const {apiData} = useFetch('/departments')
    const {apiData: batches} =useFetch('/batch')
    


    
    const handleChange = (e) => {
        setDepartment(e.target.value)
    }

    const handleChangeBatch = (e) => {
        setBatch(e.target.value)
    }

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
            Add New Students
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Students</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                <DialogContentText>
                    {text}
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

                    <TextField
                    id="batch"
                    select
                    fullWidth
                    variant='standard'
                    label='Batch'
                    value={batch}
                    {...register("batch")}
                    onChange={handleChangeBatch}
                    >
                        {batches?.data?.map((batch)=>(

                            <MenuItem key={batch.name} value={batch.name}>
                            {batch.name}
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
