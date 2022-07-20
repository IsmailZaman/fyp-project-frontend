import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../reusable-components/Loading';



const data = {}


export default function StudentRequestProfileCard({studentId}) {
  const {apiData, loading, error} = useFetch(`/studentdata/${studentId}`)


  if(apiData?.data){
    data['email'] = apiData?.data?.rollNumber + '@itu.edu.pk'
    data['batch'] = apiData?.data?.batch
    data['department'] = apiData?.data?.department
    data['rollNumber'] = apiData?.data?.rollNumber
  }


  return (
    <>
    {error && 'Data not found'}
    {loading && <Loading />}
    {apiData?.data && <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <>
        <CardContent>
          <Typography variant="h5" component="div">
            Student Profile
          </Typography>
          <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>

                <TableRow
                  key={data?.rollNumber}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Roll Number
                  </TableCell>
                  <TableCell align="right">{data?.rollNumber}</TableCell>
                </TableRow>

                <TableRow
                  key={data?.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Email
                  </TableCell>
                  <TableCell align="right">{data?.email}</TableCell>
                </TableRow>

                <TableRow
                  key={data?.department}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Department
                  </TableCell>
                  <TableCell align="right">{data?.department}</TableCell>
                </TableRow>

                <TableRow
                  key={data?.batch}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Batch
                  </TableCell>
                  <TableCell align="right">{data?.batch}</TableCell>
                </TableRow>

                <TableRow
                  key={1}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    CGPA
                  </TableCell>
                  <TableCell align="right">{3.21}</TableCell>
                </TableRow>
              
            </TableBody>
          </Table>
        </TableContainer>
        </CardContent>
        {/* <CardActions>
          <Button size="small">View Profile</Button>
        </CardActions> */}
      </>
      </Card>
    </Box>}
    </>
  
  );
}
