import React, { useEffect, useState } from 'react';
import api from '../api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/api/transactions/');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Your Transactions</h2>
      <ul className="border rounded p-2 space-y-2">
        {transactions.map((txn) => (
          <li key={txn.id} className="flex justify-between items-center border-b py-2">
            <div>
              <strong>{txn.category}</strong> - {txn.description || 'No description'}
            </div>
            <div className={`font-semibold ${txn.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
              {txn.type === 'expense' ? '-' : '+'} ₹{txn.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
