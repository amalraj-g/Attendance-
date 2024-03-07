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
} from "chart.js";
import { Bar } from "react-chartjs-2";
//import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from "react";
import { momentLocalizer } from "react-big-calendar";
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

const localizer = momentLocalizer(moment);

const BarChart = () => {
  const [events, setEvents] = useState([]);
  // const [totalHours, setTotalHours] = useState(0);
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "TotalHours ",
        data: [],
        backgroundColor: "#7EAA92", // Use the color you want for the bar
      },
    ],
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "TotalHours ",
        data: [],
        backgroundColor: "#7EAA92", // Use the color you want for the bar
      },
    ],
  });

  const [weekData, setWeekData] = useState({
    labels: [],
    datasets: [
      {
        label: "TotalHours ",
        data: [],
        backgroundColor: "#7EAA92", // Use the color you want for the bar
      },
    ],
  });
  const getData = async () => {
    try {
      // const storedId = localStorage.getItem("id");
      const response = await axios.get("http://localhost:5001/details/remark/");
      const collectionData = response.data;
      console.log(collectionData);
      const dailyDurations = {};
      //const weeklyDurations = {};
      const bar = [];

      const formattedEvents = collectionData.map((responseData) => {
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
        console.log(developedExit);
        if (developedExit !== "00:00:00") {
          // Calculate duration only for checkout events

          console.log(developedExit);
          const developedEntryMoment = moment(developedEntry, "HH:mm:ss");
          const developedExitMoment = moment(developedExit, "HH:mm:ss");

          const duration = moment.duration(
            developedExitMoment.diff(developedEntryMoment)
          );
          console.log(duration);

          const dateKey = moment(developedEntryMoment).format("YYYY-MM-DD");
          dailyDurations[dateKey] =
            (dailyDurations[dateKey] || 0) + duration.asHours();

          //Extract hours, minutes, and seconds from the duration
          const hours = duration.hours();
          console.log(hours)
          const minutes = duration.minutes();
          const seconds = duration.seconds();

          // Initialize an object to store weekly durations


// Assuming you already have a loop or iteration over your data
// Inside the loop where you process each data entry

// const weekKey = moment(developedEntryMoment).isoWeek(); // Get ISO week number
// weeklyDurations[weekKey] = (weeklyDurations[weekKey] || 0) + duration.asHours();

// Continue with your other logic
// ...

// After processing all data entries, you can log or use the weeklyDurations
// console.log("Weekly Durations:", weeklyDurations);


          const content ={developedDate,hours};
             bar.push(content);

          console.log(bar)
          setChartData ( {
            labels: bar.map((item) => item.developedDate),
            datasets: [
              {
                label: " Hours by day",
                data: bar.map((item) => item.hours),
                backgroundColor: "#CD8D7A",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });

         




const generateSampleDailyDurations = () => {
  const weeklyDurations = {};

  const startDate = moment('2024-02-01');


  const endDate = moment('2024-02-29');

 
  let currentDate = startDate.clone();
  while (currentDate.isSameOrBefore(endDate, 'day')) {
    
    const randomDuration = Math.floor(Math.random() * 10) + 1;
    weeklyDurations[currentDate.format('YYYY-MM-DD')] = randomDuration;
     currentDate.add(1, 'day');
  }

  return weeklyDurations;
};


const weeklyDurations = generateSampleDailyDurations();
console.log(weeklyDurations)

const calculateTotalHoursPerWeek = (weeklyDurations) => {
  const totalHoursPerWeek = {};

  
  Object.keys(weeklyDurations).forEach((currentDate) => {
    const durationHours = weeklyDurations[currentDate];
    const weekNumber = moment(currentDate).isoWeek();
    totalHoursPerWeek[weekNumber] = (totalHoursPerWeek[weekNumber] || 0) + durationHours;
  });

  return totalHoursPerWeek;
};


const totalHoursPerWeekFebruary = calculateTotalHoursPerWeek(weeklyDurations);
console.log('Sample Daily Durations for February:', weeklyDurations);
console.log('Total Hours Per Week in February:', totalHoursPerWeekFebruary);


setWeekData({
  labels: Object.keys(totalHoursPerWeekFebruary),
  datasets: [
    {
      label: "Hours per week",
      data: Object.values(totalHoursPerWeekFebruary),
      backgroundColor: "#F9B572",
      barPercentage: 0.2,
      categoryPercentage: 0.4,
    },
  ],
});

        
        }
      });

      const monthlyTotalHours = Object.values(dailyDurations).reduce(
        (total, dailyTotal) => total + dailyTotal,
        0
      );
      console.log(monthlyTotalHours);

      
      setBarData({
        labels: Object.keys(dailyDurations),
        datasets: [
          {
            label: "Hours per month",
            data: Object.values(dailyDurations),
            backgroundColor: "#7EAA92",
            barPercentage: 0.2,
            categoryPercentage: 0.4,
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

 

 

  return (
    <div style={{ width: "700px", height: "500px" }}>
      <Bar data={chartData}  />

      <Bar data={weekData}  />

      <Bar data={barData} />
      
    </div>
  );
};

export default BarChart;

