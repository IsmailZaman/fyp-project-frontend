import useAxiosprivate from "./useAxiosPrivate";
import { useEffect,useState } from "react";
//axios private

const useFetch = (url) => {
    
    const [data, setData]=useState(null)
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState(null)
    const axiosPrivate = useAxiosprivate()

    useEffect(()=>{
        
        
        const fetchData = async() => {
            setLoading(true)
            try{
                const apiData = await axiosPrivate.get(url)
                setData(apiData)
            }catch(e){
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        
        fetchData()

        return ()=>{}

    },[url])

    return {apiData: data,loading,error}






}
 
export default useFetch;

