import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';

Chart.register(BarController, LinearScale, CategoryScale, BarElement);

// eslint-disable-next-line react/prop-types
const BarChart = ({ data }) => {
    const chartRef = useRef(null);
    let myChart = null;

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            const randomColor = () => {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            };

            const params = new URLSearchParams(location.search);

            let filteredData;
            if (params.toString()) {
              // eslint-disable-next-line react/prop-types
              filteredData = data.filter(item => {
                for (let [key, value] of params) {
                  if (item[key] !== value) {
                    return false;
                  }
                }
                return true;
              });
            } else {
              // eslint-disable-next-line react/prop-types
              filteredData = data.filter(item => item.year === 2020 && item.fossilElectricity > 2);
            }

            const labels = filteredData.slice(0, 10).map(item => item.entity);
            const values = filteredData.slice(0, 10).map(item => item.accessElectricity);

            const datos = {
                labels: labels,
                datasets: [{
                    label: 'Access to Electricity',
                    data: values,
                    borderWidth: 1,
                    backgroundColor: Array(values.length).fill().map(() => randomColor())
                }]
            };

            myChart = new Chart(ctx, {
                type: 'bar',
                data: datos,
                options: {
                    scales: {
                        y: {
                            type: 'linear',
                            beginAtZero: true
                        },
                        x: {
                            type: 'category',
                            ticks: {
                                display: true
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                          enabled: true,
                          callbacks: {
                            title: (tooltipItem) => tooltipItem[0].label,
                            label: (tooltipItem) => `Access to Electricity: ${tooltipItem.formattedValue}`
                          }
                        }
                    }
                }
            });
        }

        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [data]);

    return (
        <div className='bg-white w-1/3 h-1/3'>
            <canvas id="myChart" ref={chartRef} width="400" height="400"></canvas>
        </div>
    );
};

export default BarChart;
