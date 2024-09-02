// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home'; // New Home component
import AvailableCars from './AvailableCars'; // New Available Cars component
import Admin from './Admin'; // New Admin component

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="flex justify-between items-center bg-gray-800 p-4">
          <div className="text-white font-bold">
            Car Rental Company
          </div>
          <div>
            <Link to="/" className="text-white px-2">Home</Link>
            <Link to="/cars" className="text-white px-2">Available Cars</Link>
            <Link to="/admin" className="text-white px-2">Admin</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<AvailableCars />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;