import React from "react";
import {
  Treemap,
  ResponsiveContainer,
  Tooltip
} from "recharts";

function PrixM2Heatmap() {

  const data = [
    { name: "Almadies", value: 4500 },
    { name: "Ngor", value: 4200 },
    { name: "Mermoz", value: 3800 },
    { name: "Sacré-Cœur", value: 3200 },
    { name: "Ouakam", value: 3000 },
    { name: "Yoff", value: 2800 },
    { name: "Parcelles", value: 2000 },
    { name: "Guédiawaye", value: 1800 }
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>

      <h3 style={{ textAlign: "center" }}>
        Prix au m² par quartier (Heatmap)
      </h3>

      <ResponsiveContainer width="100%" height="100%">

        <Treemap
          data={data}
          dataKey="value"
          stroke="#fff"
          fill="#8884d8"
        >

          <Tooltip />

        </Treemap>

      </ResponsiveContainer>

    </div>
  );
}

export default PrixM2Heatmap;