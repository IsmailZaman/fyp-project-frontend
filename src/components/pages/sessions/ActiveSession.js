import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useAxiosprivate from "../../../hooks/useAxiosPrivate";
import ErrorMsg from "../../reusable-components/feedback/ErrorMsg";
import Loading from "../../reusable-components/Loading";



  
  




const ActiveSession = (props) => {
    const {sessionData} = props
    const [open, setOpen] = useState(false)
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState('')
    const axiosPrivate = useAxiosprivate()
    

    function createData(field, value) {
        return { field, value };
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () =>{
        setError('')
        setOpen(false);
    }

    const handleSubmit = async() => {
      try{
        setPending(true)
        await axiosPrivate.patch(`/session/finish/${sessionData.name}`)
        setPending(false)
        setOpen(false)
        setError('')
        window.location.reload()
      }catch(e){
        if(!e?.response){
          setError('Server not responding')
        }else{
          setError(e?.response?.data)
        }
        
      }finally{
        setPending(false)
      }
        
    }


    const rows = []
    if(sessionData){
        rows.push(createData("Session", sessionData.name))
        rows.push(createData("Academic Year", sessionData.academicYear))
        const date = sessionData.enrollmentPeriod.split('T')[0]
        rows.push(createData("Enrollment Deadline", date))
        rows.push(createData("Number of courses offered", sessionData.coursesOffered.length))
        rows.push(createData("Status", sessionData.status? "active" : "inactive"))
    }

    return (
        <>
        
        <Container sx={{borderRadius:"10px 10px 0 0",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
        }}>
            
               <Typography sx={{color: "gray", marginBottom: "10px"}} variant="h5"> {`In Progress: Session ${sessionData.name}`}</Typography>
               
        </Container>

        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 230 }} aria-label="simple table">
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.value}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.field}
                        </TableCell>
                        <TableCell align="center">{row.value}</TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
        </TableContainer>

        <Button variant="outlined" onClick={handleClickOpen} sx={{marginBottom: "20px"}}>
                    Finish the Session
        </Button>

        <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to end {sessionData.name} session ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!isPending && (<>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Finish</Button>
            </>
          )}
          {isPending && <Loading/>}
          
        </DialogActions>

          {error !== '' && 
          <Container>
             <ErrorMsg msg={error}/>
          </Container> 
          
          }
          
      </Dialog>
        
        </>
    );
}
 
export default ActiveSession;