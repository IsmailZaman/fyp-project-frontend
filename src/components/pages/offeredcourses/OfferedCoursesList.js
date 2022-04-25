import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';



const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: 'Session',
      headerName: 'Session',
      flex: 0.5,
      minWidth: 150
    }
  ];


  export default function OfferedCoursesGrid() {
  



    const {apiData, loading, error} = useFetch('/offeredcourse')
    let rows = []
    
    if(apiData){
      
      rows = apiData.data.map((row)=>({
        id: row?._id,
        Name: row?.name,
        Session: row?.Session
      }))
    }
    
  
    return (
      
      <div>
        {!loading &&
        <Box sx={{ height:1000}}>
          <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
        </Box>}
        {loading && <Loading/>}
        {error && <h1>Failed to Fetch Data</h1>}
      </div>
      
    );
  }