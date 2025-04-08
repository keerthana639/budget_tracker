import React, { useState } from 'react';

const TransactionForm = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [transactionType, setTransactionType] = useState('expense');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit transaction to the backend here
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />
            <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
            >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;
