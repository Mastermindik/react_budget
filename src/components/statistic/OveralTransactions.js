import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

function OveralTransactions({overalStatistic}) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.defaults.color = '#000';
  const data = {
    labels: ['Overal income', 'Overal expence'],
    datasets: [
      {
        label: 'UAH',
        data: overalStatistic.map(el => Object.values(el)).join().split(','),
        backgroundColor: [
          'rgba(255, 99, 132, .8)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 86, .8)',
          'rgba(75, 192, 192, .8)',
          'rgba(153, 102, 255, .8)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 185, 86, .8)',
          'rgba(86, 255, 224, .8)',
          'rgba(86, 86, 255, .8)',
          'rgba(111, 68, 37, .8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 185, 86, 1)',
          'rgba(86, 255, 224, 1)',
          'rgba(86, 86, 255, 1)',
          'rgba(111, 68, 37, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: 'right' ,
      }
    },
    redraw: true,
    maintainAspectRatio: false,
    responsive: true,
  };

  return <Doughnut data={data} options={options} style={{width: '15rem', height: '15rem'}}/>
}

export default OveralTransactions