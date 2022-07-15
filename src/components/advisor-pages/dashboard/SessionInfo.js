import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const SessionInfo = (props) => {
    const {sessionData} = props

    function createData(field, value) {
        return { field, value };
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
        </>
    );
}
 
export default SessionInfo;
