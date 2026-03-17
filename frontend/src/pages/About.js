import React from 'react';
import { Container, Typography, Paper, Grid, Box, Avatar, Divider } from '@mui/material';
import { colors } from '../utils/theme';
import { 
  Code, Storage, BarChart, Dashboard, 
  Home, LocationOn, TrendingUp, SmartToy 
} from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* En-tête avec le vrai logo du site */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
        {/* Logo PNG depuis public/images */}
        <Box
          component="img"
          src="/images/logo.png"
          alt="Market Immo SN Logo"
          sx={{
            width: 100,
            height: 100,
            objectFit: 'contain',
          }}
        />
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 800, color: colors.primary }}>
            Market Immo SN
          </Typography>
          <Typography variant="h5" sx={{ color: colors.textLight }}>
            Votre observatoire du marché immobilier sénégalais
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Mission */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: colors.primary, fontWeight: 'bold' }}>
          Notre Mission
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
          <strong>Market Immo SN</strong> est une plateforme d'analyse immobilière dédiée au marché sénégalais. 
          Notre mission est de fournir aux acheteurs, vendeurs, investisseurs et professionnels de l'immobilier 
          des données fiables et des analyses pertinentes pour éclairer leurs décisions.
        </Typography>
        <Typography variant="body1">
          Basé sur plus de <strong>4 300 annonces</strong> collectées sur Expat-Dakar.com, notre outil vous permet 
          de comprendre les tendances des prix, d'identifier les quartiers les plus chers et les plus accessibles, 
          et de suivre l'évolution du marché en temps réel.
        </Typography>
      </Paper>

      {/* Fonctionnalités principales */}
      <Typography variant="h4" gutterBottom sx={{ color: colors.primary, fontWeight: 'bold', mb: 3 }}>
        ✨ Ce que nous offrons
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', borderRadius: 2 }}>
            <Home sx={{ fontSize: 60, color: colors.primary, mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Prix par quartier
            </Typography>
            <Typography color="textSecondary">
              Comparez les prix moyens dans tous les quartiers de Dakar et du Sénégal.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', borderRadius: 2 }}>
            <LocationOn sx={{ fontSize: 60, color: colors.secondary, mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Top quartiers
            </Typography>
            <Typography color="textSecondary">
              Identifiez les quartiers les plus chers et les plus accessibles.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', borderRadius: 2 }}>
            <TrendingUp sx={{ fontSize: 60, color: colors.accent, mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Évolution des prix
            </Typography>
            <Typography color="textSecondary">
              Suivez l'évolution des prix mois par mois depuis 2021.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Technologies utilisées */}
      <Typography variant="h4" gutterBottom sx={{ color: colors.primary, fontWeight: 'bold', mb: 3 }}>
        🛠️ Technologies
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <Storage sx={{ fontSize: 30, color: colors.primary }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Backend
              </Typography>
            </Box>
            <Typography variant="body2" component="div">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Django & Django REST Framework</li>
                <li>Base de données SQLite</li>
                <li>API REST avec 8 endpoints</li>
                <li>Documentation Swagger</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <Code sx={{ fontSize: 30, color: colors.secondary }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Frontend
              </Typography>
            </Box>
            <Typography variant="body2" component="div">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>React 18 + Material UI</li>
                <li>Graphiques Recharts</li>
                <li>Design responsive</li>
                <li>Agent IA conversationnel</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <BarChart sx={{ fontSize: 30, color: colors.accent }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Données
              </Typography>
            </Box>
            <Typography variant="body2" component="div">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>4 313 annonces immobilières</li>
                <li>55 quartiers analysés</li>
                <li>9 types de biens</li>
                <li>Période 2021-2026</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Équipe de développement */}
      <Typography variant="h4" gutterBottom sx={{ color: colors.primary, fontWeight: 'bold', mb: 3 }}>
        👥 L'équipe
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2.4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: colors.primary, width: 60, height: 60, mx: 'auto', mb: 1 }}>FF</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Fatou FALL</Typography>
              <Typography variant="caption" color="textSecondary">Lead Dev</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: colors.secondary, width: 60, height: 60, mx: 'auto', mb: 1 }}>GD</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Gora DIALLO</Typography>
              <Typography variant="caption" color="textSecondary">Backend</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: colors.accent, width: 60, height: 60, mx: 'auto', mb: 1 }}>DB</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Dieynaba BA</Typography>
              <Typography variant="caption" color="textSecondary">Analyses</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: colors.info, width: 60, height: 60, mx: 'auto', mb: 1 }}>NM</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Ndèye Fatou MBOW</Typography>
              <Typography variant="caption" color="textSecondary">Design</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: colors.success, width: 60, height: 60, mx: 'auto', mb: 1 }}>OK</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Oumar KANE</Typography>
              <Typography variant="caption" color="textSecondary">Data</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Agent IA */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: colors.primaryLight, color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <SmartToy sx={{ fontSize: 40 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Assistant IA intégré
          </Typography>
        </Box>
        <Typography variant="body1">
          Posez vos questions à notre agent conversationnel ! Il peut vous renseigner sur :
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}>
            <Typography>• Prix moyen par ville</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>• Quartiers les plus chers</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>• Nombre d'annonces</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;