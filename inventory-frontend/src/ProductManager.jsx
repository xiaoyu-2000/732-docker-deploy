import React, { useEffect, useState } from "react";
import api from "./api";
import "./ProductManager.css";
import Sidebar from "./Sidebar";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ sku: "", name: "", minPrice: "", maxPrice: "" });

  // ✅ Form state for adding product
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", { withCredentials: true });
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`, { withCredentials: true });
      fetchProducts();
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("sku", newProduct.sku);
    formData.append("quantity", newProduct.quantity);
    formData.append("price", newProduct.price);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      await api.post("/products/add", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      setNewProduct({ name: "", sku: "", quantity: "", price: "", image: null });
      fetchProducts();
    } catch (err) {
      alert("Add failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.sku || product.sku.includes(filters.sku)) &&
      (!filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.minPrice || product.price >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice || product.price <= parseFloat(filters.maxPrice))
    );
  });

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      alert("Logged out");
      window.location.href = "/";
    } catch (err) {
      alert("Logout failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="product-page">
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onAddProduct={handleAddProduct}
        onRefresh={fetchProducts}
      />

      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <hr />
      <div className="product-container">
        <h2>Product Management</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-box" key={product._id}>
              <h3>{product.name}</h3>
              <p>SKU: {product.sku}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.price}</p>
              {product.image && (
                <img
                  src={`http://127.0.0.1:5000${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductManager;
