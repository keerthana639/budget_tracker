// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          window.location.href = '/login';  // Redirect to login if no token
        }

        const response = await axios.get('http://localhost:8000/api/dashboard/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBalance(response.data.balance);  // Update balance with response data
        setTransactions(response.data.transactions);  // Update transactions
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setBalance(0);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading your financial dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Financial Dashboard</h2>
      <h3>Balance: ${balance}</h3>
      <h4>Recent Transactions</h4>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.category}: ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
