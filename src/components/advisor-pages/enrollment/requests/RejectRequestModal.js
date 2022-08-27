import {useState} from 'react'
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import useFetch from '../../../../hooks/useFetch';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from '../../../reusable-components/Loading';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RejectRequestModal({studentId}) {
  const [open, setOpen] = useState(false);
  const {apiData, loading} = useFetch(`/students/transcript/${studentId}`)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{width: '45%'}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Transcript
      </Button>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >   
          <Box sx={style}>
            {loading && <Loading />}
            {apiData?.data?.length > 0 && (
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: '400' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Course Name</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        <TableCell align="right">Session</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiData?.data?.length > 0 && apiData?.data?.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {row?.course?.name}
                            </TableCell>
                            <TableCell align="right">{row?.grade}</TableCell>
                            <TableCell align="right">{row?.session}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            )}
            {apiData?.data?.length === 0 && <h5>Transcript is empty.</h5>}
        </Box>
        </Modal>
    </div>
  );
}
