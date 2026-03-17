import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { colors } from '../utils/theme';

const formatPrix = (prix) => {
  if (prix >= 1_000_000_000) return (prix / 1_000_000_000).toFixed(1) + ' Mrd';
  if (prix >= 1_000_000) return (prix / 1_000_000).toFixed(1) + ' M';
  if (prix >= 1_000) return (prix / 1_000).toFixed(0) + ' k';
  return prix + ' FCFA';
};

const TopQuartiersTable = ({ data, title }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.primary, '& th': { color: 'white', fontWeight: 'bold' } }}>
              <TableCell>#</TableCell>
              <TableCell>Quartier</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell align="right">Prix moyen</TableCell>
              <TableCell align="center">Annonces</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
              >
                <TableCell>
                  <Chip
                    label={item.classement || index + 1}
                    size="small"
                    sx={{
                      backgroundColor: index < 3 ? colors.accent : colors.primary,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </TableCell>
                <TableCell>{item.quartier}</TableCell>
                <TableCell>{item.ville}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {formatPrix(item.prix_moyen)}
                </TableCell>
                <TableCell align="center">{item.nb_annonces}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopQuartiersTable;