import studentNavbarLinks from "../../layout/student-navlinks"
import Layout from "../../layout/Layout"
import useFetch from "../../../hooks/useFetch"
import Loading from "../../reusable-components/Loading"
import StudentCoursesList from "./StudentCoursesList"




const EnrollmentForm = () => {
 
 const {apiData, loading,error} = useFetch('/session/active')
 





  
  
  

  return (
    
    <Layout title={apiData ? `${apiData?.data?.name} enrollment` : "Active Session not found"} navlinks={studentNavbarLinks}>
        {loading && <Loading/>}
        {!loading &&( apiData && <StudentCoursesList/>) }
        {error && <h1>No Active Session Found.</h1>}
    </Layout>
  )
}

export default EnrollmentForm





