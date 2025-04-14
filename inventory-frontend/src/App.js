// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProductManager from "./ProductManager";
import ChartViewer from "./ChartViewer"; // ✅ 新增图表页面

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/charts" element={<ChartViewer />} /> {/* ✅ 新增图表路由 */}
      </Routes>
    </Router>
  );
}

export default App;
