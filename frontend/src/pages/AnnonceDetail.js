// frontend/src/pages/AnnonceDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Grid, Typography, Box, Paper,
  CardMedia, Chip, Stack, Divider, Button, CircularProgress, Alert
} from '@mui/material';
import {
  LocationOn, Home, SquareFoot, CalendarToday,
  ArrowBack, Bed, Bathtub, MeetingRoom, OpenInNew
} from '@mui/icons-material';
import { colors, borderRadius } from '../utils/theme';
import { getAnnonces } from '../services/api';

const formatPrix = (prix) => {
  if (!prix) return 'N/A';
  if (prix >= 1_000_000_000) return (prix / 1_000_000_000).toFixed(1) + ' Mrd FCFA';
  if (prix >= 1_000_000) return (prix / 1_000_000).toFixed(1) + ' M FCFA';
  if (prix >= 1_000) return (prix / 1_000).toFixed(0) + ' k FCFA';
  return prix + ' FCFA';
};

const formatDate = (dateString) => {
  if (!dateString) return 'Date inconnue';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const AnnonceDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [annonce, setAnnonce] = useState(null);

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        setLoading(true);
        const response = await getAnnonces({ page_size: 100 });
        const allAnnonces = response.data.results || response.data;
        const found = allAnnonces.find(a => a.id === parseInt(id) || a.id === id);
        
        if (found) {
          setAnnonce(found);
        } else {
          setError('Annonce non trouvée');
        }
      } catch (err) {
        setError('Erreur lors du chargement de l\'annonce');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonce();
  }, [id]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error || !annonce) return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Alert severity="error" sx={{ mb: 2 }}>{error || 'Annonce non trouvée'}</Alert>
      <Button component={Link} to="/annonces" variant="contained" startIcon={<ArrowBack />}>
        Retour aux annonces
      </Button>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Bouton retour */}
      <Button 
        component={Link} 
        to="/annonces" 
        startIcon={<ArrowBack />} 
        sx={{ mb: 3, color: colors.primary }}
      >
        Retour aux annonces
      </Button>

      <Grid container spacing={4}>
        {/* Images */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ borderRadius: borderRadius.large, overflow: 'hidden' }}>
            {annonce.image_url ? (
              <CardMedia
                component="img"
                height="400"
                image={annonce.image_url}
                alt={annonce.titre}
                sx={{ objectFit: 'cover' }}
              />
            ) : (
              <Box sx={{ 
                height: 400, 
                bgcolor: colors.primaryLight, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Home sx={{ fontSize: 80, color: 'white' }} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Détails */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: borderRadius.large }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary }}>
              {annonce.titre}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
              <Chip 
                icon={<LocationOn />} 
                label={`${annonce.ville_nom || 'N/A'}${annonce.quartier_nom ? ` - ${annonce.quartier_nom}` : ''}`} 
                sx={{ bgcolor: colors.primary, color: 'white' }}
              />
              {annonce.type_bien_nom && (
                <Chip label={annonce.type_bien_nom} variant="outlined" />
              )}
              <Chip 
                label={annonce.type_operation || 'N/A'} 
                variant="outlined"
              />
            </Stack>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ color: colors.accent, fontWeight: 'bold' }}>
                {formatPrix(annonce.prix_fcfa)}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Caractéristiques */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {annonce.surface_m2 && (
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <SquareFoot sx={{ fontSize: 30, color: colors.primary }} />
                    <Typography variant="body2" color="textSecondary">Surface</Typography>
                    <Typography variant="h6">{annonce.surface_m2} m²</Typography>
                  </Box>
                </Grid>
              )}
              {annonce.nb_chambres && (
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Bed sx={{ fontSize: 30, color: colors.primary }} />
                    <Typography variant="body2" color="textSecondary">Chambres</Typography>
                    <Typography variant="h6">{annonce.nb_chambres}</Typography>
                  </Box>
                </Grid>
              )}
              {annonce.nb_salons && (
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <MeetingRoom sx={{ fontSize: 30, color: colors.primary }} />
                    <Typography variant="body2" color="textSecondary">Salons</Typography>
                    <Typography variant="h6">{annonce.nb_salons}</Typography>
                  </Box>
                </Grid>
              )}
              {annonce.nb_sdb && (
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Bathtub sx={{ fontSize: 30, color: colors.primary }} />
                    <Typography variant="body2" color="textSecondary">SDB</Typography>
                    <Typography variant="h6">{annonce.nb_sdb}</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            {/* Prix au m² */}
            {annonce.prix_m2_fcfa && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary">Prix au m²</Typography>
                <Typography variant="h6">{formatPrix(annonce.prix_m2_fcfa)}</Typography>
              </Box>
            )}

            {/* Date de publication */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarToday sx={{ fontSize: 18, color: colors.textLight }} />
              <Typography variant="body2" color="textSecondary">
                Publié le {formatDate(annonce.date_publication)}
              </Typography>
            </Box>

            {/* Bouton annonce originale */}
            {annonce.url && (
              <Button 
                variant="contained" 
                fullWidth
                sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentDark } }}
                href={annonce.url}
                target="_blank"
                endIcon={<OpenInNew />}
              >
                Voir l'annonce originale
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnnonceDetail;