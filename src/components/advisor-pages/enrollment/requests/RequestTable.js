import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../reusable-components/Loading';
import StudentRequestProfileCard from './StudentRequestProfileCard';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import ApproveRequestModal from './ApproveRequestModal';
import RejectRequestModal from './RejectRequestModal';
import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useState } from 'react';
const renderRejectButton = (params) => {
  
    return (
        <strong>
            <IconButton
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={()=>{
                    if(params.row.status !== 'Approved'){
                        params.row.status = 'Approved'
                    }
                    
                    
                }}
            >
                <TaskAltIcon/>
            </IconButton>
        </strong>
    )
  }


const renderAcceptButton = (params) => {
  
    return (
        <strong>
            <IconButton
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={()=>params.row.status = 'Rejected'}
            >
             <ClearOutlinedIcon />
            </IconButton>
        </strong>
    )
  }



const columns = [
  { field: 'name', headerName: 'Course name', flex: 1 },
  { field: 'department', headerName: 'Department', flex: 0.5 },
  { field: 'creditHours', headerName: 'Credit hours', flex: 0.5 },
  { field: 'status', headerName: 'Status', flex: 0.5 },
  {
    field: 'reject',
    flex: 0.5,
    renderCell: renderAcceptButton,
  },

  {
    field: 'accept',
    flex: 0.5,
    renderCell: renderRejectButton,
  }
  
];




export default function RequestTable({requestId}) {
    
    const {apiData, loading} = useFetch(`/requests/${requestId}`)

    let rows =[]

    if(apiData){
        rows = apiData?.data?.courses?.map((row)=>(
            {
                id: row?.course?._id,
                name: row?.course?.name,
                creditHours: row?.course?.creditHours,
                department: row?.course?.data?.department?.name,
                status: row?.status,
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
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                sx={{marginRight: {lg: 10, xl: 10}}}
            />
            {apiData?.data?.creditHours && <h5 style={{position: 'relative'}}>Total Credit Hours Selected: {apiData?.data?.creditHours}</h5>}
        </div>
        <Box>
            <StudentRequestProfileCard studentId={apiData?.data?.student} />
            {/* {<h5 style={{marginBottom: '16px', marginTop: '16px'}}>{totalCreditHours !== 0 && `Total credit hours approved: ${totalCreditHours}`}</h5>} */}
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <ApproveRequestModal rows={rows}/>
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
