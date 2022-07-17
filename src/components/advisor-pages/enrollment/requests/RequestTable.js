import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../reusable-components/Loading';
import StudentRequestProfileCard from './StudentRequestProfileCard';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import ApproveRequestModal from './ApproveRequestModal';
import RejectRequestModal from './RejectRequestModal';

const columns = [
  { field: 'name', headerName: 'Course name', flex: 1 },
  { field: 'department', headerName: 'Department', flex: 1 },
  { field: 'creditHours', headerName: 'Credit hours', flex: 1 },
];




export default function RequestTable({requestId}) {

    const {apiData, loading} = useFetch(`/requests/${requestId}`)
    let rows =[]

    if(apiData){
        console.log(apiData.data)
        rows = apiData?.data?.courses?.map((row)=>(
            {
                id: row?.course?._id,
                name: row?.course?.name,
                creditHours: row?.course?.creditHours,
                department: row?.course?.data?.department?.name
            }
        ))
    }
   

  return (
    <>
    <Container sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column',md: 'column', lg: 'row', xl: 'row'}}}>
        {loading && <Loading />}
        {(!loading && !apiData) && <div>404 No data found. </div>}
        {apiData?.data &&( 
        <>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                sx={{marginRight: {lg: 10, xl: 10}}}
            />
        </div>
        <Box>
            <StudentRequestProfileCard studentId={apiData?.data?.student} />
            {apiData?.data?.creditHours && <h5 style={{position: 'relative'}}>Total Credit Hours Selected: {apiData?.data?.creditHours}</h5>}
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <ApproveRequestModal />
                <RejectRequestModal />
            </Box>
        </Box>
        
        </>
        )
        }
        {!loading && (!apiData?.data && <div> 404 request not found</div>)}
    </Container>
    </>

  );
}
