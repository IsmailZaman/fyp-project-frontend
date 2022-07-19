import {Bar} from 'react-chartjs-2';
import {popCourses} from '../chartData';
import  {useState} from 'react';



const BarChart = () => {


    const [chartData, setChartData] = useState({
        labels:popCourses.map((data)=>data.courseName),
        datasets: [{
           label:"Popular Courses - CS",
           data: popCourses.map((data)=>data.noOfRequests),
           backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(53, 162, 235, 0.5)','rgba(234, 120, 26, 0.63)','rgba(91, 207, 26, 0.63)','rgba(238, 220, 36, 0.36)']
           //['orange','blue','green','pink','grey']
  
        }],
        options:{
           responsive: false,
           maintainAspectRatio:false,
        }
     })
  


    return ( <>
            <Bar data={chartData} options={{maintainAspectRatio:false}} />

    </> );
}
 
export default BarChart;
