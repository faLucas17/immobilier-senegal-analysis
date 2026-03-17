import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function TopQuartiersChart() {

  const data = [
    { quartier: "Almadies", prix: 850000 },
    { quartier: "Ngor", prix: 780000 },
    { quartier: "Mermoz", prix: 720000 },
    { quartier: "Point E", prix: 690000 },
    { quartier: "Sacré Coeur", prix: 650000 }
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>

      <h3 style={{ textAlign: "center" }}>
        Top quartiers les plus chers
      </h3>

      <ResponsiveContainer width="100%" height="100%">

        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="quartier"
          />

          <Tooltip />

          <Bar
            dataKey="prix"
            fill="#82ca9d"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TopQuartiersChart;