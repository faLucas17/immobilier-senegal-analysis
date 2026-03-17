import React from 'react';
import { Container, Typography, Grid, Paper, Box, Button, Card, CardContent, CardActions } from '@mui/material';
import { ArrowForward, Home as HomeIcon, LocationOn, TrendingUp, ChevronRight } from '@mui/icons-material';
import { colors, shadows, borderRadius, transitions } from '../utils/theme';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay, bgColor = colors.primary }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: borderRadius.large,
        boxShadow: shadows.card,
        transition: transitions.normal,
        animation: 'fadeInUp 0.5s ease-out',
        animationDelay: `${delay}s`,
        backgroundColor: bgColor,  // ← Fond personnalisable
        color: 'white',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: shadows.hover,
          backgroundColor: colors.primaryLight,  // ← MÊME COULEUR AU SURVOL POUR TOUTES
          '& .MuiSvgIcon-root': {
            color: colors.accent,
          },
          '& .MuiTypography-root': {
            color: 'white',
          },
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          p: 4,
          transition: transitions.normal,
        }}
      >
        <Box
          sx={{
            mb: 3,
            '& .MuiSvgIcon-root': {
              fontSize: 60,
              color: 'white',
              transition: transitions.normal,
            },
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          component={Link}
          to="/dashboard"
          size="small"
          sx={{ 
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              backgroundColor: colors.accent,
              color: 'white',
            }
          }}
          endIcon={<ChevronRight />}
        >
          Voir plus
        </Button>
      </CardActions>
    </Card>
  );
};

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section avec image de fond */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.primary}dd 0%, ${colors.secondary}dd 100%), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 15,
          mt: 0,
          mb: 3,
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            {/* Colonne de gauche - Texte et bouton */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                  mb: 0.5,
                }}
              >
                Analyse du Marché Immobilier
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  mb: 1,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                au Sénégal
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 1.5,
                  maxWidth: '550px',
                  fontSize: '0.95rem',
                  lineHeight: 1.4,
                  opacity: 0.95,
                }}
              >
                Découvrez les tendances des prix, les quartiers les plus chers et 
                les opportunités du marché immobilier sénégalais basées sur plus de 
                4 300 annonces analysées.
              </Typography>
              <Button
                component={Link}
                to="/dashboard"
                variant="contained"
                size="medium"
                sx={{
                  background: colors.accent,
                  '&:hover': {
                    background: colors.accentDark,
                    transform: 'translateY(-2px)',
                    boxShadow: shadows.large,
                  },
                  color: 'white',
                  fontSize: '1rem',
                  py: 1,
                  px: 3,
                  borderRadius: borderRadius.pill,
                  boxShadow: shadows.button,
                  transition: transitions.fast,
                }}
                endIcon={<ArrowForward />}
              >
                Voir le Dashboard
              </Button>
            </Grid>

            {/* Colonne de droite - Statistiques */}
            <Grid item xs={12} md={5}>
              <Paper
                sx={{
                  p: 2,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: borderRadius.large,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                  En chiffres
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Typography variant="h5" sx={{ color: colors.accent, fontWeight: 'bold', fontSize: '1.5rem' }}>
                      4.3k
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'white' }}>Annonces</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" sx={{ color: colors.accent, fontWeight: 'bold', fontSize: '1.5rem' }}>
                      55
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'white' }}>Quartiers</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" sx={{ color: colors.accent, fontWeight: 'bold', fontSize: '1.5rem' }}>
                      5
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'white' }}>Types</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" sx={{ color: colors.accent, fontWeight: 'bold', fontSize: '1.5rem' }}>
                      12
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'white' }}>Villes</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Fonctionnalités */}
      <Container maxWidth="lg" sx={{ py: 4, mb: 4 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: colors.primary,
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Fonctionnalités
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{ color: colors.textLight, mb: 4, maxWidth: '700px', mx: 'auto', fontSize: '1rem' }}
        >
          Explorez notre dashboard illustratif pour découvrir toutes les analyses
        </Typography>

        {/* Première ligne : 2 fonctionnalités */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<HomeIcon />}
              title="Prix par quartier"
              description="Comparez les prix moyens dans tous les quartiers de Dakar et du Sénégal avec des graphiques interactifs."
              delay={0}
              bgColor={colors.primary}  // Bleu
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<LocationOn />}
              title="Top quartiers"
              description="Identifiez les quartiers les plus chers et les plus accessibles avec notre classement détaillé."
              delay={0.1}
              bgColor="#2E7D32"  // ← Vert foncé demandé
            />
          </Grid>
        </Grid>

        {/* Deuxième ligne : 1 fonctionnalité centrée */}
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<TrendingUp />}
              title="Évolution des prix"
              description="Suivez l'évolution des prix mois par mois depuis 2021 et anticipez les tendances du marché."
              delay={0.2}
              bgColor={colors.primary}  // Bleu
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;