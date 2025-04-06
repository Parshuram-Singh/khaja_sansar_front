// components/DashboardContent.jsx
import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const DashboardContent = () => {
  useEffect(() => {
    // Website Views - Bar Chart
    new Chart(document.getElementById('chart-views'), {
      type: 'bar',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Views',
          data: [50, 45, 22, 28, 50, 60, 76],
          backgroundColor: '#10B981'
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // Daily Sales - Line Chart
    new Chart(document.getElementById('chart-sales'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Sales',
          data: [120, 230, 130, 440, 250, 360, 270, 180, 90, 300, 310, 220],
          borderColor: '#10B981',
          tension: 0.4,
          fill: false
        }]
      }
    });

    // Tasks - Line Chart
    new Chart(document.getElementById('chart-tasks'), {
      type: 'line',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Tasks Completed',
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
          borderColor: '#10B981',
          tension: 0.4,
          fill: false
        }]
      }
    });
  }, []);

  return (
    <section className="mt-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mt-2">Overview of your project management system.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[
          { title: "Today's Money", value: '$53k', icon: 'fa-wallet', change: '+55% from last week', positive: true },
          { title: "Today's Users", value: '2,300', icon: 'fa-users', change: '+3% from last month', positive: true },
          { title: 'Ads Views', value: '3,462', icon: 'fa-chart-bar', change: '-2% from yesterday', positive: false },
          { title: 'Sales', value: '$103,430', icon: 'fa-shopping-cart', change: '+5% from yesterday', positive: true },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <i className={`fas ${stat.icon} text-2xl text-gray-700`}></i>
            </div>
            <p className={`mt-3 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Website Views</h3>
          <p className="text-sm text-gray-500">Last Campaign</p>
          <canvas id="chart-views" className="mt-4"></canvas>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Daily Sales</h3>
          <p className="text-sm text-gray-500">+15% today</p>
          <canvas id="chart-sales" className="mt-4"></canvas>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Tasks</h3>
          <p className="text-sm text-gray-500">Completed</p>
          <canvas id="chart-tasks" className="mt-4"></canvas>
        </div>
      </div>
    </section>
  );
};

export default DashboardContent;