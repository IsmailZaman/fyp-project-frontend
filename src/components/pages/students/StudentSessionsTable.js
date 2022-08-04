import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import { Button } from '@mui/material';



const renderCoursesTakenButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href=`http://localhost:5000/students/enrollhistory/courses/${params?.row?.id}/${params?.row?.userId}`;
                }}
            >
                Courses
            </Button>
        </strong>
    )
  }

const columns = [
    { field: 'id', headerName: 'Session ID', flex: 0.5 },
    { field: 'name', headerName: 'Session Name', flex: 0.5 },
    { field: 'academicYear', headerName: 'Academic Year', flex: 0.5 },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    {
        field: 'courses',
        headerName: 'Courses Taken',
        flex: 0.5,
        minWidth: 150,
        renderCell: renderCoursesTakenButton,
      },
];


const StudentSessionsTable = ({userId}) => {

    const {apiData, loading} = useFetch(`/students/enrollhistory/sessions/${userId}`)
    let rows =[]
    if(apiData){
        rows = apiData?.data?.map((row)=>(
            {
                id: row?.id,
                name: row?.name,
                academicYear: row?.academicYear,
                status: row?.status,
                userId: userId
            }
        ))
    }

    
    return ( 
    <div>
        <Container sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column',md: 'column', lg: 'row', xl: 'row'}}}>
        {loading && <Loading/>}
        {(!loading && !apiData) && <div>404 No data found. </div>}
        {apiData?.data &&( 
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                sx={{marginRight: {lg: 10, xl: 10}}}
            />
        </div>
    
        )}
    </Container>
   </div>
     );
}
 
export default StudentSessionsTable;