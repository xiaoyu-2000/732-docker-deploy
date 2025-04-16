import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./ChartViewer.css";
import { BASE_URL } from "./api";  // ✅ 引入后端地址

const ChartViewer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/chart-data`, {
      credentials: "include", // ✅ 允许携带 Cookie
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
        <div className="chart-box">
          <Plot
            data={[{
              x: productNames,
              y: productQuantities,
              type: "bar",
              marker: { color: "skyblue" },
            }]}
            layout={{ title: "产品库存柱状图", xaxis: { tickangle: -45 } }}
          />
        </div>

        <div className="chart-box">
          <Plot
            data={[{
              labels: productNames,
              values: productQuantities,
              type: "pie",
            }]}
            layout={{ title: "Pie chart" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartViewer;
