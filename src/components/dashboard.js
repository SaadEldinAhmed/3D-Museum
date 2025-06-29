import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import './Dashboard.css';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [museum, setMuseum] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/back/items');
        setRatings(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ratings');
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  // ✅ Group by figure/name and average rating
  const ratingMap = {};

  ratings.forEach((item) => {
    const label = item.figure || item.name;
    const rating = item.rating;

    if (!label || typeof rating !== 'number') return;

    if (!ratingMap[label]) {
      ratingMap[label] = { total: 0, count: 0 };
    }

    ratingMap[label].total += rating;
    ratingMap[label].count += 1;
  });

  const averagedRatings = Object.entries(ratingMap).map(([label, data]) => ({
    label,
    rating: data.total / data.count,
  }));

  const top8Averages = averagedRatings.sort((a, b) => b.rating - a.rating).slice(0, 8);

  const revenueData = {
    labels: top8Averages.map((r) => r.label),
    datasets: [
      {
        label: 'Average Rating',
        data: top8Averages.map((r) => r.rating),
        backgroundColor: top8Averages.map((_, idx) =>
          ['#5cd6ff', '#a355ff', '#7e33cc', '#6c2fbf', '#b6862e', '#ff6f61', '#f9c74f', '#43aa8b'][idx % 8]
        ),
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ['Revenue', 'Orders', 'Customers'],
    datasets: [
      {
        label: 'Dashboard Breakdown',
        data: [100, 4, 3],
        backgroundColor: ['#00e1dc', '#a355ff', '#fcbf49'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Metrics Dashboard</h2>
        <div className="filters">
          <select onChange={e => setCountry(e.target.value)} value={country}>
            <option value="">Select Country</option>
            <option value="Egypt">Egypt</option>
          </select>
          <select onChange={e => setCity(e.target.value)} value={city}>
            <option value="">Select City</option>
            <option value="Cairo">Cairo</option>
          </select>
          <select onChange={e => setMuseum(e.target.value)} value={museum}>
            <option value="">Select Museum</option>
            <option value="New Cairo">New Cairo</option>
          </select>
          <button className="nav-btn" onClick={() => navigate('/')}>Back</button>
          <button className="nav-btn" onClick={() => navigate('/manage')}>Manage</button>
        </div>
      </header>

      <main className="dashboard-main">
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <section className="card summary-card">
              <h3>Dashboard</h3>
              <div className="summary-item">Total Revenue <span>$100</span></div>
              <div className="summary-item">Total Orders <span>4</span></div>
              <div className="summary-item">Total Customers <span>3</span></div>
              <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom' } } }} />
            </section>

           

            <section className="card revenue-card">
              <div className="revenue-header">
                <h3>Customer Ratings (Sorted)</h3>
             
              </div>
              <Bar data={revenueData} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
