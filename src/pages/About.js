import React from "react";

function About() {
  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>À propos du projet</h1>
        <p style={styles.subtitle}>
          Analyse du marché immobilier au Sénégal à partir des données Expat Dakar
        </p>
      </div>

      {/* SECTION PROJET */}
      <div style={styles.card}>
        <h2>🎯 Objectif du projet</h2>
        <p>
          Ce projet vise à analyser les prix de l’immobilier au Sénégal afin de
          fournir des insights pertinents aux utilisateurs, investisseurs et
          décideurs.
        </p>
      </div>

      {/* SECTION MÉTHODOLOGIE */}
      <div style={styles.card}>
        <h2>📊 Méthodologie</h2>
        <ul>
          <li>Collecte des données (scraping Expat Dakar)</li>
          <li>Nettoyage et préparation des données</li>
          <li>Analyse statistique (prix moyen, min, max)</li>
          <li>Visualisation avec graphiques interactifs</li>
        </ul>
      </div>

      {/* SECTION OUTILS */}
      <div style={styles.card}>
        <h2>🛠️ Outils utilisés</h2>
        <div style={styles.tools}>
          <span style={styles.badge}>React.js</span>
          <span style={styles.badge}>Recharts</span>
          <span style={styles.badge}>Axios</span>
          <span style={styles.badge}>Python (Scraping)</span>
          <span style={styles.badge}>Pandas</span>
        </div>
      </div>

      {/* SECTION AUTEUR */}
      <div style={styles.card}>
        <h2>👩‍💻 À propos des auteurs</h2>
        <p>
          Étudiants en Master Data Science, passionnée par
          l’analyse de données et la visualisation. Ce projet illustre mes
          compétences en Data Analysis, développement frontend et interprétation
          des données.
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

  header: {
    marginBottom: "30px"
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e3a8a"
  },

  subtitle: {
    color: "#6b7280"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  tools: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px"
  },

  badge: {
    background: "#3b82f6",
    color: "white",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px"
  }
};

export default About;