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

const data = [
  { ville: "Dakar", prix: 350000 },
  { ville: "Thiès", prix: 180000 },
  { ville: "Mbour", prix: 220000 },
  { ville: "Saint-Louis", prix: 150000 },
  { ville: "Saly", prix: 300000 }
];

function PrixParVilleChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>

      <h3>Prix moyen par ville</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="ville" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="prix" fill="#2563eb" />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PrixParVilleChart;