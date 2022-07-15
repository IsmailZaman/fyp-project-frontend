import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import useFetch from '../../../hooks/useFetch'
import Loading from '../../reusable-components/Loading';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import { TextField, MenuItem, Container, DialogActions } from '@mui/material';
import ErrorMsg from '../../reusable-components/feedback/ErrorMsg';


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


export default function AssignBatchModal({row}) {
    const axiosPrivate = useAxiosprivate()
    const [open,setOpen] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [pending, setPending] = useState(false)
    const[batch,setBatch] = useState('');
    const [success,setSuccess] = useState('')
    
 

    

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false)
      setPending(false)
      setSubmitError('')
      setSuccess('')
    }
    const handleChangeBatch = (e) => setBatch(e.target.value)


    const handleSubmit = async(e) => {
        e.preventDefault();
        setSubmitError('')
        setSuccess('')
        setSubmitError('')
        try{
            setPending(true)
            console.log(batch)
            const assignedBatch = await axiosPrivate.patch(`/advisor/assign/${row.id}`, {batch: batch})
            setPending(false)
            if(assignedBatch){
              setSuccess(assignedBatch.data)
            }
        }catch(e){
            setSubmitError(e?.response?.data)
        }finally{
            setPending(false)
        }
    }
    


    const {apiData, loading, error} = useFetch('/session/active')
    const {apiData: batchData} = useFetch('/batch')
  
    return (
      <div>
        <Button onClick={handleOpen}>Assign Batch</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>
          {loading && <Loading />}
          {apiData && batchData && (
            <Container>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{m: 2}}>
                Session {apiData?.data?.name}
              </Typography>
              <form onSubmit={handleSubmit}>
              <TextField
                    id="batch"
                    select
                    fullWidth
                    variant='standard'
                    label='Batch'
                    value={batch}
                    onChange={handleChangeBatch}
                    >
                        {batchData?.data?.map((batch)=>(
                            <MenuItem key={batch.name} value={batch.name}>
                            {batch.name}
                            </MenuItem>
                        ))}
                    </TextField>
                  <DialogActions sx={{m:2}}>
                    {pending && <Loading/>}
                    {!pending && (
                      <>
                        <Button onClick={handleClose}>Close</Button>
                        <Button type='submit'>Assign</Button>
                      </>
                      )}
                  </DialogActions>
                  {submitError !== '' && <ErrorMsg msg={submitError}/>}
                  {success !== '' && <div>{success}</div>}
              </form>
              
              </Container>
            
              
              
              
            )} 
          {(!loading && !apiData && !error) && <div>No Active Session in Progress</div>}
          </Box>
        </Modal>
      </div>
    );
  }
