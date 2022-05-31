import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import { useState,useEffect } from 'react';



const columns = [
  { field: 'id', headerName: 'ID', width: 90, flex:1 },
  {
    field: 'Name',
    headerName: 'Name',
    flex: 1,
  }
];





export default function BatchDataGrid({updated}) {

    const[refresh,setRefresh] = useState(updated)
    useEffect( () => {
        setRefresh(updated);
    }, [updated]); 
    
  const {apiData, loading, error} = useFetch('/batch')
  let rows = []
  
  if(apiData){
    
    rows = apiData.data.map((row)=>({
      id: row?._id,
      Name: row?.name,
    }))
  }
  

  return (
    
    <div>
      {!loading &&
      <Box sx={{ height:700}}>
        <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
      </Box>}
      {loading && <Loading/>}
      {error && <h1>Failed to Fetch Data</h1>}
    </div>
    
  );
}