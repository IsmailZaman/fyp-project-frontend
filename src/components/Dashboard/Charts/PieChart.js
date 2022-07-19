import {Pie} from 'react-chartjs-2';
import  {useState} from 'react';
import {Chart as ChartJS} from 'chart.js/auto';


const PieChart = () => {

    const temp = {
        closed:30,
        openn:100,
     }  

    const [tempRequests, setTempRequests]= useState({
        labels:['Pending Requests', 'Closed Requests'],
        datasets:[{
           label:'Pending Enrollment Requests',
           data: [temp.openn, temp.closed],
           backgroundColor: ['rgba(224, 5, 3, 0.42)','rgba(91, 207, 26, 0.63)',]
        }]
  
     })
    return ( <Pie data={tempRequests} options={{maintainAspectRatio:false}} />
    );
}
 
export default PieChart;