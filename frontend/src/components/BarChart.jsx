
//import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from "react";
import {  momentLocalizer } from "react-big-calendar";
import moment, { weekdays } from "moment";
import axios from "axios";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);



const BarChart = ({ data }) => {

const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: 'TotalHours ',
        data: [],
        backgroundColor: '#7EAA92', // Use the color you want for the bar
      },
      
    ],
  });

  const [weekData, setWeekData] = useState([]);


const getData = async () => {
  try {
    // const storedId = localStorage.getItem("id");
    const response = await axios.get("http://localhost:5001/details/remark/");
    const collectionData = response.data;
    console.log(collectionData);
    const dailyDurations = {};
    const bar =[]; 

    const formattedEvents = collectionData
      .map((responseData) => {
        console.log(responseData);

        const developed = moment(
          moment(
            `${responseData.Date} ${responseData.Entrytime} `,
            "MM/DD/YYYY HH:mm:ss"
          ).toDate()
        ).toISOString();
        console.log(developed);
        const developedDate = moment(developed).format("YYYY-MM-DD");
        console.log(developedDate);

        const developedStart = moment(
          moment(
            `${responseData.Date} ${responseData.Entrytime}`,
            "MM/DD/YYYY HH:mm:ss"
          ).toDate()
        ).toISOString();
        const developedEntry = moment(developedStart).format("HH:mm:ss");

        const developedEnd = moment(
          moment(
            `${responseData.Date} ${responseData.Exittime}`,
            "MM/DD/YYYY HH:mm:ss"
          ).toDate()
        ).toISOString();
        const developedExit = moment(developedEnd).format("HH:mm:ss");

        

         let durationString = "";
        // console.log(developedExit)
        // if (developedExit !== '00:00:00') {
        //   // Calculate duration only for checkout events
         
        //   console.log(developedExit)
        const developedEntryMoment = moment(developedEntry, "HH:mm:ss");
        const developedExitMoment = moment(developedExit, "HH:mm:ss");

        const duration = moment.duration(
          developedExitMoment.diff(developedEntryMoment)
        );
       console.log(duration)

       const dateKey = moment(developedEntryMoment).format("YYYY-MM-DD");
        dailyDurations[dateKey] = (dailyDurations[dateKey] || 0) + duration.asHours();
         
        // Extract hours, minutes, and seconds from the duration
        const hours = duration.hours();
        console.log(hours)
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        const content ={developedDate,hours};
           bar.push(content);
           
          console.log(bar) 

           setWeekData({
            labels:Object.keys(bar.developedDate),
            datasets: [
              {
                label: 'Hours per Day',
                data:Object.values(bar.hours),
                backgroundColor: '#7EAA92',
                barPercentage: 0.2, // Adjust this value to set the maximum width
                categoryPercentage: 0.4,
               
              },
            ],
          });
            
          
        console.log(bar)

        durationString = `Total hrs: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        console.log(`Time difference: ${durationString}`);
       
       
        console.log(bar.developedDate)
       
        }
      ) 
     //})
   
     

      

    // console.log(dailyDurations)
      const monthlyTotalHours = Object.values(dailyDurations ).reduce((total, dailyTotal) => total + dailyTotal, 0);
      console.log(monthlyTotalHours)
      // console.log(dailyDurations)
      // console.log(dailyDurations.hours)
      
      setTotalHours(monthlyTotalHours);
      // setDailyHours(Object.values(dailyDurations));
      setBarData({
        labels:Object.keys(dailyDurations),
        datasets: [
          {
            label: 'Hours',
            data: Object.values(dailyDurations),
            backgroundColor: '#7EAA92',
            barPercentage: 0.2, // Adjust this value to set the maximum width
            categoryPercentage: 0.4,
           // Use the color you want for the bars
          },
        ],
      });
     
     

    setEvents(formattedEvents);

    
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

useEffect(() => {
  getData();
}, []);










  


  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: ' Hours by day',
        data: data.map(item => item.totalHours),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '800px', height: '500px' }}>
      <Bar data={chartData} options={chartOptions} />
      <Bar data={barData} />
      <Bar data={weekData} />
    </div>
  )
};

// export default TimeTrackerChart;
// return(
//    <div style={{ width: '800px', height: '500px' }}>
      
//       <Bar data={data} options={options} />
//     </div>
// )
// };

export default BarChart;



