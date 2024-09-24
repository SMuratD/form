import React, { useState } from 'react';

const ExpenseForm = () => {
  const [date, setDate] = useState('');
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('Food');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      date,
      sum: parseFloat(sum),
      category,
      comment
    };

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
      });

      if (response.ok) {
        alert('Transaction added successfully!');
        // Очистить форму
        setDate('');
        setSum('');
        setCategory('Food');
        setComment('');
      } else {
        alert('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Sum:</label>
        <input
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <div>
        <label>Comment:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;