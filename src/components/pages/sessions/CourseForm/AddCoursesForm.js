import CoursesList from './CoursesList';
import Layout from '../../../layout/Layout';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../reusable-components/Loading';



export default function AddCoursesForm() {
 
 const {apiData, loading,error} = useFetch('/session/active')


  
  
  

  return (
    
    <Layout title={apiData ? apiData?.data?.name : "Active Session not found" }>
        {loading && <Loading/>}
        {!loading &&( apiData && <CoursesList/>) }
        {error && <h1>No Active Session Found.</h1>}
    </Layout>
  )
}