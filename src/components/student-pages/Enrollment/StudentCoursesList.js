import { DataGrid } from '@mui/x-data-grid';
import { useState} from 'react';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import EnrollmentTable from './EnrollmentTable';
import { GridToolbar } from '@mui/x-data-grid';
import PrereqModal from './PrereqModal';




const preReqsCompleted = (prereqs, transcript,courseid) =>{
  let completed = true
  let preReqData = []

  for(let i =0;i<prereqs.length; i++){
    let match = false
    for(let j =0; j<transcript.length; j++){
      if(transcript[j].course === courseid){
        console.log('hello')
        preReqData.push(transcript[j])
      }
      if(prereqs[i] === transcript[j].course){
        match = true
        preReqData.push(transcript[j])
        if(transcript[j].grade === "F" || transcript[j].grade === "NA"){
          completed = false
        }
      }
    }
    if(match === false) completed = false
  }
  return {completed, preReqData}
}



const StudentCoursesList = () =>{

  const[row, setRow] = useState({});
  const renderPrereqButton = (params, handleOpen, handleClose, open) => {
  
  
    return (
      <>
        <strong>
            <Button
                href="#text-buttons"
                sx={{ margin: 'auto', height: '100%', color: params.row.completed ? '#65a17c' : 'red' }}
                onClick={()=> {
                  setRow(params.row)
                  handleOpen()
                }}
            >
                pre-requisite Info
            </Button>
          </strong>
  
          <PrereqModal handleClose={handleClose} open={open} params={row} />
        </>
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
      renderCell: (params)=>renderPrereqButton(params, handleOpen, handleClose, open),
      flex:0.5
    }

  ];

  const axiosPrivate = useAxiosprivate()
  const navigate = useNavigate()
  const {updateData}= useContext(DataContext)
  const [submitError,setError] = useState('')
  const [isPending, setPending] = useState(false)
  const[creditHours, setCreditHours] = useState(0)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const {apiData, loading, error} = useFetch('/offeredcourse/enrollment')
  let rows = []
  let transcript = []
  
  if(apiData){
    console.log(apiData)
    transcript = apiData?.data?.transcript
    rows = apiData?.data?.filteredCourses.map((row)=>({
      id: row?._id,
      Name: row?.name,
      Department: row?.department,
      creditHours: row?.creditHours,
      prereq: row?.prereqs,
      completed: preReqsCompleted(row.prereqs, transcript,row._id, row?.dataId)?.completed,
      userPrereqHistory: preReqsCompleted(row.prereqs, transcript, row?.dataId)?.preReqData
    }))

  }
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const courseSelection = (selectedCoursesArray) => {
    let rowMap = {};

    // store all row element in object
    for (let i = 0; i < rows.length; i++) {
      rowMap[rows[i].id] = rows[i];
    }

    let selectedCourseArray =[];
    let hours = 0
    selectedCoursesArray.forEach(elementID => {
      if(rowMap[elementID]?.completed) {
        selectedCourseArray.push(rowMap[elementID]);
        hours = hours + rowMap[elementID]?.creditHours
      }
    });
    setSelectedCourses(selectedCourseArray);
    setCreditHours(hours)
  }

  const onSubmit = async() =>{
    
    setError('')
    try{
      setPending(true)



      const arrayOfIds = selectedCourses.map((course)=>{
        return {'course': course.id}
      })
      
     
      const addedResource = await axiosPrivate.post('/requests/create',{courses: arrayOfIds, creditHours})
      if(!addedResource){
        throw new Error('Unable to add resources')
      }
      if(addedResource){
        updateData('feedback', {success: true, successMsg: 'New enrollment request created.'})
      }

      setSelectedCourses([])
      setPending(false)
      return navigate("/", { replace: true });
    }catch(e){
      setError(e?.response?.data)
    }finally{
      setPending(false)
    }
  }
 
  return (

    <div>
        {!loading &&
        <Box sx={{ height:500}}>
          <DataGrid
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          courseSelection(newSelectionModel);
          setSelectionModel(newSelectionModel);
          
        }}
        components={{
          Toolbar: GridToolbar,
        }}
        selectionModel={selectionModel}
        columns={columns} rows={rows}
      />
        </Box>}
        {loading && <Loading/>}
        {error && <h1>Failed to Fetch Data</h1>}
        {selectedCourses.length !== 0 &&
        <div style={{display:'flex'}}>
          <Alert icon={false} severity="success" sx={{marginTop: 5}}>
            <Typography variant='h5'>Courses Selected: {selectedCourses.length} </Typography>
            <Typography variant='h5'>Total Credit Hours: {creditHours} </Typography>
            
            
            {submitError !== ''&& <div>{submitError}</div>}
            <EnrollmentTable data={selectedCourses}/>
            {!isPending && <Button onClick={onSubmit} endIcon={<SendIcon/>}>Submit</Button>}
            {isPending && <Loading />}
          </Alert>
         
        </div>
        }
      </div>
  );

}

export default StudentCoursesList

