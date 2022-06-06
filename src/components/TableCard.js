import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useFetch from '../hooks/useFetch';

function DataRet()
{
  const {apiData, loading, error} = useFetch('/requests')
  console.log(apiData, "heloooo", loading, error)
  if (apiData)
  {
    rows=apiData.data.map((d)=>{
      return createData(d.name,"status", d.creditHours)
    })
    
  }
}

let rows = [
  
  
  
];

function createData(name, status, temp) {
  return { name,status, temp};
  
}


export default function BasicTable() {
  
  DataRet()
  return (
    <TableContainer sx={{maxWidth: 1010, borderRadius:"12px"}} component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
        
          <TableRow>
            
            <TableCell>Course Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Credit Hours</TableCell>
            
            
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
              <TableCell align="right">{row.temp}</TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
