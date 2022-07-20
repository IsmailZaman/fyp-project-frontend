import {Pie} from 'react-chartjs-2';
import  {useState} from 'react';
import {Chart as ChartJS} from 'chart.js/auto';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';



const PieChart = () => {
    const {apiData, loading, error} = useFetch('/requests/piechart')
    

    const temp = {
        closed:30,
        openn:100,
     }  
     const data ={
        labels:['Pending Requests', 'Closed Requests'],
        datasets:[{
           label:'Pending Enrollment Requests',
           data: [],
           backgroundColor: ['rgba(224, 5, 3, 0.42)','rgba(91, 207, 26, 0.63)',]
        }]
  
     }

     if(apiData?.data){
        data.datasets[0].data = [apiData.data.pending, apiData.data.closed]
     }

    // const [tempRequests, setTempRequests]= useState({
    //     labels:['Pending Requests', 'Closed Requests'],
    //     datasets:[{
    //        label:'Pending Enrollment Requests',
    //        data: [temp.openn, temp.closed],
    //        backgroundColor: ['rgba(224, 5, 3, 0.42)','rgba(91, 207, 26, 0.63)',]
    //     }]
  
    //  })
    return (<>
    
    {loading && <Loading />}
     {
        apiData?.data &&
        <Pie data={data} options={{maintainAspectRatio:false}} />
    }
    </>);
}
 
export default PieChart;