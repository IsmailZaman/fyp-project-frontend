import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import { useEffect, useState } from 'react';
import AddPrereqModal from './AddPrereqModal';


const renderPrereqButton = (params, handleOpen,setCourseData) => {
  
  
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={(e) => {
                handleOpen();
                setCourseData(params.row)
              }}
          >
              view/edit pre-requisites
          </Button>
      </strong>
  )
}






  export default function CoursesDataGrid() {
  



    const {apiData, loading, error, setRefresh} = useFetch('/courses')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [courseData, setCourseData] = useState(null)
    const [change, setChange] = useState(false)

    useEffect(()=>{
      setCourseData(null)
      setRefresh({change})
    },[change,setRefresh])

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'Name',
        headerName: 'Name',
        flex: 0.5,
        minWidth: 150,
      },
      {
          field: 'Department',
          headerName: 'Department',
          flex: 0.5,
          minWidth: 150,
      },
      {
        field: 'creditHours',
        headerName: 'Credit Hours',
        flex: 0.5,
        minWidth: 150,
      },
      {
        field: 'addprereq',
        headerName: 'add prereqs',
        width: 150,
        renderCell: (params)=>renderPrereqButton(params, handleOpen,setCourseData),
        flex:0.5
      }
  
    ];
    let rows = []
    
    if(apiData){
      
      rows = apiData.data.map((row)=>({
        id: row?._id,
        Name: row?.name,
        Department: row?.department?.name,
        creditHours: row?.creditHours,
        prereq: row?.prereqs
      }))
    }
    
  
    return (
      
      <div>
        {!loading &&
        <Box sx={{ height:1000}}>
          <AddPrereqModal open={open} setOpen={setOpen} course={courseData} change={{change,setChange}}/>
          <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
        </Box>}
        {loading && <Loading/>}
        {error && <h1>Failed to Fetch Data</h1>}
      </div>
      
    );
  }
