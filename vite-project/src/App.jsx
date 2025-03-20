import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import RegisterUser from './pages/RegisterUser';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </div>
    </Router>
  );
}

import React from 'react';
import './Button.css'; 

const Button = ({ label, onClick }) => {
  return (
    <button className="figma-button" onClick={onClick}>
      {label}
    </button>
  );
};


export default App;
