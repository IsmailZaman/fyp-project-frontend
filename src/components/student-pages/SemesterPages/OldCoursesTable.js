import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../reusable-components/Loading";


const columns = [
    { field: 'id', headerName: 'Course ID', flex: 0.5 },
    { field: 'name', headerName: 'Course Name', flex: 0.5 },
    { field: 'creditHours', headerName: 'Credit Hours', flex: 0.5 },
];

const OldCoursesTable = ({sessionId}) => {
    const {apiData, loading} = useFetch(`/students/sessions/enrolledcourses/${sessionId}`)

    let rows =[]

    if(apiData){
        rows = apiData?.data?.map((row)=>(
            {
                id: row?._id,
                name: row?.name,
                creditHours: row?.creditHours,
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
 
export default OldCoursesTable;