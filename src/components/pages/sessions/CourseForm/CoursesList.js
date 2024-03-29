import { DataGrid } from '@mui/x-data-grid';
import { useState} from 'react';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../reusable-components/Loading'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import useAxiosprivate from '../../../../hooks/useAxiosPrivate';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { DataContext } from '../../../../context/DataContext';
import { GridToolbar } from '@mui/x-data-grid';





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
    field: 'CreditHours',
    headerName: 'Credit Hours',
    flex: 0.5,
    minWidth: 150,
}
];

const CoursesList = () =>{

  const axiosPrivate = useAxiosprivate()
  const navigate = useNavigate()
  const {updateData}= useContext(DataContext)


  const [submitError,setError] = useState('')
  const [isPending, setPending] = useState(false)
  

  const {apiData, loading, error} = useFetch('/offeredcourse/addcoursepage')
  let rows = []
  
  if(apiData){
      
    rows = apiData.data.map((row)=>({
      id: row?._id,
      Name: row?.name,
      Department: row?.department,
      CreditHours: row?.creditHours,
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
    selectedCoursesArray.forEach(elementID => {
      if(rowMap[elementID]) {
        selectedCourseArray.push(rowMap[elementID]);
      }
    });
    setSelectedCourses(selectedCourseArray);
  }

  const onSubmit = async() =>{
    
    setError('')
    try{
      setPending(true)
      const arrayOfIds = selectedCourses.map((course)=>{
        return course.id
      })
      const addedResource = await axiosPrivate.post('/offeredcourse/add',{courses: arrayOfIds})
      if(!addedResource){
        throw new Error('Unable to add resources')
      }
      if(addedResource){
        updateData('feedback', {success: true, successMsg: `${addedResource.data}`})
      }

      setSelectedCourses([])
      setPending(false)
      return navigate("/offeredcourses", { replace: true });
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
        selectionModel={selectionModel}
        columns={columns} rows={rows}
        components={{
          Toolbar: GridToolbar,
        }}
      />
        </Box>}
        {loading && <Loading/>}
        {error && <h1>Failed to Fetch Data</h1>}
        {selectedCourses.length !== 0 &&
        <div style={{display:'flex'}}>
          <Alert icon={false} severity="success" sx={{marginTop: 5}}>
            <Typography variant='h5'>{selectedCourses.length} courses selected. </Typography>
            {isPending && <Loading />}
            {!isPending && <Button onClick={onSubmit} endIcon={<SendIcon/>}>Add</Button>}
            {submitError !== ''&& <div>{submitError}</div>}
          </Alert>
         
        </div>
        }
      </div>
  );

}

export default CoursesList

