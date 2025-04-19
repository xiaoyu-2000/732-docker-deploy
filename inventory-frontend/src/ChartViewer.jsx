import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./ChartViewer.css";
import { BASE_URL } from "./api";  // backend api

const ChartViewer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/chart-data`, {
      credentials: "include", // allow Cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("FAILED");
        return res.json();
      })
      .then((data) => {
        console.log("GET the data", data);
        setData(data);
      })
      .catch((err) => {
        console.error("Failed to load chart：", err.message);
        alert("Make sure you are logged in plz");
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
            layout={{ title: "bar chart", xaxis: { tickangle: -45 } }}
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
