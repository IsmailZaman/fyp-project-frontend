import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import Button from '@mui/material/Button';

const renderRequestButton = (params) => {
  
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={(e) => {
                  e.preventDefault();
                  window.location.href=`http://localhost:5000/requests/${params?.id}`;
              }}
          >
              view request
          </Button>
      </strong>
  )
}






const columns = [
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'rollNumber',
    headerName: 'Roll Number',
    flex: 0.5,
  },
  { field: 'batch', headerName: 'Batch', width: 90, flex:0.5 },
  {field: 'department', headerName: 'Department', flex: 0.5},
  {
    field: 'profile link',
    flex: 1,
    renderCell: renderRequestButton,
  }

];





export default function StudentRequestsGrid() {

  const {apiData, loading, error} = useFetch('/advisor/student/requests')

  let rows = []
  
  if(apiData){
    console.log(apiData.data)
    rows = apiData.data.map((row)=>({
      id: row?.id,
      email: row?.email,
      rollNumber: row?.rollNumber,
      batch: row?.batch,
      department: row?.department
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
