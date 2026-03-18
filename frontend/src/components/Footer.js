// frontend/src/components/Footer.js

import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { 
  Facebook, Twitter, LinkedIn, Instagram, 
  Email, Phone, LocationOn 
} from '@mui/icons-material';
import { colors, shadows } from '../utils/theme';  // ← AJOUT DE shadows
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: colors.gradient.primary,
        color: 'white',
        mt: 'auto',
        py: 4,
        boxShadow: shadows.large,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo et description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src="/images/logo.png"
                alt="Market Immo SN"
                sx={{
                  width: 50,
                  height: 50,
                  mr: 1,
                  objectFit: 'contain',
                  bgcolor: 'white',
                  borderRadius: 1,
                  p: 0.5,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Market Immo SN
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Votre observatoire du marché immobilier sénégalais. 
              Données fiables, analyses pertinentes, décisions éclairées.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                href="https://facebook.com" 
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: colors.accent } }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                href="https://twitter.com" 
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: colors.accent } }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                href="https://linkedin.com" 
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: colors.accent } }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                href="https://instagram.com" 
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: colors.accent } }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Liens rapides */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: colors.accent }}>
              Liens
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                component={RouterLink} 
                to="/" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: colors.accent } }}
              >
                Accueil
              </Link>
              <Link 
                component={RouterLink} 
                to="/dashboard" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: colors.accent } }}
              >
                Dashboard
              </Link>
              <Link 
                component={RouterLink} 
                to="/annonces" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: colors.accent } }}
              >
                Annonces
              </Link>
              <Link 
                component={RouterLink} 
                to="/about" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: colors.accent } }}
              >
                À propos
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: colors.accent }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, color: colors.accent }} />
                <Typography variant="body2">Dakar, Sénégal</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20, color: colors.accent }} />
                <Link 
                  href="mailto:contact@marketimmo.sn" 
                  color="inherit" 
                  underline="hover"
                  sx={{ '&:hover': { color: colors.accent } }}
                >
                  contact@marketimmo.sn
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, color: colors.accent }} />
                <Link 
                  href="tel:+221778228460" 
                  color="inherit" 
                  underline="hover"
                  sx={{ '&:hover': { color: colors.accent } }}
                >
                  +221 77 822 84 60
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: colors.accent }}>
              Restez informé
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Recevez les dernières analyses du marché immobilier.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                4 313 annonces analysées
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                55 quartiers • 5 types de biens
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                Données 2021-2026
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Copyright CENTRÉ */}
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} Market Immo SN. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;