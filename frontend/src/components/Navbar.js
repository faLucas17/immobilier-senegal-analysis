import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container,
  IconButton, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { Home, Dashboard, Info, List as ListIcon, Menu as MenuIcon, Close } from '@mui/icons-material';
import { colors, shadows, transitions, borderRadius } from '../utils/theme';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Accueil', path: '/', icon: <Home /> },
  { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
  { label: 'Annonces', path: '/annonces', icon: <ListIcon /> },
  { label: 'À propos', path: '/about', icon: <Info /> },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="fixed" sx={{ background: colors.gradient.primary, boxShadow: shadows.large }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>

            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex', alignItems: 'center',
                textDecoration: 'none', color: 'white', flexGrow: 1,
                transition: transitions.fast,
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <Box
                component="img"
                src="/images/logo.png"
                alt="Logo"
                sx={{ width: 115, height: 70, mr: 1, borderRadius: 1, objectFit: 'contain' }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '0.5px', lineHeight: 1.2 }}>
                  Market Immo SN
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.9, display: { xs: 'none', sm: 'block' } }}>
                  Analyse du marché immobilier
                </Typography>
              </Box>
            </Box>

            {/* Menu desktop — caché sur mobile */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'white',
                    borderRadius: borderRadius.pill,
                    px: 2,
                    backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                    borderBottom: isActive(item.path) ? '2px solid white' : '2px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      transform: 'translateY(-2px)',
                    },
                    transition: transitions.fast,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Bouton hamburger — visible sur mobile uniquement */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
            >
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: colors.gradient.primary,
            color: 'white',
          }
        }}
      >
        {/* Header du drawer */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'white' }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>

        {/* Logo dans le menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pb: 2, gap: 1 }}>
          <Box
            component="img"
            src="/images/logo.png"
            alt="Logo"
            sx={{ width: 50, height: 50, objectFit: 'contain', bgcolor: 'white', borderRadius: 1, p: 0.5 }}
          />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
              Market Immo SN
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.65rem' }}>
              Marché immobilier sénégalais
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 1 }} />

        {/* Items du menu */}
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  py: 1.5,
                  px: 3,
                  backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderLeft: isActive(item.path) ? `4px solid ${colors.accent}` : '4px solid transparent',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
                  transition: transitions.fast,
                }}
              >
                <ListItemIcon sx={{ color: isActive(item.path) ? colors.accent : 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 700 : 400,
                    color: 'white',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mt: 1 }} />

        {/* Footer du drawer */}
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Typography variant="caption" sx={{ opacity: 0.6, color: 'white' }}>
            © 2026 Market Immo SN
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;