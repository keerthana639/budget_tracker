import React from 'react';
import { logout } from '../api';
import { useNavigate } from 'react-router-dom';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Budget Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <AddTransaction onAdd={() => window.location.reload()} />
      <TransactionList />
    </div>
  );
};

export default Dashboard;
