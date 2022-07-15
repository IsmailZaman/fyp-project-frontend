import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState,useContext } from 'react';
import Loading from '../../reusable-components/Loading';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import { TextField,Container, DialogActions } from '@mui/material';
import ErrorMsg from '../../reusable-components/feedback/ErrorMsg';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../../context/DataContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function AddAdvisorModal({row}) {
    const axiosPrivate = useAxiosprivate()
    const [open,setOpen] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [pending, setPending] = useState(false)
    const[success,setSuccess] = useState('')
    const { register, handleSubmit} = useForm();
    const {updateData, update}= useContext(DataContext)
    

    
 

    

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false)
      setPending(false)
      setSubmitError('')
      if(success !== ''){
          setSuccess('')
      }
      setSuccess('')
    }


    const onSubmit = async(data) => {
        setSubmitError('')
        setSuccess('')
        setSubmitError('')
        try{
            setPending(true)
            const addedAdvisor = await axiosPrivate.post(`/users/advisor`, data)
            setPending(false)
            if(addedAdvisor){
                setSuccess(addedAdvisor.data)
                updateData('feedback', {success: true, successMsg: `${addedAdvisor.data}`})
                updateData('update', !update)
                handleClose()
            }
        }catch(e){
            setSubmitError(e?.response?.data)
        }finally{
            setPending(false)
        }
    }
    


    
  
    return (
      <div>
        <Button variant='outlined' sx={{marginBottom: '20px'}} onClick={handleOpen}>Add New Advisor</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>
         
          
            <Container>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{m: 2}}>
                Add new advisor
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                    id="name"
                    fullWidth
                    variant='standard'
                    label='Name'
                    type='text'
                    {...register("name")}
                />

                <TextField
                    id="email"
                    fullWidth
                    variant='standard'
                    label='Email'
                    type='email'
                    {...register("email")}

                />

                <TextField
                    id="password"
                    fullWidth
                    variant='standard'
                    label='Password'
                    type='text'
                    {...register("password")}
                />
                  <DialogActions sx={{m:2}}>
                    {pending && <Loading/>}
                    {!pending && (
                      <>
                        <Button onClick={handleClose}>Close</Button>
                        <Button type='submit'>Add</Button>
                      </>
                      )}
                  </DialogActions>
                  {submitError !== '' && <ErrorMsg msg={submitError}/>}
                  {success !== '' && <div>{success}</div>}
              </form>
              
              </Container>
            
              
              
          </Box>
        </Modal>
      </div>
    );
  }
