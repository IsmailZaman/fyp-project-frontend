import {Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/login-page/LoginPage';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


const AppRoutes = () => {
    return ( 
        <div className="App">
            
            <ThemeProvider theme={theme}>
                <Routes>
                    {/*Public Routes */}
                    <Route exact path="/" element={<LoginPage />}/>
                    <Route exact path="/unauthorized" element= {<Unauthorized/>} />

                    {/*Private Routes */}
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth allowedRoles={['admin','student']}/>}>
                                <Route exact path="/dashboard" element = {<Dashboard />} />
                        </Route> 
                    </Route>

                </Routes>
            </ThemeProvider>
            


        </div>



    );
}
 
export default AppRoutes;