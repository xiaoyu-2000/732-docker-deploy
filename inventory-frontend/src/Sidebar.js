// src/Sidebar.js
import React from "react";
import "./Sidebar.css"; // Reusable styles

function Sidebar({ filters, setFilters, newProduct, setNewProduct, onAddProduct, onRefresh }) {
  // ✅ 点击按钮生成图并打开 Pie Chart
  const generateAndViewPieChart = async () => {
    try {
      await fetch("http://127.0.0.1:5000/chart/products", {
        credentials: "include",
      });
      window.open("http://127.0.0.1:5000/static/charts/pie_chart.png", "_blank");
    } catch (err) {
      alert("Failed to generate pie chart");
    }
  };

  // ✅ 点击按钮生成图并打开 Bar Chart
  const generateAndViewBarChart = async () => {
    try {
      await fetch("http://127.0.0.1:5000/chart/products", {
        credentials: "include",
      });
      window.open("http://127.0.0.1:5000/static/charts/bar_chart.png", "_blank");
    } catch (err) {
      alert("Failed to generate bar chart");
    }
  };

  return (
    <div className="filter-panel">
      <h3>Search Products</h3>
      <input
        type="text"
        placeholder="SKU"
        value={filters.sku}
        onChange={(e) => setFilters({ ...filters, sku: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
      />
      <button onClick={onRefresh}>Refresh Products</button>

      <hr />
      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="SKU"
        value={newProduct.sku}
        onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
      />
      <button onClick={onAddProduct}>Add Product</button>

      <hr />
      <div className="export-section">
        <h3>Export</h3>
        <button onClick={generateAndViewPieChart}>View Pie Chart</button>
        <br /><br />
        <button onClick={generateAndViewBarChart}>View Bar Chart</button>
        <br /><br />
        <a href="http://127.0.0.1:5000/export-products" download>
          <button>Download CSV</button>
        </a>
      </div>
      <div className="chart-section">
      <h3>Interactive Charts</h3>
      <a href="/charts">
        <button>📊 View Interactive Charts</button>
      </a>
      </div>
    </div>
  );
}

export default Sidebar;
