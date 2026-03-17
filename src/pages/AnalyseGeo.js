import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import QuartiersPlusChersChart from "../components/QuartiersPlusChersChart";

function AnalyseGeo() {
  const { quartiersData, data } = useContext(AppContext);

  // KPI géographique
  const totalQuartiers = data.length;

  const quartierCher =
    data.length > 0
      ? data.reduce((max, item) => (item.prix > max.prix ? item : max), data[0])
      : null;

  const villeDominante =
    data.length > 0
      ? data.reduce((acc, item) => {
          acc[item.ville] = (acc[item.ville] || 0) + 1;
          return acc;
        }, {})
      : {};

  const topVille = Object.keys(villeDominante).reduce(
    (a, b) => (villeDominante[a] > villeDominante[b] ? a : b),
    "-"
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Analyse Géographique</h1>
      <p style={styles.subtitle}>
        Répartition des prix selon les quartiers et zones
      </p>

      {/* KPIs */}
      <div style={styles.kpiContainer}>
        <div style={styles.kpiCard}>
          <h3>Total quartiers</h3>
          <p>{totalQuartiers}</p>
        </div>

        <div style={styles.kpiCard}>
          <h3>Quartier le plus cher</h3>
          <p>{quartierCher ? quartierCher.quartier : "-"}</p>
        </div>

        <div style={styles.kpiCard}>
          <h3>Ville dominante</h3>
          <p>{topVille}</p>
        </div>
      </div>

      {/* GRAPHIQUE */}
      <div style={styles.chartCard}>
        <h2>Top quartiers les plus chers</h2>
        <QuartiersPlusChersChart data={quartiersData} />
      </div>

      {/* ANALYSE */}
      <div style={styles.analysisBox}>
        <h2>Analyse & Interprétation</h2>
        <p>
          Les quartiers situés dans les zones urbaines comme Dakar présentent
          les prix les plus élevés, en raison de la demande élevée et de la
          proximité des infrastructures.
        </p>

        <p>
          À l’inverse, les zones périphériques offrent des prix plus accessibles,
          ce qui peut représenter des opportunités pour les investisseurs.
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
    background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
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
    borderLeft: "5px solid #1e3a8a",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  }
};

export default AnalyseGeo;