import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

import KPIs from "../components/KPIs";
import PrixParVilleChart from "../components/PrixParVilleChart";
import QuartiersPlusChersChart from "../components/QuartiersPlusChersChart";
import EvolutionPrixChart from "../components/EvolutionPrixChart";

function Dashboard() {
  const {
    data,
    prixVilleData,
    quartiersData,
    evolutionData,
    ville,
    setVille,
    types,
    setTypes,
    prixMax,
    setPrixMax,
    rechercheQuartier,
    setRechercheQuartier,
    loading
  } = useContext(AppContext);

  const handleTypeChange = (type) => {
    if (types.includes(type)) {
      setTypes(types.filter((t) => t !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Chargement...</h2>;
  }

  const kpiData = {
    totalListings: data.length,
    averagePrice:
      data.length > 0
        ? Math.round(data.reduce((acc, item) => acc + item.prix, 0) / data.length)
        : 0,
    topCity: data[0]?.ville || "-",
    topPropertyType: data[0]?.type || "-"
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Immobilier</h1>
      <p style={styles.subtitle}>Analyse du marché immobilier au Sénégal</p>

      <KPIs data={kpiData} />

      {/* FILTRES */}
      <div style={styles.filters}>
        <select style={styles.input} value={ville} onChange={(e) => setVille(e.target.value)}>
          <option value="">Toutes les villes</option>
          <option value="Dakar">Dakar</option>
          <option value="Thiès">Thiès</option>
        </select>

        <input
          type="text"
          placeholder="Rechercher quartier"
          style={styles.input}
          value={rechercheQuartier}
          onChange={(e) => setRechercheQuartier(e.target.value)}
        />

        <input
          type="range"
          min="0"
          max="1500000"
          value={prixMax}
          onChange={(e) => setPrixMax(Number(e.target.value))}
        />
      </div>

      {/* GRAPHIQUES */}
      <div style={styles.grid}>
        <div style={styles.card}><PrixParVilleChart data={prixVilleData} /></div>
        <div style={styles.card}><QuartiersPlusChersChart data={quartiersData} /></div>
        <div style={styles.card}><EvolutionPrixChart data={evolutionData} /></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f8fafc",
    minHeight: "100vh"
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e3a8a"
  },

  subtitle: {
    marginBottom: "20px",
    color: "#6b7280"
  },

  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    flex: "1"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  }
};

export default Dashboard;