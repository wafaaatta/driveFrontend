import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Register from "./Register";
import Home from './Home';
import ProductList from './components/ProductList';
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Homepage from "./pages/Homepage";
import CategoriesCreate from "./pages/CategoriesCreate";
import CategoriesUpdate from "./pages/CategoriesUpdate";
import ProductsCreate from "./pages/ProductsCreate";
import ProductsUpdate from "./pages/ProductsUpdate";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/products/create" element={<ProductsCreate />} />
            <Route path="/products/:id/update" element={<ProductsUpdate />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/create" element={<CategoriesCreate />} />
            <Route path="/categories/:id/update" element={<CategoriesUpdate />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;

