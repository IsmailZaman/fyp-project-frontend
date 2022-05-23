import CoursesList from './CoursesList';
import Layout from '../../../layout/Layout';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../reusable-components/Loading';
import adminNavbarLinks from '../../../layout/admin-navlinks';



export default function AddCoursesForm() {
 
 const {apiData, loading,error} = useFetch('/session/active')


  
  
  

  return (
    
    <Layout title={apiData ? apiData?.data?.name : "Active Session not found"} navlinks={adminNavbarLinks}>
        {loading && <Loading/>}
        {!loading &&( apiData && <CoursesList/>) }
        {error && <h1>No Active Session Found.</h1>}
    </Layout>
  )
}