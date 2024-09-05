// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/RailwayList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/RailwayForm';
import UpdateRailway from './components/UpdateRailway';

import ReadOnly from './components/ReadOnly.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
          <Route path="/update/:id" element={<UpdateRailway />} />
          <Route path="/railways-readonly" element={<ReadOnly />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
