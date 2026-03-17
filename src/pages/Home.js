import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Analyse du marché immobilier au Sénégal
        </h1>

        <p style={styles.subtitle}>
          Visualisez les prix, explorez les quartiers et prenez de meilleures décisions grâce à la data.
        </p>

        <button style={styles.button} onClick={() => navigate("/dashboard")}>
          Accéder au Dashboard
        </button>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>📊 Analyse des prix</h3>
          <p>Visualisez les tendances des prix par ville et quartier.</p>
        </div>

        <div style={styles.card}>
          <h3>📍 Analyse géographique</h3>
          <p>Identifiez les zones les plus chères et les opportunités.</p>
        </div>

        <div style={styles.card}>
          <h3>⚙️ Filtres dynamiques</h3>
          <p>Personnalisez votre analyse selon vos critères.</p>
        </div>
      </div>

      {/* SECTION INFO */}
      <div style={styles.infoSection}>
        <h2>Pourquoi ce projet ?</h2>
        <p>
          Ce dashboard a été conçu pour transformer les données immobilières en
          informations claires et exploitables pour les utilisateurs, investisseurs
          et analystes.
        </p>
      </div>

    </div>
  );
}

/* STYLES PRO */
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "#f8fafc"
  },

  hero: {
    height: "80vh",
    background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px"
  },

  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "20px"
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "600px",
    marginBottom: "30px"
  },

  button: {
    padding: "12px 25px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    background: "#f59e0b",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s"
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "40px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    textAlign: "center"
  },

  infoSection: {
    padding: "40px",
    textAlign: "center"
  }
};

export default Home;