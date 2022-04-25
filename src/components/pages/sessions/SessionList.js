import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';





const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name',
    width: 250,
  },
  {
    field: 'academicYear',
    headerName: 'Academic Year',
    width: 200
  },
  {
    field: 'enrollmentPeriod',
    headerName: 'Enrollment Period',
    width: 200
  }
];





export default function SessionDataGrid() {
  



  const {apiData, loading, error} = useFetch('/session/all')
  let rows = []
  
  if(apiData){
    rows = apiData.data.map((row)=>({
      id: row?._id,
      Name: row?.name,
      enrollmentPeriod: row?.enrollmentPeriod,
      academicYear: row?.academicYear
    }))
  }
  

  return (
    
    <div>
      {!loading &&
      <Box sx={{ height:800}}>
        <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
      </Box>}
      {loading && <Loading/>}
      {error && <h1>Failed to Fetch Data</h1>}
    </div>
    
  );
}