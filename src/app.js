import React from 'react';
import Login from './components/Login';  // Import the Login component

const App = () => {
  return (
    <div>
         <h1>Budget Tracker</h1>
      <Login />  {/* Render the Login component */}
    </div>
  );
};

export default App;
