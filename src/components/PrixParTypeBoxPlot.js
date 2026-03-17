import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function PrixParTypeBoxPlot() {

  const data = [
    { type: "Appartement", prix: 200000 },
    { type: "Appartement", prix: 220000 },
    { type: "Appartement", prix: 250000 },
    { type: "Maison", prix: 300000 },
    { type: "Maison", prix: 350000 },
    { type: "Maison", prix: 400000 },
    { type: "Terrain", prix: 150000 },
    { type: "Terrain", prix: 180000 },
    { type: "Terrain", prix: 200000 }
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>

      <h3 style={{ textAlign: "center" }}>
        Distribution des prix par type de bien
      </h3>

      <ResponsiveContainer width="100%" height="100%">

        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>

          <CartesianGrid />

          <XAxis
            type="category"
            dataKey="type"
            name="Type de bien"
          />

          <YAxis
            type="number"
            dataKey="prix"
            name="Prix"
          />

          <Tooltip cursor={{ strokeDasharray: "3 3" }} />

          <Scatter
            name="Prix"
            data={data}
            fill="#8884d8"
          />

        </ScatterChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PrixParTypeBoxPlot;