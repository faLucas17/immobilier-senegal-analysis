import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

/* =========================
   DATA PRINCIPALE
========================= */
export const fetchListings = async () => {
  const response = await api.get("/posts");

  return response.data.slice(0, 20).map((item, index) => ({
    ville: ["Dakar", "Thiès", "Mbour", "Saint-Louis"][index % 4],
    quartier: item.title.substring(0, 10),
    type: ["Appartement", "Maison", "Terrain"][index % 3],
    prix: Math.floor(Math.random() * 1000000) + 100000,
  }));
};

/* =========================
   PRIX PAR VILLE
========================= */
export const fetchPrixParVille = async () => {
  const data = await fetchListings();

  const result = {};

  data.forEach((item) => {
    if (!result[item.ville]) {
      result[item.ville] = [];
    }
    result[item.ville].push(item.prix);
  });

  return Object.keys(result).map((ville) => ({
    ville,
    prix:
      result[ville].reduce((a, b) => a + b, 0) /
      result[ville].length,
  }));
};

/* =========================
   TOP QUARTIERS
========================= */
export const fetchTopQuartiers = async () => {
  const data = await fetchListings();

  return data.sort((a, b) => b.prix - a.prix).slice(0, 5);
};

/* =========================
   EVOLUTION PRIX
========================= */
export const fetchEvolutionPrix = async () => {
  const data = await fetchListings();

  return data.map((item, index) => ({
    mois: `M${index + 1}`,
    prix: item.prix,
  }));
};

export default api;