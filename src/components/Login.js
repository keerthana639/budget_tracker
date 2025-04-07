import React, { useState } from 'react';
import { login } from '../api'; // Import the login function
import './Login.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = { username, password };
      const data = await login(credentials);
      console.log('Logged in successfully:', data);

      // Store token in localStorage or sessionStorage
      localStorage.setItem('auth_token', data.access_token);

      // Optionally, you can redirect the user to another page after successful login
      // For example, using window.location.href = '/dashboard';
    } catch (error) {
      setErrorMessage('Invalid username or password');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
