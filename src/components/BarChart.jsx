import { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js"; 

Chart.register(...registerables); 

const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  let myChart = null;
  const [dataType, setDataType] = useState("accessElectricity");

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      const randomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
      };

      const dataByYearAndCountry = data.reduce((acc, item) => {
        if (!acc[item.year]) {
          acc[item.year] = {};
        }
        acc[item.year][item.entity] = item[dataType];
        return acc;
      }, {});

      const labels = Object.keys(dataByYearAndCountry);
      const countries = [...new Set(data.map(item => item.entity))];
      const datasets = countries.map(country => {
        const data = labels.map(year => dataByYearAndCountry[year][country] || 0);
        return {
          label: country,
          data: data,
          backgroundColor: randomColor(),
        };
      });

      const chartData = {
        labels: labels,
        datasets: datasets,
      };

      myChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              ticks: {
                display: true,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (context.parsed.y !== null) {
                    label += ': ' + new Number(context.parsed.y).toFixed(2);
                  }
                  return label;
                }
              }
            }
          },
        },
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data, dataType]);

  return (
    <div className="flex flex-col justify-center items-center w-full pb-5 gap-4">
      <select value={dataType} onChange={(e) => setDataType(e.target.value)} className="bg-[#333] text-white">
        <option value="accessElectricity">Access to electricity</option>
        <option value="cleanFuels">Clean Fuels</option>
        <option value="renewableCapacity">Renewable Capacity</option>
        <option value="financialFlows">Financial Flows</option>
        <option value="renewableEnergyShare">Renewable Energy Share</option>
        <option value="fossilElectricity">Fossil Electricity</option>
        <option value="nuclearElectricity">Nuclear Electricity</option>
        <option value="renewablesElectricity">Renewables Electricity</option>
        <option value="lowCarbonElectricity">Low Carbon Electricity</option>
        <option value="primaryEnergyConsumption">Primary Energy Consumption</option>
        <option value="energyIntensity">Energy Intensity</option>
        <option value="co2Emissions">CO2 Emissions</option>
        <option value="renewableEnergyPercent">Renewable Energy Percent</option>
        <option value="gdpGrowth">GDP Growth</option>
        <option value="gdpPerCapita">GDP Per Capita</option>
        <option value="density">Density</option>
      </select>
      <div className="flex justify-center items-center bg-white">
        <canvas id="myChart" ref={chartRef} width="400" height="400"></canvas>
      </div>
    </div>
  );
};

export default BarChart;
