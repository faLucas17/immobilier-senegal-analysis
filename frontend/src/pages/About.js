import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import { colors } from '../utils/theme';
import { Code, Storage, BarChart, Dashboard } from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary }}>
        À propos du projet
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: colors.primary }}>
              🎯 Objectif
            </Typography>
            <Typography paragraph>
              Ce projet a été réalisé dans le cadre du hackathon JeemaCoder 2026. L'objectif était de scraper les données immobilières des sites d'annonces sénégalais, de les analyser, et de créer un dashboard interactif pour visualiser les tendances du marché.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Storage sx={{ fontSize: 40, color: colors.primary, mr: 2 }} />
              <Typography variant="h5" sx={{ color: colors.primary }}>
                Backend
              </Typography>
            </Box>
            <Typography component="div">
              <ul>
                <li>Django 6.0 & Django REST Framework</li>
                <li>Base de données SQLite</li>
                <li>API REST avec 10+ endpoints</li>
                <li>Documentation Swagger/OpenAPI</li>
                <li>4 313 annonces importées</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Code sx={{ fontSize: 40, color: colors.secondary, mr: 2 }} />
              <Typography variant="h5" sx={{ color: colors.secondary }}>
                Frontend
              </Typography>
            </Box>
            <Typography component="div">
              <ul>
                <li>React 18 + Material UI</li>
                <li>Graphiques Recharts</li>
                <li>Design responsive mobile/desktop</li>
                <li>Navigation React Router</li>
                <li>Appels API avec Axios</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BarChart sx={{ fontSize: 40, color: colors.accent, mr: 2 }} />
              <Typography variant="h5" sx={{ color: colors.accent }}>
                Analyses
              </Typography>
            </Box>
            <Typography component="div">
              <ul>
                <li>Prix moyen par ville et quartier</li>
                <li>Top quartiers les plus chers</li>
                <li>Évolution mensuelle des prix</li>
                <li>Prix au m² par zone</li>
                <li>Statistiques globales</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Dashboard sx={{ fontSize: 40, color: colors.info, mr: 2 }} />
              <Typography variant="h5" sx={{ color: colors.info }}>
                Équipe
              </Typography>
            </Box>
            <Typography component="div">
              <ul>
                <li>Fatou FALL (Lead Dev)</li>
                <li>Gora DIALLO (Backend)</li>
                <li>Dieynaba BA (Analyses)</li>
                <li>Ndèye Fatou MBOW (Design)</li>
                <li>Oumar KANE (Data)</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;