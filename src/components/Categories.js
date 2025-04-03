import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    axios.get('http://127.0.0.1:8000/api/categories/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Access Token for authentication
      }
    })
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the categories!", error);
    });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
