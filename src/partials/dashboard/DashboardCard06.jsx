import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06() {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(_randomFill(3, 0, 1))
  }, [])
  
  // Generate random data
  const _randomFill = (amount, min, max) => {
    const arr = [];
    let total = 0;

    // fill an array with random numbers
    for (let i = 0; i < amount; i++) arr.push(_random(min, max));

    // add up all the numbers
    for (let i = 0; i < amount; i++) total += arr[i];

    // normalise so numbers add up to 1
    for (let i = 0; i < amount; i++) arr[i] /= total;

    return arr;
  }

  const _random = (min, max) => {
    return min + Math.random() * (max - min);
  }

  const chartData = {
    labels: ['United States', 'Italy', 'Other'],
    datasets: [
      {
        label: 'Top Countries',
        data,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Top Countries</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {data.length > 0 && (
        <DoughnutChart data={chartData} width={389} height={260} />
      )}
    </div>
  );
}

export default DashboardCard06;
