import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function EnrollmentTable({data}) {
    const [rows, setRows] = useState(data)

    useEffect(()=>{
        setRows(data)

    },[data])
    



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: {sm: 350, xs: 400, md: 600} }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right">Credit Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 && rows.map((row) => (
            <TableRow
              key={row.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.Department}</TableCell>
              <TableCell align="right">{row.creditHours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
