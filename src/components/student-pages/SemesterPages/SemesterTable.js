import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import { Button } from '@mui/material';


const renderCoursesTakenButton = (params) => {
    console.log(params)
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={(e) => {
                    e.preventDefault();
                   //window.location.href=`http://localhost:5000/offeredcourses/enrolled/students/${params?.row?.id}`;
                    window.location.href=`http://localhost:5000/students/sessions/enrolledcourses/${params?.row?.id}`;

                }}
            >
                Students
            </Button>
        </strong>
    )
  }
const columns = [
    { field: 'name', headerName: 'Session', flex: 0.5 },
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

const SemesterTable = () => {
    const {apiData, loading} = useFetch(`/students/allsessions/`)

    let rows =[]

  if(apiData){
    console.log(apiData)
    rows = apiData?.data?.semesterList.map((row)=>(
        {
            id: row?.Session._id,
            name: row?.Session.name,
            status: row?.Session.status,
            academicYear: row?.Session.academicYear,
        }
    ))}


    return ( 
        <div>
             <Container sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column',md: 'column', lg: 'row', xl: 'row'}}}>
        {loading && <Loading />}
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

export default SemesterTable;