// src/components/Transactions.js
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';  // Corrected import path

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions data when the component mounts
    getTransactions()
      .then(data => {
        setTransactions(data); // Set the fetched transactions in state
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.description}: {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
