// src/ChartViewer.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./ChartViewer.css";

const ChartViewer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/chart-data", {
      credentials: "include", // ⚠️ 必须带上 cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("请求失败，可能未登录或服务器未响应");
        return res.json();
      })
      .then((data) => {
        console.log("✅ 收到后端数据：", data);
        setData(data);
      })
      .catch((err) => {
        console.error("❌ 图表数据加载失败：", err.message);
        alert("无法加载图表数据，请确认是否已登录！");
      });
  }, []);

  const productNames = data.map((p) => p.name);
  const productQuantities = data.map((p) => p.quantity);

  return (
    <div className="chart-container">
      <h2>📊 Stock Charts </h2>

      <div className="chart-row">
        {/* 柱状图容器 */}
        <div className="chart-box">
          <Plot
            data={[
              {
                x: productNames,
                y: productQuantities,
                type: "bar",
                marker: { color: "skyblue" },
              },
            ]}
            layout={{ title: "产品库存柱状图", xaxis: { tickangle: -45 } }}
          />
        </div>

        {/* 饼状图容器 */}
        <div className="chart-box">
          <Plot
            data={[
              {
                labels: productNames,
                values: productQuantities,
                type: "pie",
              },
            ]}
            layout={{ title: "Pie chart" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartViewer;
