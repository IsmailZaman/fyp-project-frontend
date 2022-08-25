import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import useFetch from '../../../hooks/useFetch';
import { FormControl, Select, Card, Button,IconButton } from '@mui/material';
import useAxiosprivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../reusable-components/Loading';
import ErrorMsg from '../../reusable-components/feedback/ErrorMsg';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../context/DataContext';
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddPrereqModal({open, setOpen, course, change}) {
    
    const axiosPrivate = useAxiosprivate()
    const [reset, setReset] = useState(false)
    const {apiData, setRefresh } = useFetch('/courses')
    const [selectedCourses, setSelectedCourses] = useState([])
    const [selected, setSelected] = useState('')

    const [submitError, setSubmitError] = useState('')
    const [pending, setPending] = useState(false)
    const[success,setSuccess] = useState('')

    const {updateData, update}= useContext(DataContext)

    const onSubmit = async() => {
        const data = selectedCourses.map(record=>record.id)
        setSubmitError('')
        setSuccess('')
        setSubmitError('')
        try{
            setPending(true)
            const addedPrereqs = await axiosPrivate.post(`/courses/addprereq/${course.id}`, data)
            setPending(false)
            if(addedPrereqs){
                setSuccess(addedPrereqs.data)
                updateData('feedback', {success: true, successMsg: `${addedPrereqs.data}`})
                updateData('update', !update)
                change.setChange(!change.change)
                handleClose()
            }
        }catch(e){
            setSubmitError(e?.response?.data)
        }finally{
            setPending(false)
        }
    }



    const handleClose = ()=> {
        setOpen(false)
        setReset(!reset)
        setRefresh(reset)
        setSelectedCourses([])
        setSelected('')
    }
    const handleChange = (event) =>{
        setSelected(event.target.value)
    }

    const handleClick = ({name,id}) =>{
        const alreadyExists = selectedCourses.find((course)=> course.id === id)
    
        if(!alreadyExists && name !== course.name){
            setSelectedCourses([...selectedCourses, {name,id}])
        }
    }

    const handleRemove = (id) =>{
      const removedArray = selectedCourses.filter((record)=> record.id !== id)
      setSelectedCourses(removedArray)
    }

    useEffect(()=>{
      const existingCourses = course?.prereq?.map((record)=>{
        return {
          id: record._id,
          name: record.name
        }
      })
      if(existingCourses?.length > 0){
        setSelectedCourses(existingCourses)
      }
    },[course,change.change])



  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {course && `Add pre requisites for ${course.Name}`}
          </Typography>

          {selectedCourses.length > 0 && 
            selectedCourses.map((selectedCourse)=> {
              return (
                <div style={{display: 'flex'}} key={selectedCourse.id}>
                <Card key={selectedCourse.id} variant="outlined" sx={{marginBottom: '20px', backgroundColor: '#e6ebe7', flex: '1', lineHeight: 2.5}}>{selectedCourse.name}
                </Card>
                <IconButton sx={{flex: '0'}} onClick={()=>handleRemove(selectedCourse.id)}> 
                  <CloseIcon/>
                </IconButton>
              </div>
              )
            })
          }
          
        {apiData && <>
            <FormControl sx={{flex: '1', marginRight: '10px'}}>
          
                <Select
                    labelId="demo-simple-select-label"
                    id="dept"
                    value={selected}
                    onChange={handleChange}
                    sx={{minWidth:'200px', marginBottom: '20px'}}

                >
                    {
                        apiData.data.map((data)=>{
                            if(data?._id !== course?.id)
                            {
                                return (
                                    <MenuItem key={data.name} value={data.name} onClick={()=>handleClick({name: data.name, id: data._id})}>
                                        {data.name}
                            
                                    </MenuItem>
                                )
                            }    
                        })
                    }
                </Select>
            </FormControl>
             <Box sx={{display: 'flex'}}>
                    {pending && <Loading/>}
                    {!pending && (
                      <>
                        <Button onClick={handleClose}>Close</Button>
                        <Button type='submit' onClick={onSubmit}>Update</Button>
                      </>
                      )}
                  
                  {submitError !== '' && <ErrorMsg msg={submitError}/>}
            </Box> 
         </>
        }
        </Box>
      </Modal>
    </div>
  );
}
//value prop important
