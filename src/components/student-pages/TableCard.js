import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from '../../hooks/useFetch';
import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Loading from '../reusable-components/Loading';


let rows = [];

function createData(name, status, creditHours, courseId) {
  
  return { name,status, creditHours, courseId};
  
}


export default function BasicTable() {

  const {apiData, loading} = useFetch('/requests')
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({})
  const [isPending, setPending] = useState(false)
  const [isError, setError] = useState('')
  const axiosPrivate = useAxiosPrivate()


  const handleClick = (row) => {
    setSelected({})
    setSelected(row)
    console.log(row)
    setOpen(true);
  }

  const handleClose = () => {
    setError('')
    setOpen(false)
  }

  const handleSubmit = async() => {
    try{
      setPending(true)
      if(selected === {}) throw new Error('No course selected.')
      await axiosPrivate.patch(`/requests/drop?req_id=${apiData.data._id}&course_id=${selected.courseId}`)
      window.location.reload()
    }catch(e){
      setError(e?.response?.data)
    }finally{
      setPending(false)
    }

  }




  if (apiData)
  {
    console.log(apiData)
    rows=apiData.data.courses.map((d)=>{
      return createData(d.course.name,d.status, d.course.creditHours, d._id)
    })
  }
  return (
    <>
    {loading && <Loading />}
    { apiData &&
      <TableContainer sx={{maxWidth: 1010, borderRadius:"12px"}} component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
          
            <TableRow>
              
              
              <TableCell>Course Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Credit Hours</TableCell>
              <TableCell align="right">Drop</TableCell>
              
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.creditHours}</TableCell>
                <TableCell align="right">
                  <IconButton tooltip="Description here" onClick={()=>handleClick(row)} sx={{maxWidth: '30px', maxHeight: '30px'}}>
                      <ClearOutlinedIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to drop ${selected?.name?.toUpperCase()} ?`}
        </DialogTitle>
        {isError && <div>{isError}</div>}
        {isPending && <Loading />}
        {!isPending && 
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
        }
      </Dialog>

    </>
  );
}
