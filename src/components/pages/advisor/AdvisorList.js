import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import { Button } from '@mui/material';
import AssignBatchModal from './AssignBatchModel';
import { DataContext } from '../../../context/DataContext';
import { useContext, useEffect, useState } from 'react';


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

const renderAssignButton = (params) => {

    return (
        <strong>
            <AssignBatchModal row={params}/>
        </strong>
    )
}


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
                  window.location.href=`http://localhost:5000/advisors/requests/${params?.row?.advisorData?._id}`;
              }}
          >
              Requests
          </Button>
      </strong>
  )
}

const columns = [
  // { field: 'id', headerName: 'ID', width: 90, flex:0.2 },
  {
    field: 'Name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'Email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'Assign Batch',
    width: 200,
    renderCell: renderAssignButton
  },
  {
    field: 'Profile',
    width: 150,
    renderCell: renderProfileButton,
  },

  {
    field: 'Enrollment Requests',
    width: 200,
    renderCell: renderRequestButton,
  }
];


export default function AdvisorDataGrid() {


  const {apiData, loading, error, setRefresh} = useFetch('/advisor')

  const [added,setAdded] = useState(false)
  
  const {feedback, updateData, update } = useContext(DataContext)
  
    useEffect(()=>{
      if(feedback?.success){
         setAdded(!added)
         updateData('feedback', {success: false, successMsg: ''})
         setRefresh({})
      }
   },[update])



  let rows = []
  
  if(apiData){
    rows = apiData.data.map((row)=>({
      id: row?._id,
      Name: row?.name,
      Email: row?.email,
      advisorData: row?.advisorData
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
