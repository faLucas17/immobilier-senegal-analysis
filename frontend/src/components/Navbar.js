import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';  // Retirez Avatar
import { Home, Dashboard, Info } from '@mui/icons-material';
import { colors, shadows, transitions, borderRadius } from '../utils/theme';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: colors.gradient.primary,
        boxShadow: shadows.large,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo avec image PNG */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'white',
              flexGrow: 1,
              '&:hover': {
                transform: 'scale(1.02)',
              },
              transition: transitions.fast,
            }}
          >
            {/* */}
            <Box
              component="img"
              src="/images/logo.png"  // Chemin vers votre logo
              alt="Logo"
              sx={{
                width: 115,
                height: 70,
                mr: 1,
                borderRadius: 1,  // Optionnel: si vous voulez des bords arrondis
                objectFit: 'contain',
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  lineHeight: 1.2,
                }}
              >
                Market Immo SN
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  opacity: 0.9,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Analyse du marché immobilier
              </Typography>
            </Box>
          </Box>

          {/* Menu de navigation (inchangé) */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)',
                },
                transition: transitions.fast,
                borderRadius: borderRadius.pill,
                px: 2,
              }}
              startIcon={<Home />}
            >
              Accueil
            </Button>
            <Button
              component={Link}
              to="/dashboard"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)',
                },
                transition: transitions.fast,
                borderRadius: borderRadius.pill,
                px: 2,
              }}
              startIcon={<Dashboard />}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)',
                },
                transition: transitions.fast,
                borderRadius: borderRadius.pill,
                px: 2,
              }}
              startIcon={<Info />}
            >
              À propos
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;