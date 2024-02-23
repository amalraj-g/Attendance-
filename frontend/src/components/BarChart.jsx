
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['February', 'March'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset ',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 200})),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      barPercentage: 0.2, // Adjust this value to set the maximum width
      categoryPercentage: 0.4,
    },
    
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const BarChart = () => {
return(
   <div style={{ width: '800px', height: '500px' }}>
      
      <Bar data={data} options={options} />
    </div>
)
};

export default BarChart;



