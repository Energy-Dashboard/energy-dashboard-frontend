import { useRef, useEffect } from "react";
import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";

Chart.register(BarController, LinearScale, CategoryScale, BarElement);

// eslint-disable-next-line react/prop-types
const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const randomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
      };

      const dataByYearAndCountry = data.reduce((acc, item) => {
        if (!acc[item.year]) {
          acc[item.year] = {};
        }
        acc[item.year][item.entity] = item.accessElectricity;
        return acc;
      }, {});

      // Get labels (years)
      const labels = Object.keys(dataByYearAndCountry);

      // Get unique countries
      const countries = [...new Set(data.map(item => item.entity))];

      // Create a dataset for each country
      const datasets = countries.map(country => {
        const data = labels.map(year => dataByYearAndCountry[year][country] || 0);
        return {
          label: country,
          data: data,
          backgroundColor: randomColor(),
          // other properties...
        };
      });
        

      const datos = {
        labels: labels,
        datasets: datasets,
      };

      myChart = new Chart(ctx, {
        type: "bar",
        data: datos,
        options: {
          scales: {
            y: {
              type: "linear",
              beginAtZero: true,
            },
            x: {
              type: "category",
              ticks: {
                display: true,
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                title: (tooltipItem) => tooltipItem[0].label,
                label: (tooltipItem) =>
                  `Access to Electricity: ${tooltipItem.formattedValue}`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white w-1/3 h-1/3">
      <canvas id="myChart" ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default BarChart;
