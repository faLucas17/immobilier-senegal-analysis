import React from "react";

function KPIs({ data }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Total annonces</h3>
        <p>{data.totalListings}</p>
      </div>

      <div style={styles.card}>
        <h3>Prix moyen</h3>
        <p>{data.averagePrice} FCFA</p>
      </div>

      <div style={styles.card}>
        <h3>Ville dominante</h3>
        <p>{data.topCity}</p>
      </div>

      <div style={styles.card}>
        <h3>Type dominant</h3>
        <p>{data.topPropertyType}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  card: {
    background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.2s"
  }
};

export default KPIs;