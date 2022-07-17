import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from '../hooks/useFetch';
import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

let rows = [];

function createData(name, status, temp) {
  return { name,status, temp};
  
}


export default function BasicTable() {

  const {apiData, loading, error} = useFetch('/requests')
  console.log(apiData, "heloooo", loading, error)
  if (apiData)
  {
    rows=apiData.data.courses.map((d)=>{
      if (d.pending)
      {
      return createData(d.course.name,"Pending", d.course.creditHours)
      }
      if (d.approved)
      {
      return createData(d.course.name,"Approved", d.course.creditHours)
      }
      if (d.enrolled)
      {
      return createData(d.course.name,"Enrolled", d.course.creditHours)
      }
    })
    
  }
  return (
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
        { apiData &&
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
              <TableCell align="right">{row.temp}</TableCell>
              <TableCell align="right">
                <IconButton tooltip="Description here" sx={{maxWidth: '30px', maxHeight: '30px'}}>
                    <ClearOutlinedIcon />
                </IconButton>
              </TableCell>
              
              
              
              
            </TableRow>
          ))}
        </TableBody>
        }
      </Table>
    </TableContainer>
  );
}
