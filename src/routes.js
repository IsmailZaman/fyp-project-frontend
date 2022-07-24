import {Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/login-page/LoginPage';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Students from './components/pages/students/Students';
import Departments from './components/pages/departments/Departments';
import Courses from './components/pages/courses/Courses';
import Sessions from './components/pages/sessions/sessions';
import OfferedCourses from './components/pages/offeredcourses/OfferedCourses';
import Profile from './components/pages/profile/Profile';
import AddCoursesForm from './components/pages/sessions/CourseForm/AddCoursesForm';
import StudentProfile from './components/pages/profile/StudentProfile';
import DataContextProvider from './context/DataContext';
import Batch from './components/pages/batches/Batch';
import EnrollmentForm from './components/student-pages/Enrollment/EnrollmentForm';
import Advisor from './components/pages/advisor/Advisor';
import StudentRequests from './components/advisor-pages/enrollment/StudentRequests';
import RequestPage from './components/advisor-pages/enrollment/requests/RequestPage';
import AdvisorRequests from './components/pages/advisor/advisorRequests/AdvisorRequests';
import StudentsEnrolledPage from './components/pages/offeredcourses/StudentsEnrolledPage';
import SemesterPage from './components/student-pages/SemesterPages/SemesterPage';
import OldCoursesPage from './components/student-pages/SemesterPages/OldCoursesPage';






const AppRoutes = () => {
    return ( 
        <div className="App">
            
                <ThemeProvider theme={theme}>
                    <DataContextProvider>
                        <Routes>
                            {/*Public Routes */}
                            <Route exact path="/" element={<LoginPage />}/>
                            <Route exact path="/unauthorized" element= {<Unauthorized/>} />

                            {/*Private Routes */}
                            <Route element={<PersistLogin />}>
                                
                                <Route element={<RequireAuth allowedRoles={['admin','student','advisor']}/>}>
                                        <Route exact path="/dashboard" element = {<Dashboard />} />
                                        <Route exact path="/profile" element={<Profile/>}/>
                                </Route> 

                                <Route element={<RequireAuth allowedRoles={['admin']}/>}>
                                    <Route exact path="/students" element = {<Students/>} />
                                    <Route exact path="/departments" element = {<Departments/>} />
                                    <Route exact path="/courses" element = {<Courses/>} />
                                    <Route exact path="/sessions" element = {<Sessions/>} />
                                    <Route exact path="/offeredcourses" element = {<OfferedCourses/>} />
                                    <Route exact path="/addcourses" element = {<AddCoursesForm/>} />
                                    <Route exact path="/profile/:id" element = {<StudentProfile/>} />
                                    <Route exact path="batch" element = {<Batch/>} />
                                    <Route exact path='/advisors' element ={<Advisor />} />
                                    <Route exact path='/advisors/requests/:advisorId' element ={<AdvisorRequests />} />
                                    <Route exact path ='/offeredcourses/enrolled/students/:id' element = {<StudentsEnrolledPage/>}/>

                                </Route>


                                <Route element={<RequireAuth allowedRoles={['student']}/>}>
                                        <Route exact path="/enrollmentform" element = {<EnrollmentForm/>} />
                                        <Route exact path="/students/allsessions" element = {<SemesterPage/>} />
                                        <Route exact path="/students/sessions/enrolledcourses/:id" element = {<OldCoursesPage/>} />


                                        
                                </Route> 
                                
                                <Route element={<RequireAuth allowedRoles={['advisor','admin']} />}>
                                        <Route exact path="requests/pending" element={<StudentRequests />} />
                                        <Route exact path="requests/:id" element={<RequestPage />} />
                                </Route>


                                <Route path="*" element={<div>404 Page not found.</div>}/>
                            </Route>

                        </Routes>
                    </DataContextProvider>
                </ThemeProvider>
            
            


        </div>



    );
}
 
export default AppRoutes;
