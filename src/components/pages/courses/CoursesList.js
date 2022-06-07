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
        field: 'Department',
        headerName: 'Department',
        flex: 0.5,
        minWidth: 150,
    },
    {
      field: 'creditHours',
      headerName: 'Credit Hours',
      flex: 0.5,
      minWidth: 150,
  }
  ];


  export default function CoursesDataGrid() {
  



    const {apiData, loading, error} = useFetch('/courses')
    let rows = []
    
    if(apiData){
      
      rows = apiData.data.map((row)=>({
        id: row?._id,
        Name: row?.name,
        Department: row?.department?.name,
        creditHours: row?.creditHours
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