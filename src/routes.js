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
                                
                                <Route element={<RequireAuth allowedRoles={['admin','student']}/>}>
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

                                </Route>
                                
                            </Route>

                        </Routes>
                    </DataContextProvider>
                </ThemeProvider>
            
            


        </div>



    );
}
 
export default AppRoutes;