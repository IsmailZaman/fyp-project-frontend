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




const AdminDashboard = () => {
    
   const {apiData: studentData, loading: loadingStudentData, error: studentError} = useFetch('/students')

   const {apiData: courseData, loading: loadingCourseData, error: courseError} = useFetch('/courses')

   const {apiData: activeSessionData, loading: loadingActiveSessionData, error: activeSessionError} = useFetch('/session/active')

   const {apiData: enrollmentRequestData, loading: loadingEnrollmentRequestData, error: enrollmentRequestError} = useFetch('/requests/unresolved')

   
    return ( 
      <div style={{ backgroundImage: `url(${background})`, backgroundSize:'cover',width: '95%',
      height: '800px', }}>

        <Layout  navlinks={adminNavbarLinks}>
         
           <div style={{display: "flex", overflow:"hidden", flexWrap:"wrap"}}>
            {/* <DashboardCard word="Hello Faieqah"/> */}
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
            <div style={{maxWidth: '600px',minHeight:'380px', minWidth: '600px', maxHeight:'400px'}}> 
            <BarChart />
            </div>


            <div style={{maxWidth: '600px',minHeight:'380px', minWidth: '600px', maxHeight:'400px', marginLeft:'30px'}}> 
            <PieChart/>
            </div>

           </div>
           
        </Layout>
        </div>
      

        
     );
}

export default AdminDashboard
