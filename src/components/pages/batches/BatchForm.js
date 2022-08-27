import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState,useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../reusable-components/Loading';
import ErrorMsg from '../../reusable-components/feedback/ErrorMsg';
import { Container } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';



const text = "To Create Students in a range enter, the initial, final and prefix values. For example, if prefix is bscs, initial is 18001 and final is 18010, then students from 18001 to 18010 will be created."

export default function BatchForm({update}) {
  
    const {updated, setUpdated} = update
    const axiosPrivate = useAxiosprivate()
    const [open, setOpen] = useState(false)
    const [error,setError] = useState('')
    const [isPending, setPending] = useState(false)
    const [department, setDepartment] = useState('Computer Science')
    const { register, handleSubmit, formState: { errors: formError }} = useForm();

    const {updateData} = useContext(DataContext)

   
    

    //Fetching dropdowns
    const {apiData, loading, error: fetchError} = useFetch('/departments')
    
    const batchFields = [
        {
            id:"batch",
            label:"Batch",
            type:"text",
            placeholder: 'Example: bscs18'
        },
    ]


    
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
       
        setError('')
        try{
            setPending(true)
            const addedResource = await axiosPrivate.post('/batch', data)
            if(addedResource){
                updateData('feedback', {success: true, successMsg: `${addedResource.data}`})
              }
            
            setPending(false)
            setUpdated(!updated)
            setOpen(false)
            window.location.reload();
        }catch(e){
            setError(e?.response?.data)
        }finally{
            setPending(false)
        }
        


    }


    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen} sx={{marginBottom: '20px'}}>
            Add a New Batch
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a New Batch</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
                
                {batchFields.map((field)=>(
                
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
