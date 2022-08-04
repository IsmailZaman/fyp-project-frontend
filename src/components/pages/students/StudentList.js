import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import { Button } from '@mui/material';


const renderProfileButton = (params) => {
  
  
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={(e) => {
                  e.preventDefault();
                  window.location.href=`http://localhost:5000/profile/${params?.id}`;
              }}
          >
              Profile
          </Button>
      </strong>
  )
}


const renderEnrollmentDetailsButton = (params) => {
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={(e) => {
                  e.preventDefault();
                  window.location.href=`http://localhost:5000/students/enrollhistory/sessions/${params?.id}`;
              }}
          >
              Details
          </Button>
      </strong>
  )
}



const columns = [
  { field: 'id', headerName: 'ID', width: 90, flex:0.15},
  // { field: 'Name', headerName: 'Name', width: 150},

  {
    field: 'Email',
    headerName: 'Email',
    width: 200
  },
  {
    field: 'rollNumber',
    headerName: 'Roll Number'
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 150
  },
  {
    field: 'batch',
    headerName: 'Batch'
  },
  {
    field: 'Profile link',
    width: 150,
    renderCell: renderProfileButton,
    flex:0.1
  },
  {
    field: 'Enrollment Details',
    width: 150,
    renderCell: renderEnrollmentDetailsButton,
    flex:0.2
  }
];





export default function StudentDataGrid() {

  const {apiData, loading, error} = useFetch('/students')
  //const {apiData:enrollementData, loading:loadingEnrollment, error:enrollmentError}= useFetch()
  let rows = []
  
  if(apiData){
    
    rows = apiData.data.map((row)=>({
      id: row?._id,
      Name: row?.name,
      Email: row?.email,
      rollNumber: row.studentData?.rollNumber,
      department: row?.studentData?.department,
      batch: row?.studentData?.batch
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