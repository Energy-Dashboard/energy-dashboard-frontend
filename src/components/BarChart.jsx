import { useEffect, useRef } from 'react';
import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';

Chart.register(BarController, LinearScale, CategoryScale, BarElement);

const BarChart = () => {
    const chartRef = useRef(null);
    let myChart = null;

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  type: 'linear',
                  beginAtZero: true
                },
                x: {
                  type: 'category',
                }
              }
            }
          });

            return () => {
                myChart.destroy();
              };
    }, []);
  
    return (
      <div className='bg-white'>
        <canvas id="myChart" ref={chartRef} width="400" height="400"></canvas>
      </div>
    );
  };
  
  export default BarChart;