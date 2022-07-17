import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from "../../../hooks/useFetch";


export default function AdvisorInfo({advisorData}) {

    const {apiData} = useFetch('/requests/number')
    function createData(field, value) {
        return { field, value };
    }

    const rows = []
    if(advisorData && apiData){
        
        const batches = advisorData?.batch?.map((record)=>record?.name)
        console.log(advisorData.batch)

        rows.push(createData("Your batches", batches?.length > 0 ? batches?.toString() : 'No batch assigned yet.'))
        rows.push(createData("Requests pending",  apiData?.data?.pending))
        rows.push(createData("Requests resolved",  apiData?.data?.closed))
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
            
               <Typography sx={{color: "gray", marginBottom: "10px"}} variant="h5"> {`Advisor Information`}</Typography>
               
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
