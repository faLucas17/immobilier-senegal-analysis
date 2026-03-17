import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 - GROUPE1 | Dashboard Immobilier</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "40px",
    padding: "20px",
    textAlign: "center",
    background: "#1e3a8a",
    color: "white"
  }
};

export default Footer;