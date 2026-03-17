import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function EvolutionPrixChart() {

  const data = [
    { mois: "Jan", prix: 210000 },
    { mois: "Fev", prix: 220000 },
    { mois: "Mar", prix: 230000 },
    { mois: "Avr", prix: 240000 },
    { mois: "Mai", prix: 250000 },
    { mois: "Jun", prix: 260000 },
    { mois: "Jul", prix: 255000 },
    { mois: "Aou", prix: 265000 },
    { mois: "Sep", prix: 270000 },
    { mois: "Oct", prix: 275000 },
    { mois: "Nov", prix: 280000 },
    { mois: "Dec", prix: 290000 }
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>

      <h3 style={{ textAlign: "center" }}>
        Évolution mensuelle des prix immobiliers
      </h3>

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="mois" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="prix"
            stroke="#ff7300"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default EvolutionPrixChart;