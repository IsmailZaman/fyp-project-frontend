import {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RejectRequestModal() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{width: '45%'}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Message
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your message to student below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="reason"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
