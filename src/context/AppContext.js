import React, { createContext, useState, useEffect } from "react";
import {
  fetchListings,
  fetchPrixParVille,
  fetchTopQuartiers,
  fetchEvolutionPrix
} from "../services/api";

/* Création du contexte */
export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  /* DATA */
  const [data, setData] = useState([]);
  const [prixVilleData, setPrixVilleData] = useState([]);
  const [quartiersData, setQuartiersData] = useState([]);
  const [evolutionData, setEvolutionData] = useState([]);

  /* FILTRES */
  const [ville, setVille] = useState("");
  const [types, setTypes] = useState([]);
  const [prixMax, setPrixMax] = useState(1500000);
  const [rechercheQuartier, setRechercheQuartier] = useState("");

  /* LOADING */
  const [loading, setLoading] = useState(true);

  /* API */
  useEffect(() => {
    Promise.all([
      fetchListings(),
      fetchPrixParVille(),
      fetchTopQuartiers(),
      fetchEvolutionPrix()
    ]).then(([listings, prixVille, quartiers, evolution]) => {
      setData(listings);
      setPrixVilleData(prixVille);
      setQuartiersData(quartiers);
      setEvolutionData(evolution);
      setLoading(false);
    });
  }, []);

  /* FILTER LOGIC */
  const filteredData = data.filter((item) => {
    const villeMatch = ville === "" || item.ville === ville;
    const typeMatch = types.length === 0 || types.includes(item.type);
    const prixMatch = item.prix <= prixMax;
    const quartierMatch = item.quartier
      .toLowerCase()
      .includes(rechercheQuartier.toLowerCase());

    return villeMatch && typeMatch && prixMatch && quartierMatch;
  });

  return (
    <AppContext.Provider
      value={{
        data,
        prixVilleData,
        quartiersData,
        evolutionData,
        filteredData,

        ville,
        setVille,
        types,
        setTypes,
        prixMax,
        setPrixMax,
        rechercheQuartier,
        setRechercheQuartier,

        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};