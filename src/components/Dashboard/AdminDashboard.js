import Layout from "../layout/Layout";
import adminNavbarLinks from  "../layout/admin-navlinks";
import useFetch from '../../hooks/useFetch';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Loading from "../reusable-components/Loading";
import BookIcon from '@mui/icons-material/Book';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import background from "./SimpleShiny.png";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';




const AdminDashboard = () => {

   //NEed to be set by default. Otherwise will throw error
   const [department,setDepartment ]= useState('Computer Science');

   const [deptId, setDeptId] = useState('62403c677d4a47e233a408e9')

   const [number, setNumber] = useState(3)
    
   const {apiData: studentData, loading: loadingStudentData, error: studentError} = useFetch('/students')

   const {apiData: courseData, loading: loadingCourseData, error: courseError} = useFetch('/courses')

   const {apiData: activeSessionData, loading: loadingActiveSessionData, error: activeSessionError} = useFetch('/session/active')

   const {apiData: enrollmentRequestData, loading: loadingEnrollmentRequestData, error: enrollmentRequestError} = useFetch('/requests/unresolved')

   const {apiData: barChartData, loading: loadingBarChartData, setRefresh} = useFetch(`/offeredcourse/barchart/${deptId}`)
   

   const {apiData: deptData} = useFetch('/departments')

   useEffect(()=>{

      setRefresh(true)
      console.log(barChartData)

   },[deptId])

   

   //For selecting the number of courses to display. Max can be 6.

   const numberOfCourses = [1,2,3,4,5,6]



   const handleChange = (event) => {
      setDepartment(event.target.value);
   };

   const handleNumberChange = (event)=>{
      setNumber(event.target.value)
   }

   const handleClick = (deptId) =>{
      setDeptId(deptId)
   }
  
    return ( 
      <div style={{ backgroundImage: `url(${background})`, backgroundSize:'cover',width: '95%',
      height: '100vh', }}>

        <Layout  navlinks={adminNavbarLinks}>
         
           <div style={{display: "flex", overflow:"hidden", flexWrap:"wrap", justifyContent: 'space-around'}}>
               {/* TOTAL STUDENTS CARD */}
               <Card sx={{p:1, m:5 ,minWidth: 250,maxWidth:300,minHeight:200, display:'flex', flexDirection: 'column', backgroundColor:"#F5F5F5", boxShadow:10}}>
               <br/>
                  <PersonIcon sx={{fontSize:60, marginLeft: 5}}/>
               <div style={{marginLeft: '45px'}}>
               <Typography gutterBottom variant="h5" component="div" align="left">
                     Total Students:
                  </Typography>

                  <Typography gutterBottom variant="h4" component="div" align="left" >
                     {loadingStudentData && <Loading/>}
                     {studentData?.data && studentData.data?.length}
                     {studentError && <div>Student Error</div>}
                  </Typography>
                  </div>
               <CardActions >
               <Button size="large" 
                  onClick={(e) => {
                     e.preventDefault();
                     window.location.href=`http://localhost:5000/students/`;}}
               sx={{ color: 'white', backgroundColor: '#3F51B5', borderColor: 'blue' }}>See all students</Button>
               </CardActions>
            </Card>


            {/* TOTAL COURSES CARD */}

            <Card sx={{p:1, m:5 ,minWidth: 250,maxWidth:300,minHeight:200, display:'flex', flexDirection: 'column', backgroundColor:"#F5F5F5", boxShadow:10 }}>
               <br/>
               
                  <BookIcon sx={{fontSize:60, marginLeft: 5}}/>
               
               <div style={{marginLeft: '45px'}}>
               <Typography gutterBottom variant="h5" component="div" align="left">
                     Total Courses:
                  </Typography>

                  <Typography gutterBottom variant="h4" component="div" align="left" >
                     {loadingCourseData && <Loading/>}
                     {courseData?.data && courseData.data?.length}
                     {courseError && <div>Course Error</div>}
                  </Typography>
                  </div>
               <CardActions >
               <Button size="large"  
               onClick={(e) => {
                  e.preventDefault();
                  window.location.href=`http://localhost:5000/courses/`;}}
               sx={{ color: 'white', backgroundColor: '#3F51B5', borderColor: 'blue' }}>See all courses</Button>
               </CardActions>
            </Card>

            {/* ACTIVE SESSION CARD */}

            <Card sx={{p:1, m:5 ,minWidth: 250,maxWidth:300,minHeight:200, display:'flex', flexDirection: 'column', backgroundColor:"#F5F5F5", boxShadow:10 }}>
               <br/>
               
                  <EventAvailableIcon sx={{fontSize:60, marginLeft: 5}}/>
               
               <div style={{marginLeft: '45px'}}>
               <Typography gutterBottom variant="h5" component="div" align="left">
                     Active Session:
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div" align="left" >
                     {loadingActiveSessionData && <Loading/>}
                     {activeSessionData?.data && activeSessionData.data?.name}
                     {activeSessionError && <div>Active Session Error</div>}
                  </Typography>
                  </div>
               <CardActions >
               <Button size="large" 
               onClick={(e) => {
                  e.preventDefault();
                  window.location.href=`http://localhost:5000/sessions/`;}}
               sx={{ color: 'white', backgroundColor: '#3F51B5', borderColor: 'blue' ,marginTop:1}}>See active session</Button>
               </CardActions>
            </Card>
            {/* ENROLLMENT REQUEST CARD */}

            <Card sx={{p:1, m:5 ,minWidth: 250,maxWidth:300,minHeight:200, display:'flex', flexDirection: 'column', backgroundColor:"#F5F5F5", boxShadow:10 }}>
               <br/>
               
                  <AddToQueueIcon sx={{fontSize:60, marginLeft: 5}}/>
               
               <div style={{marginLeft: '45px'}}>
               <Typography gutterBottom variant="h5" component="div" align="left">
                     Pending:  
                  </Typography>

                  <Typography gutterBottom variant="h4" component="div" align="left" >
                     {loadingEnrollmentRequestData && <Loading/>}
                     {enrollmentRequestData?.data && enrollmentRequestData.data}
                     {enrollmentRequestError && <div>Enrollment Request Error</div>}
                  </Typography>
                  </div>
               <CardActions >
               <Button size="large"  sx={{ color: 'white', backgroundColor: '#3F51B5', borderColor: 'blue' }}>Enrollment requests</Button>
               </CardActions>
            </Card>


         <Container sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '20px'}}>

            {(loadingBarChartData && !barChartData) && <Loading />}
            {barChartData && 
            <div style={{maxWidth: '50%',minHeight:'30%', minWidth: '50%', maxHeight:'40%'}}> 
            
               
                  
                  <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                     
                        <FormControl sx={{flex: '1', marginRight: '10px'}}>
                           <InputLabel id="demo-simple-select-label" shrink={false}>{department === '' && <div>Department</div>}</InputLabel>
                           <Select
                              labelId="demo-simple-select-label"
                              id="dept"
                              value={department}
                              onChange={handleChange}

                           >
                              {deptData?.data?.map((dept)=>(
                              <MenuItem key={dept.name} value={dept.name} onClick={()=>handleClick(dept._id)}>
                              {dept.name}
                              </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                   
                     
                        <FormControl sx={{flex: '0.2', maxHeight: '56px'}}>
                           <InputLabel id="select-number" shrink={false}>{number === '' && <div>Top</div>}</InputLabel>
                           <Select
                              labelId="select-number"
                              id="number"
                              value={number}
                              onChange={handleNumberChange}
                           >
                              {numberOfCourses.map((number)=>(
                              <MenuItem key={number} value={number}>
                                 <MenuItem key={number} value={number}>
                                    {number}
                                 </MenuItem>
                              </MenuItem>
                              ))}
                  
                           </Select>
                        </FormControl>
                     
                  </Box>
               <BarChart data={barChartData} number={number} department={department}/>
            </div>}
            
            <div style={{maxWidth: '300px',minHeight:'15%', minWidth: '15%', maxHeight:'15%'}}> 
            <PieChart/>
            </div>
         </Container>

           </div>
           
        </Layout>
        </div>
      
     );
}

export default AdminDashboard
