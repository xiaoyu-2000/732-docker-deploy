import React, { useEffect, useState } from "react";
import api from "./api";
import "./ProductManager.css";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ sku: "", name: "", minPrice: "", maxPrice: "" });

  // ✅ 添加商品的表单状态
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
      setError("加载商品失败：" + (err.response?.data?.error || "未知错误"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("确定要删除该商品吗？")) return;
    try {
      await api.delete(`/products/${id}`, { withCredentials: true });
      fetchProducts();
    } catch (err) {
      alert("删除失败：" + (err.response?.data?.error || "未知错误"));
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
      alert("商品添加成功！");
      setNewProduct({ name: "", sku: "", quantity: "", price: "", image: null });
      fetchProducts();
    } catch (err) {
      alert("添加失败：" + (err.response?.data?.error || "未知错误"));
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

  return (
    <div className="product-page">
      <div className="filter-panel">
        <h3>查找商品</h3>
        <input
          type="text"
          placeholder="SKU"
          value={filters.sku}
          onChange={(e) => setFilters({ ...filters, sku: e.target.value })}
        />
        <input
          type="text"
          placeholder="名称"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="最低价格"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="最高价格"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <button onClick={fetchProducts}>刷新商品</button>

        <hr />
        <h3>添加商品</h3>
        <input
          type="text"
          placeholder="名称"
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
          placeholder="数量"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="价格"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
        />
        <button onClick={handleAddProduct}>添加商品</button>
      </div>

      <div className="product-container">
        <h2>商品管理</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-box" key={product._id}>
              <h3>{product.name}</h3>
              <p>SKU: {product.sku}</p>
              <p>数量: {product.quantity}</p>
              <p>价格: ${product.price}</p>
              {product.image && (
                <img
                  src={`http://127.0.0.1:5000${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <button onClick={() => handleDelete(product._id)}>删除</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductManager;
