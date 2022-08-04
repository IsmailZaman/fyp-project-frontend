import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../reusable-components/Loading';
import ErrorMsg from '../../reusable-components/feedback/ErrorMsg';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';





export default function ProfileForm(props) {
  
    const {register, handleSubmit, url, fields, title, btnTitle} = props
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
        setError('')
        try{
            setPending(true)
            const updatedResource = await axiosPrivate.patch(url, data)
            if(!updatedResource){
                 throw new Error("unable to update password")
            }
            setPending(false)
            setOpen(false)
            window.location.reload()
            
        }catch(e){

            if(e?.response?.data){
                setError('Unable to update.')
            }else{
                setError('Unable to update.')
            }
           
            
        }finally{
            setPending(false)
        }
        


    }


    return (
        <div>
        
        

        <Button startIcon={<EditIcon />} sx={{
                    ml: 4,
                    color: "black",
                    backgroundColor: ""
                }}
                 size="large"
                 onClick={handleClickOpen}>{btnTitle}</Button>
    
        
        
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
                        <Button type='submit'>Update</Button>
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