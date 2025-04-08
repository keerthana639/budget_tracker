// src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/api/transactions/');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/transactions/${id}/`);
      fetchTransactions();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (txn) => {
    setEditing(txn.id);
    setForm(txn);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/transactions/${editing}/`, form);
      setEditing(null);
      fetchTransactions();
    } catch (err) {
      alert('Update failed');
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
            {editing === txn.id ? (
              <div className="w-full flex flex-col gap-1">
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                <button className="text-green-600" onClick={handleUpdate}>Update</button>
              </div>
            ) : (
              <>
                <div>
                  <strong>{txn.category}</strong> – {txn.description}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${txn.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                    ₹{txn.amount}
                  </span>
                  <button onClick={() => handleEdit(txn)} className="text-blue-500">Edit</button>
                  <button onClick={() => handleDelete(txn.id)} className="text-red-500">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
