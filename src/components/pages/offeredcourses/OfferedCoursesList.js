import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import { Button } from '@mui/material';


const renderEnrolledButton = (params) => {
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={(e) => {
                  e.preventDefault();
                 window.location.href=`http://localhost:5000/offeredcourses/enrolled/students/${params?.row?.id}`;
              }}
          >
              Students
          </Button>
      </strong>
  )
}

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
    },
    {
      field: 'creditHours',
      headerName: 'Credit Hours',
      flex: 0.5,
      minWidth: 150
    },
    {
      field: 'NoOfStudents',
      headerName: 'No. of Enrolled Students',
      flex: 0.5,
      minWidth: 150
    },
    {
      field: 'Enrolled',
      headerName: 'Enrolled Students',
      flex: 0.5,
      minWidth: 150,
      renderCell: renderEnrolledButton,
    },
  ];

  
  export default function OfferedCoursesGrid() {
  
    const {apiData, loading, error} = useFetch('/offeredcourse/active')
    let rows = []
    
    if(apiData){
      rows = apiData.data.map((row)=>({
        id: row?._id,
        Name: row?.name,
        Session: row?.Session?.name,
        creditHours: row?.creditHours,
        NoOfStudents:row?.enrolledStudents.length,

      }))
    }
  
    return (
      <div>
        {(!loading && !error)&&(
        <Box sx={{ height:700}}>
          <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
        </Box>)}
        
        {loading && <Loading/>}
        {error && <h1>No Active Session Found</h1>}
      </div>
      
    );
  }
