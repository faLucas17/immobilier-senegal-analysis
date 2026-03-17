import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getAnnonces = (params) => api.get('/annonces/', { params });
export const getStatistiques = () => api.get('/statistiques/');
export const getPrixMoyenVille = () => api.get('/prix-moyen/ville/');
export const getQuartiersChers = () => api.get('/quartiers/chers/');
export const getQuartiersAccessibles = () => api.get('/quartiers/accessibles/');
export const getEvolutionPrix = () => api.get('/evolution-prix/');
export const getPrixM2 = () => api.get('/prix/m2/');
export const getFiltres = () => api.get('/filtres/');

export default api;