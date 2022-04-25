import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import useAxiosprivate from '../../hooks/useAxiosPrivate';
import Loading from './Loading'
import ErrorMsg from './feedback/ErrorMsg';
import { Container } from '@mui/material';





export default function Form(props) {
  
    const {register, handleSubmit, url, fields, title, btnTitle,btnStyle} = props
    const [open, setOpen] = useState(false)
    const [error,setError] = useState('')


    const [isPending, setPending] = useState(false)
    const axiosPrivate = useAxiosprivate()

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
            if(!addedResource){
                throw new Error("unable to add resource")
            }
            setPending(false)
            setOpen(false)
            window.location.reload()
            
        }catch(e){
            console.log(e)
            setError(e?.response?.data)
        }finally{
            setPending(false)
        }
        


    }


    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen} sx={btnStyle ? btnStyle : {marginBottom:"20px"}}>
            {btnTitle}
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                
                
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
                        {...register(field.id)}
                        
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