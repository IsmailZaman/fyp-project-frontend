import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useAxiosprivate from '../../../../hooks/useAxiosPrivate';

export default function ApproveRequestModal({data}) {
  const [open, setOpen] = useState(false);
  const [submitError,setSubmitError] = useState('')
  const [isPending, setPending] = useState(false)

  const axiosPrivate = useAxiosprivate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async() =>{





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
          {console.log(data)}
          
          
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
