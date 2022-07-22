import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';


const columns = [
    { field: 'rollNumber', headerName: 'Roll Number', flex: 0.5 },
    { field: 'department', headerName: 'Department', flex: 0.5 },
    { field: 'batch', headerName: 'Batch', flex: 0.2 },
    
  ];



const StudentsEnrolledTable = ({courseId}) => {
    const {apiData, loading} = useFetch(`/offeredcourse/enrolled/students/${courseId}`)

    let rows =[]

  if(apiData){
    rows = apiData?.data?.map((row)=>(
        {
            id: row?._id,
            rollNumber: row?.rollNumber,
            department: row?.department,
            batch: row?.batch,
        }
    ))
    console.log(rows)
    }
    return ( <div>
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
    </div> );
}
 
export default StudentsEnrolledTable;