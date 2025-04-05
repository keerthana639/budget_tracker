// src/components/CategoriesPage.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        setError("Failed to load categories");
      });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {error && <p>{error}</p>}
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
