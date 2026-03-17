import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { quartier: "Almadies", prix: 1200000 },
  { quartier: "Ngor", prix: 1000000 },
  { quartier: "Mermoz", prix: 850000 },
  { quartier: "Yoff", prix: 600000 },
  { quartier: "Ouakam", prix: 550000 }
];

function QuartiersPlusChersChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
      >

        <XAxis type="number" />

        <YAxis
          dataKey="quartier"
          type="category"
        />

        <Tooltip />

        <Bar dataKey="prix" />

      </BarChart>
    </ResponsiveContainer>
  );
}

export default QuartiersPlusChersChart;