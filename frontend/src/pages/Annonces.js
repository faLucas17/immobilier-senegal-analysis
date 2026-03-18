// frontend/src/pages/Annonces.js

import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Paper, Card, CardContent,
  CardMedia, TextField, MenuItem, Select, FormControl, InputLabel,
  Pagination, CircularProgress, Alert, Chip, Stack,
  Button, FormHelperText
} from '@mui/material';
import { Search, LocationOn, Home, SquareFoot} from '@mui/icons-material';  // ← Retiré AttachMoney
import { colors, shadows, borderRadius } from '../utils/theme';
import { getAnnonces, getFiltres } from '../services/api';
import { useNavigate } from 'react-router-dom';

const formatPrix = (prix) => {
  if (!prix) return 'N/A';
  if (prix >= 1_000_000_000) return (prix / 1_000_000_000).toFixed(1) + ' Mrd FCFA';
  if (prix >= 1_000_000) return (prix / 1_000_000).toFixed(1) + ' M FCFA';
  if (prix >= 1_000) return (prix / 1_000).toFixed(0) + ' k FCFA';
  return prix + ' FCFA';
};

const AnnoncesPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [annonces, setAnnonces] = useState([]);
  const [filtres, setFiltres] = useState({ 
    villes: [], 
    types_bien: [], 
    operations: [] 
  });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    ville: '',
    quartier: '',
    type_bien: '',
    operation: '',
    prix_min: '',
    prix_max: '',
  });

  const fetchAnnonces = async () => {
    try {
      setLoading(true);
      const cleanFilters = {};
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key] !== '') {
          cleanFilters[key] = filters[key];
        }
      });
      
      const params = { page, page_size: 12, ...cleanFilters };
      const response = await getAnnonces(params);
      setAnnonces(response.data.results || response.data);
      setTotal(response.data.count || response.data.length);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des annonces');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiltres = async () => {
    try {
      const response = await getFiltres();
      setFiltres(response.data);
    } catch (err) {
      console.error('Erreur chargement filtres', err);
    }
  };

 useEffect(() => {
  fetchFiltres();
}, []);

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchAnnonces();
}, [page]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setPage(1);
    fetchAnnonces();
  };

  const handleReset = () => {
    setFilters({
      ville: '',
      quartier: '',
      type_bien: '',
      operation: '',
      prix_min: '',
      prix_max: '',
    });
    setPage(1);
    setTimeout(() => fetchAnnonces(), 100); 
  };

  if (loading && annonces.length === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Titre */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary, mb: 3 }}>
        📋 Liste des annonces immobilières
      </Typography>

      {/* Filtres */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: borderRadius.large }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Search /> Filtres de recherche
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Ville"
              value={filters.ville}
              onChange={(e) => handleFilterChange('ville', e.target.value)}
              placeholder="Ex: Dakar"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Quartier"
              value={filters.quartier}
              onChange={(e) => handleFilterChange('quartier', e.target.value)}
              placeholder="Ex: Almadies"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="type-label">Type de bien</InputLabel>
              <Select
                labelId="type-label"
                value={filters.type_bien}
                label="Type de bien"
                onChange={(e) => handleFilterChange('type_bien', e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) return <em> </em>;
                  return selected;
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value="">Tous les types</MenuItem>
                {filtres.types_bien && filtres.types_bien.length > 0 ? (
                  filtres.types_bien.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))
                ) : (
                  [
                    <MenuItem key="appart" value="APPARTEMENT">Appartement</MenuItem>,
                    <MenuItem key="villa" value="VILLA">Villa</MenuItem>,
                    <MenuItem key="terrain" value="TERRAIN">Terrain</MenuItem>,
                    <MenuItem key="commercial" value="COMMERCIAL">Commercial</MenuItem>,
                    <MenuItem key="autre" value="AUTRE">Autre</MenuItem>
                  ]
                )}
              </Select>
              <FormHelperText>Sélectionnez un type</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="operation-label">Opération</InputLabel>
              <Select
                labelId="operation-label"
                value={filters.operation}
                label="Opération"
                onChange={(e) => handleFilterChange('operation', e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) return <em> </em>;
                  return selected;
                }}
              >
                <MenuItem value="">Toutes les opérations</MenuItem>
                {filtres.operations && filtres.operations.length > 0 ? (
                  filtres.operations.map(op => (
                    <MenuItem key={op} value={op}>{op}</MenuItem>
                  ))
                ) : (
                  [
                    <MenuItem key="vente" value="VENTE">Vente</MenuItem>,
                    <MenuItem key="location" value="LOCATION">Location</MenuItem>,
                    <MenuItem key="location_meublee" value="LOCATION_MEUBLEE">Location meublée</MenuItem>
                  ]
                )}
              </Select>
              <FormHelperText>Vente / Location</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Prix min (FCFA)"
              value={filters.prix_min}
              onChange={(e) => handleFilterChange('prix_min', e.target.value)}
              placeholder="Min"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Prix max (FCFA)"
              value={filters.prix_max}
              onChange={(e) => handleFilterChange('prix_max', e.target.value)}
              placeholder="Max"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
              sx={{ height: '40px', bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentDark } }}
            >
              Rechercher
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleReset}
              sx={{ height: '40px', borderColor: colors.primary, color: colors.primary }}
            >
              Réinitialiser
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Résultats */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1">
          {total} annonce{total > 1 ? 's' : ''} trouvée{total > 1 ? 's' : ''}
        </Typography>
        {loading && <CircularProgress size={20} />}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={6}>
        {annonces.length > 0 ? (
          annonces.map((annonce) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={annonce.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: shadows.medium,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: shadows.large,
                  }
                }}
                onClick={() => navigate(`/annonce/${annonce.id}`)}
              >
                {annonce.image_url ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={annonce.image_url}
                    alt={annonce.titre}
                    sx={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Box sx={{ height: 140, bgcolor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Home sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '0.9rem', height: 40, overflow: 'hidden' }}>
                    {annonce.titre?.substring(0, 50)}...
                  </Typography>
                  
                  <Stack direction="row" spacing={0.5} sx={{ mb: 1, flexWrap: 'wrap' }}>
                    {annonce.ville_nom && (
                      <Chip 
                        icon={<LocationOn />} 
                        label={annonce.ville_nom} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    )}
                    {annonce.quartier_nom && (
                      <Chip 
                        label={annonce.quartier_nom} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    )}
                  </Stack>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ color: colors.accent, fontWeight: 'bold', fontSize: '1rem' }}>
                      {formatPrix(annonce.prix_fcfa)}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    {annonce.surface_m2 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SquareFoot sx={{ fontSize: 14, color: colors.textLight }} />
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{annonce.surface_m2} m²</Typography>
                      </Box>
                    )}
                    {annonce.nb_chambres && (
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>• {annonce.nb_chambres} ch.</Typography>
                    )}
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {annonce.type_bien_nom && (
                      <Chip 
                        label={annonce.type_bien_nom} 
                        size="small" 
                        sx={{ bgcolor: colors.primaryLight, color: 'white', fontSize: '0.7rem' }}
                      />
                    )}
                    <Chip 
                      label={annonce.type_operation || 'N/A'} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                Aucune annonce ne correspond à vos critères
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 2, color: colors.accent }}>
                Réinitialiser les filtres
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      {total > 12 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={Math.ceil(total / 12)} 
            page={page} 
            onChange={(e, val) => setPage(val)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default AnnoncesPage;