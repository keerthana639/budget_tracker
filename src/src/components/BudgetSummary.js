import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../api';

const BudgetSummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get('/api/budget-summary/');
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to fetch summary', err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly Budget Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={summary}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4ade80" />
          <Bar dataKey="expenses" fill="#f87171" />
          <Bar dataKey="budget" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetSummary;
