import React, { useState } from "react";

function AnalyseDetaillee() {

  const data = [
    { id: 1, ville: "Dakar", quartier: "Almadies", type: "Appartement", prix: 1200000, surface: 120 },
    { id: 2, ville: "Dakar", quartier: "Mermoz", type: "Maison", prix: 950000, surface: 150 },
    { id: 3, ville: "Thiès", quartier: "Randoulene", type: "Appartement", prix: 320000, surface: 90 },
    { id: 4, ville: "Mbour", quartier: "Saly", type: "Villa", prix: 800000, surface: 200 },
    { id: 5, ville: "Saint-Louis", quartier: "Sor", type: "Maison", prix: 250000, surface: 110 },
    { id: 6, ville: "Dakar", quartier: "Yoff", type: "Appartement", prix: 600000, surface: 100 }
  ];

  const [ville, setVille] = useState("");
  const [type, setType] = useState("");

  const filteredData = data.filter((item) => {
    return (
      (ville === "" || item.ville === ville) &&
      (type === "" || item.type === type)
    );
  });

  return (
    <div style={{ padding: 30 }}>

      <h1>Analyse détaillée des prix immobiliers</h1>

      {/* Filtres */}

      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>

        <select value={ville} onChange={(e) => setVille(e.target.value)}>
          <option value="">Toutes les villes</option>
          <option value="Dakar">Dakar</option>
          <option value="Thiès">Thiès</option>
          <option value="Mbour">Mbour</option>
          <option value="Saint-Louis">Saint-Louis</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Tous les types</option>
          <option value="Appartement">Appartement</option>
          <option value="Maison">Maison</option>
          <option value="Villa">Villa</option>
        </select>

      </div>

      {/* Tableau */}

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ville</th>
            <th>Quartier</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Surface (m²)</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.ville}</td>
              <td>{item.quartier}</td>
              <td>{item.type}</td>
              <td>{item.prix}</td>
              <td>{item.surface}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default AnalyseDetaillee;