import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import PrixParVilleChart from "../components/PrixParVilleChart";

function AnalysePrix() {
  const { prixVilleData, data } = useContext(AppContext);

  // Calcul statistiques
  const prixMoyen =
    data.length > 0
      ? Math.round(data.reduce((acc, item) => acc + item.prix, 0) / data.length)
      : 0;

  const prixMax =
    data.length > 0
      ? Math.max(...data.map((item) => item.prix))
      : 0;

  const prixMin =
    data.length > 0
      ? Math.min(...data.map((item) => item.prix))
      : 0;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Analyse des Prix</h1>
      <p style={styles.subtitle}>
        Étude détaillée des prix immobiliers par ville
      </p>

      {/* KPIs */}
      <div style={styles.kpiContainer}>
        <div style={styles.kpiCard}>
          <h3>Prix Moyen</h3>
          <p>{prixMoyen} FCFA</p>
        </div>

        <div style={styles.kpiCard}>
          <h3>Prix Maximum</h3>
          <p>{prixMax} FCFA</p>
        </div>

        <div style={styles.kpiCard}>
          <h3>Prix Minimum</h3>
          <p>{prixMin} FCFA</p>
        </div>
      </div>

      {/* GRAPHIQUE */}
      <div style={styles.chartCard}>
        <h2>Prix moyen par ville</h2>
        <PrixParVilleChart data={prixVilleData} />
      </div>

      {/* INTERPRÉTATION */}
      <div style={styles.analysisBox}>
        <h2>Interprétation</h2>
        <p>
          Les données montrent une variation importante des prix selon les villes.
          Dakar reste la zone la plus chère, tandis que les autres régions offrent
          des opportunités plus accessibles.
        </p>
      </div>
    </div>
  );
}

/* DESIGN PRO */
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
    color: "#6b7280",
    marginBottom: "30px"
  },

  kpiContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  kpiCard: {
    background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
  },

  chartCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  analysisBox: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    borderLeft: "5px solid #3b82f6",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  }
};

export default AnalysePrix;