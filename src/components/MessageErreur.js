import React from "react";

function MessageErreur({ message }) {
  return (
    <div style={styles.container}>
      <h3>Erreur</h3>
      <p>{message}</p>
    </div>
  );
}
<MessageErreur message="Impossible de charger les données immobilières." />
const styles = {
  container: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "15px",
    borderRadius: "8px",
    margin: "20px 0",
    border: "1px solid #fca5a5",
    textAlign: "center"
  }
};

export default MessageErreur;