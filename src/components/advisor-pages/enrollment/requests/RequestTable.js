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
import useAuth from '../../../../hooks/useAuth';
import { useState } from 'react';
import StudentPrereqModal from './StudentPrereqModal'

const renderRejectButton = (params) => {
  
    return (
        <strong>
            <IconButton
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={()=>{
                    if(params.row.status === 'Pending' || params.row.status ==='Rejected'){
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
                onClick={()=>{
                    if(params.row.status === 'Pending' || params.row.status === 'Approved'){
                    params.row.status = 'Rejected'
                    }
                
                }}
            >
             <ClearOutlinedIcon />
            </IconButton>
        </strong>
    )
  }




export default function RequestTable({requestId}) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const[row, setRow] = useState({});
    const renderPrereqButton = (params, handleOpen, handleClose, open) => {
  
  
        return (
          <>
            <strong>
                <Box onClick={()=> {
                  setRow(params.row)
                  handleOpen()
                }}
>
                    {params?.row?.name}
                </Box>
              </strong>

              <StudentPrereqModal handleClose={handleClose} open={open} params={row} />
            </>
        )
      }
    
    
    const columns = [
      { field: 'name',
       headerName: 'Course name', 
       flex: 1,
       renderCell: (params)=>renderPrereqButton(params,handleOpen, handleClose, open)
      },
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
    
    const {apiData, loading} = useFetch(`/requests/${requestId}`)
    console.log(apiData)
    const{auth} = useAuth()

    let rows =[]

    if(apiData){
        console.log('apidata', apiData)
        rows = apiData?.data?.courses?.map((row)=>(
            {
                id: row?.course?._id,
                name: row?.course?.name,
                creditHours: row?.course?.creditHours,
                department: row?.course?.data?.department?.name,
                status: row?.status,
                prereq: row?.course?.data?.prereqs,
                student: apiData?.data?.student
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
            {auth?.roles?.includes('advisor') &&
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <ApproveRequestModal data={rows} request={apiData.data}/>
                <RejectRequestModal studentId={apiData?.data?.student}/>
            </Box>
            }
        </Box>
        
        </>
        )
        }
        {!loading && (!apiData?.data && <div> 404 request not found</div>)}
    </Container>
    </>

  );
}
