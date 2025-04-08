import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });

      // Log the response to the console for debugging
      console.log('Response received:', response);

      // Save the tokens to localStorage
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      // Log successful login action
      console.log('Tokens saved to localStorage');

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        // Log the full response error for debugging
        console.error('Error response:', err.response);
        if (err.response.status === 401) {
          setError('Invalid username or password');
        } else {
          setError(`Something went wrong. Server returned: ${err.response.status}`);
        }
      } else {
        // Handle network or other errors
        console.error('Network or other error:', err);
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
