import {Bar} from 'react-chartjs-2';
import { useEffect, useState } from 'react';




const BarChart = ({data, number, department}) => {
   

   
   useEffect(()=>{

      const newData = data.data.slice(0,number)
      
      setUpdated(false)

      setChartData({
         labels: newData.map((course)=>course.courseName),
         datasets: [{
            label:`Popular Courses - ${department}`,
            data: newData.map((course)=>course.studentsEnrolled),
            backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(53, 162, 235, 0.5)','rgba(234, 120, 26, 0.63)','rgba(91, 207, 26, 0.63)','rgba(238, 220, 36, 0.36)']
            //['orange','blue','green','pink','grey']
   
         }],
         options:{
            responsive: false,
            maintainAspectRatio:false,
         }
      })

      setUpdated(true)

   },[number,data,department])

   const [dataUpdated, setUpdated] = useState(false)
   const [chartData, setChartData] = useState({})
  


    return ( <>
            { dataUpdated && <Bar data={chartData} options={{maintainAspectRatio: true}} />}

    </> );
}
 
export default BarChart;
