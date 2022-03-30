import {Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/login-page/LoginPage';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';


const AppRoutes = () => {
    return ( 
        <div className="App">
            
                <Routes>
                    {/*Public Routes */}
                    <Route exact path="/" element={<LoginPage />}/>
                    <Route exact path="/unauthorized" element= {<Unauthorized/>} />

                    <Route element={<RequireAuth allowedRoles={['admin']}/>}>
                        <Route exact path="/dashboard" element = {<Dashboard />} />
                    </Route>
                </Routes>
            


        </div>



    );
}
 
export default AppRoutes;