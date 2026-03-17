import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { colors, shadows } from '../utils/theme';

const formatPrix = (prix) => {
  if (!prix) return 'N/A';
  if (prix >= 1_000_000_000) return (prix / 1_000_000_000).toFixed(1) + ' Mrd';
  if (prix >= 1_000_000) return (prix / 1_000_000).toFixed(1) + ' M';
  if (prix >= 1_000) return (prix / 1_000).toFixed(0) + ' k';
  return prix + ' FCFA';
};

const KPICard = ({ title, value, icon, color = colors.primary, subValue }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: 180,  // ✅ FORCE LA MÊME HAUTEUR POUR TOUTES
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        boxShadow: shadows.medium,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: shadows.large,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Box sx={{ color: color, fontSize: 40 }}>{icon}</Box>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: color }}>
        {typeof value === 'number' ? formatPrix(value) : value}
      </Typography>
      {subValue && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {subValue}
        </Typography>
      )}
    </Paper>
  );
};

export default KPICard;