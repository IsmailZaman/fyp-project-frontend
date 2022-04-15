import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';



const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'Email',
    headerName: 'Email',
    width: 200
  },
  {
    field: 'rollNumber',
    headerName: 'Roll Number'
  }
];





export default function StudentDataGrid() {
  
  const {apiData, loading, error} = useFetch('/students')
  let rows = []
  
  if(apiData){
    
  
    
    rows = apiData.data.map((row)=>({
      id: row?._id,
      Name: row?.name,
      Email: row?.email,
      rollNumber: row.studentData?.rollNumber
    }))
  }
  

  return (
    //<div style={{ height: 1000, flexGrow: 1}}>
    <div>
      {!loading &&
      <Box sx={{ height:1000}}>
        <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
      </Box>}
      {loading && <Loading/>}
      {error && <h1>Failed to Fetch Data</h1>}
    </div>
    //</div>
  );
}