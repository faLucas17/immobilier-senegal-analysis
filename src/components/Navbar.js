import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>ImmoDashboard</div>

      <div style={styles.links}>
        <Link style={styles.link} to="/">Accueil</Link>
        <Link style={styles.link} to="/dashboard">Dashboard</Link>
        <Link style={styles.link} to="/analyse-prix">Analyse Prix</Link>
        <Link style={styles.link} to="/analyse-geo">Analyse Geo</Link>
        <Link style={styles.link} to="/about">À propos</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#1e3a8a",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    flexWrap: "wrap"
  },

  logo: {
    fontWeight: "bold",
    fontSize: "20px"
  },

  links: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  }
};

export default Navbar;