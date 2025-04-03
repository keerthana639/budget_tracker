import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from the API
    axios.get('http://127.0.0.1:8000/api/transactions/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(response => {
      setTransactions(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the transactions!", error);
    });
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>{transaction.name}: ${transaction.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
