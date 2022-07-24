import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useAxiosprivate from '../../../../hooks/useAxiosPrivate';
import { DialogContent } from '@mui/material';
import Loading from '../../../reusable-components/Loading';


export default function ApproveRequestModal({data, request}) {
  const [open, setOpen] = useState(false);
  const [totalCreditHours, setCreditHours] = useState(0);
  const [submitError,setSubmitError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPending, setPending] = useState(false)

  const axiosPrivate = useAxiosprivate()
  const handleClickOpen = () => {
    let temp = 0
    setCreditHours(0)

    data?.forEach((course) => {
      if(course.status === "Enrolled" || course.status === "Approved"){
        temp += course.creditHours
      }
    })
    setCreditHours(temp)

    for(let i=0; i<request.courses.length; i++){
      request.courses[i].status = data[i].status
    }
    setOpen(true);
  };

  const handleClose = () => {
    if(success !== ''){
      window.location.reload()
      setSuccess('')
      setSubmitError('')
      setOpen(false);
    }
      setSuccess('')
      setSubmitError('')
      setOpen(false);
    
  };

  const onSubmit = async() =>{
    try{
      setPending(true)
      setSubmitError('')
      setSuccess('')
      console.log(request)

      const enrolledStudent = await axiosPrivate.post('/semester/enroll', request)
      if(!enrolledStudent) throw new Error('Unable to enroll student.')

      if(enrolledStudent){
        setSuccess(enrolledStudent.data)
      }
    }catch(e){
      setSubmitError(e?.response?.data)
    }finally{
      setPending(false)
    }
  }

  return (
    <div style={{width: '45%'}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you approve this request?
        </DialogTitle>

        <DialogContent>
          The student will take {totalCreditHours} credit hours this semester.
        </DialogContent>
        <DialogActions>
          
          {isPending && <Loading />}
          {!isPending &&(
          <>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit} autoFocus>
            Approve
          </Button>
          </>)
          }
        </DialogActions>
        {success !== '' && <DialogContent>
          {success}
        </DialogContent>}

        {submitError !== '' && <DialogContent>
          {submitError}
        </DialogContent>}


      </Dialog>
    </div>
  );
}
