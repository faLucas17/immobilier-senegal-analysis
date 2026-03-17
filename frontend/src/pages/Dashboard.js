import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, CircularProgress, Alert, Paper,
  Divider, Chip, useMediaQuery, useTheme as useMuiTheme
} from '@mui/material';
import {
  AttachMoney, Home, TrendingUp, SquareFoot, LocationCity,
  CalendarToday, Star, EmojiEvents, Apartment
} from '@mui/icons-material';
import KPICard from '../components/KPICard';
import CustomBarChart from '../components/BarChart';
import CustomLineChart from '../components/LineChart';
import TopQuartiersTable from '../components/TopQuartiersTable';
import {
  getStatistiques,
  getPrixMoyenVille,
  getQuartiersChers,
  getEvolutionPrix,
} from '../services/api';
import { colors, shadows, borderRadius, transitions } from '../utils/theme';

// ─── Mapping ville → région ──────────────────────────────────────────────────
const VILLE_TO_REGION = {
  'Dakar': 'dakar', 'Rufisque': 'dakar', 'Diamniadio': 'dakar',
  'Thiès': 'thies', 'Mbour': 'thies',
  'Saint-Louis': 'saint-louis',
  'Louga': 'louga',
  'Matam': 'matam',
  'Tambacounda': 'tambacounda',
  'Kédougou': 'kedougou',
  'Kolda': 'kolda',
  'Sédhiou': 'sedhiou',
  'Ziguinchor': 'ziguinchor',
  'Kaolack': 'kaolack',
  'Kaffrine': 'kaffrine',
  'Fatick': 'fatick',
  'Touba': 'diourbel',
};

const REGION_NAMES = {
  'dakar': 'Dakar', 'thies': 'Thiès', 'saint-louis': 'Saint-Louis',
  'louga': 'Louga', 'matam': 'Matam', 'tambacounda': 'Tambacounda',
  'kedougou': 'Kédougou', 'kolda': 'Kolda', 'sedhiou': 'Sédhiou',
  'ziguinchor': 'Ziguinchor', 'kaolack': 'Kaolack', 'kaffrine': 'Kaffrine',
  'fatick': 'Fatick', 'diourbel': 'Diourbel',
};

// Coordonnées des régions (paths SVG précis)
const REGIONS_SVG = [
  {
    id: 'saint-louis',
    path: 'M152,22 L200,20 L225,32 L232,58 L226,84 L212,98 L192,102 L172,97 L156,82 L150,62 Z',
    tx: 188, ty: 62,
  },
  {
    id: 'louga',
    path: 'M102,68 L150,62 L156,82 L172,97 L166,122 L146,137 L122,142 L102,132 L90,112 L92,88 Z',
    tx: 128, ty: 105,
  },
  {
    id: 'matam',
    path: 'M192,102 L226,84 L258,92 L278,112 L272,142 L247,157 L217,152 L196,137 L192,117 Z',
    tx: 235, ty: 128,
  },
  {
    id: 'diourbel',
    path: 'M122,142 L146,137 L166,122 L172,97 L192,102 L196,137 L181,157 L161,162 L139,157 L122,152 Z',
    tx: 158, ty: 142,
  },
  {
    id: 'thies',
    path: 'M70,150 L102,132 L122,142 L122,152 L139,157 L136,177 L119,192 L96,197 L73,182 L63,167 Z',
    tx: 100, ty: 168,
  },
  {
    id: 'dakar',
    path: 'M46,167 L63,167 L73,182 L69,196 L54,202 L40,193 L38,180 Z',
    tx: 55, ty: 185,
  },
  {
    id: 'fatick',
    path: 'M96,197 L119,192 L136,177 L139,157 L161,162 L166,187 L156,212 L131,227 L106,222 L91,212 Z',
    tx: 128, ty: 197,
  },
  {
    id: 'kaolack',
    path: 'M139,157 L181,157 L196,137 L217,152 L217,177 L201,197 L176,207 L156,212 L166,187 L161,162 Z',
    tx: 181, ty: 180,
  },
  {
    id: 'kaffrine',
    path: 'M181,157 L217,152 L247,157 L262,177 L249,202 L226,212 L201,212 L186,197 L201,197 L217,177 Z',
    tx: 222, ty: 185,
  },
  {
    id: 'tambacounda',
    path: 'M217,152 L247,157 L272,142 L297,157 L312,182 L302,217 L277,237 L250,242 L226,232 L216,212 L226,212 L249,202 L262,177 L247,157 Z',
    tx: 265, ty: 198,
  },
  {
    id: 'kolda',
    path: 'M156,212 L176,207 L201,212 L216,212 L226,232 L221,257 L196,272 L166,270 L149,254 L149,232 Z',
    tx: 186, ty: 240,
  },
  {
    id: 'sedhiou',
    path: 'M106,222 L131,227 L149,232 L149,254 L136,267 L113,270 L93,257 L91,237 Z',
    tx: 120, ty: 247,
  },
  {
    id: 'ziguinchor',
    path: 'M69,257 L93,257 L113,270 L109,287 L89,294 L66,290 L56,274 L61,260 Z',
    tx: 83, ty: 275,
  },
  {
    id: 'kedougou',
    path: 'M250,242 L277,237 L302,217 L320,237 L314,267 L287,280 L260,274 L244,260 Z',
    tx: 283, ty: 254,
  },
];

// ─── Composant Carte Sénégal ─────────────────────────────────────────────────
const CarteSenegal = ({ quartiersChers }) => {
  const [hovered, setHovered] = useState(null);

  // Demande par ville
  const villeCount = {};
  quartiersChers.forEach(q => {
    if (q.ville) villeCount[q.ville] = (villeCount[q.ville] || 0) + (q.nb_annonces || 1);
  });

  // Demande par région
  const regionDemande = {};
  Object.entries(VILLE_TO_REGION).forEach(([ville, region]) => {
    regionDemande[region] = (regionDemande[region] || 0) + (villeCount[ville] || 0);
  });

  const maxD = Math.max(...Object.values(regionDemande), 1);

  const getColor = (id) => {
    const d = regionDemande[id] || 0;
    const r = d / maxD;
    if (r === 0)   return '#dcedc8';
    if (r < 0.15)  return '#aed581';
    if (r < 0.35)  return '#66bb6a';
    if (r < 0.55)  return '#ffa726';
    if (r < 0.75)  return '#ef6c00';
    return '#c62828';
  };

  const LEGEND = [
    { color: '#dcedc8', label: 'Aucune' },
    { color: '#aed581', label: 'Très faible' },
    { color: '#66bb6a', label: 'Faible' },
    { color: '#ffa726', label: 'Moyenne' },
    { color: '#ef6c00', label: 'Élevée' },
    { color: '#c62828', label: 'Maximale' },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 820, mx: 'auto', position: 'relative' }}>
      <svg
        viewBox="0 0 370 315"
        style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.12))' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b3e5fc" />
            <stop offset="100%" stopColor="#81d4fa" />
          </linearGradient>
          <filter id="glow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#fff" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Fond océan */}
        <rect width="370" height="315" fill="url(#ocean)" rx="14" />

        {/* Titre */}
        <text x="185" y="15" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0d47a1" letterSpacing="0.5">
          SÉNÉGAL — Demande immobilière par région
        </text>

        {/* Régions */}
        {REGIONS_SVG.map(({ id, path, tx, ty }) => {
          const isHov = hovered === id;
          const col = getColor(id);
          const nb = regionDemande[id] || 0;
          return (
            <g key={id}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={path}
                fill={col}
                stroke="white"
                strokeWidth={isHov ? 2.5 : 1.2}
                style={{
                  transition: 'all 0.2s',
                  filter: isHov ? 'url(#glow) brightness(1.15)' : 'none',
                }}
              />
              {/* Nom région */}
              <text x={tx} y={ty} textAnchor="middle" fontSize={id === 'dakar' ? 4.5 : 6.5}
                fontWeight="600" fill="#1a237e" style={{ pointerEvents: 'none' }}>
                {REGION_NAMES[id]}
              </text>
              {/* Nb annonces si > 0 */}
              {nb > 0 && (
                <text x={tx} y={ty + 9} textAnchor="middle" fontSize="5.5"
                  fontWeight="bold" fill="#b71c1c" style={{ pointerEvents: 'none' }}>
                  {nb}
                </text>
              )}
            </g>
          );
        })}

        {/* Gambie */}
        <path d="M106,222 L156,216 L176,220 L176,230 L156,234 L106,230 Z"
          fill="#e1f5fe" stroke="#81d4fa" strokeWidth="1" />
        <text x="141" y="228" fontSize="5" fill="#0277bd" textAnchor="middle" fontStyle="italic">Gambie</text>

        {/* Drapeau Sénégal */}
        <g transform="translate(295, 20)">
          <rect width="57" height="36" fill="white" rx="3" stroke="#ddd" strokeWidth="0.5" />
          <rect x="0" y="0" width="19" height="36" fill="#00853F" rx="2" />
          <rect x="19" y="0" width="19" height="36" fill="#FDEF42" />
          <rect x="38" y="0" width="19" height="36" fill="#E31B23" rx="2" />
          <text x="28.5" y="23" textAnchor="middle" fontSize="12" fill="#00853F">★</text>
        </g>
        <text x="323" y="68" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a237e">SÉNÉGAL</text>

        {/* Tooltip hover */}
        {hovered && (
          <g>
            <rect x="8" y="250" width="155" height="34" fill="rgba(13,71,161,0.88)" rx="7" />
            <text x="85" y="264" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">
              {REGION_NAMES[hovered]}
            </text>
            <text x="85" y="278" textAnchor="middle" fontSize="8" fill="#ffcc80">
              {regionDemande[hovered] > 0 ? `${regionDemande[hovered]} annonces` : 'Aucune annonce'}
            </text>
          </g>
        )}

        {/* Légende */}
        <g transform="translate(6, 294)">
          <rect x="-2" y="-4" width="358" height="20" fill="rgba(255,255,255,0.75)" rx="5" />
          {LEGEND.map(({ color, label }, i) => (
            <g key={i} transform={`translate(${i * 58}, 0)`}>
              <rect width="13" height="13" fill={color} rx="2" stroke="#ccc" strokeWidth="0.5" />
              <text x="16" y="10" fontSize="6" fill="#333">{label}</text>
            </g>
          ))}
        </g>
      </svg>
    </Box>
  );
};

// ─── Dashboard principal ─────────────────────────────────────────────────────
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  const [prixVille, setPrixVille] = useState([]);
  const [quartiersChers, setQuartiersChers] = useState([]);
  const [evolution, setEvolution] = useState([]);

  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, prixVilleRes, quartiersRes, evolutionRes] = await Promise.all([
          getStatistiques(),
          getPrixMoyenVille(),
          getQuartiersChers(),
          getEvolutionPrix(),
        ]);
        setStats(statsRes.data);
        setPrixVille(prixVilleRes.data);
        setQuartiersChers(quartiersRes.data);
        setEvolution(evolutionRes.data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', gap: 2 }}>
      <CircularProgress size={60} thickness={4} sx={{ color: colors.primary }} />
      <Typography variant="h6" sx={{ color: colors.textLight }}>Chargement du dashboard...</Typography>
    </Box>
  );

  if (error) return (
    <Container sx={{ mt: 4 }}>
      <Alert severity="error" sx={{ borderRadius: borderRadius.medium, boxShadow: shadows.medium }}>{error}</Alert>
    </Container>
  );

  const formatPrix = (prix) => {
    if (!prix) return 'N/A';
    if (prix >= 1_000_000_000) return (prix / 1_000_000_000).toFixed(1) + ' Mrd';
    if (prix >= 1_000_000) return (prix / 1_000_000).toFixed(1) + ' M';
    if (prix >= 1_000) return (prix / 1_000).toFixed(0) + ' k';
    return prix + ' FCFA';
  };

  const paperStyle = {
    p: 3,
    borderRadius: borderRadius.large,
    boxShadow: shadows.medium,
    transition: transitions.normal,
    height: '100%',
    '&:hover': { boxShadow: shadows.large },
  };

  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`, py: 4 }}>
      <Container maxWidth="xl">

        {/* ── En-tête ── */}
        <Paper elevation={0} sx={{
          p: 4, mb: 4,
          background: colors.gradient.primary,
          borderRadius: borderRadius.large,
          boxShadow: shadows.large,
          position: 'relative', overflow: 'hidden',
          '&::before': {
            content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1,
          },
        }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', fontSize: { xs: '2rem', md: '3rem' }, textShadow: '2px 2px 4px rgba(0,0,0,0.2)', mb: 1 }}>
                📊 Dashboard Immobilier
              </Typography>
              <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationCity sx={{ fontSize: 28 }} />
                Analyse basée sur {stats.total_annonces} annonces immobilières
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2, flexWrap: 'wrap' }}>
                <Chip icon={<CalendarToday />} label="2021-2026" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', '& .MuiChip-icon': { color: colors.accent } }} />
                <Chip icon={<Apartment />} label={`${quartiersChers.length} quartiers`} sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', '& .MuiChip-icon': { color: colors.accent } }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* ── KPIs — 4 cartes occupant toute la ligne ── */}
        <Grid container spacing={5} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard title="Prix moyen" value={stats.prix_moyen_global} icon={<AttachMoney sx={{ fontSize: 44 }} />} color={colors.primary} subValue="Global" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard title="Prix maximum" value={stats.prix_max} icon={<TrendingUp sx={{ fontSize: 44 }} />} color={colors.accent}
              subValue={stats.prix_moyen_global ? `+${((stats.prix_max / stats.prix_moyen_global - 1) * 100).toFixed(0)}% vs moyenne` : ''} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard title="Prix minimum" value={stats.prix_min} icon={<Home sx={{ fontSize: 44 }} />} color={colors.success} subValue="Studio/chambre" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KPICard title="Total annonces" value={stats.total_annonces} icon={<SquareFoot sx={{ fontSize: 44 }} />} color={colors.secondary} subValue={`${quartiersChers.length} quartiers`} />
          </Grid>
        </Grid>

        {/* ── LIGNE 1 : Prix par ville | Évolution des prix ── */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={paperStyle}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: colors.primary, display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LocationCity sx={{ color: colors.primary }} /> Prix moyen par ville
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ height: 340 }}>
                <CustomBarChart data={prixVille} title="" xKey="ville" yKey="prix_moyen" color={colors.primary} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={paperStyle}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: colors.secondary, display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp sx={{ color: colors.secondary }} /> Évolution mensuelle des prix
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ height: 340 }}>
                <CustomLineChart data={evolution} title="" xKey="date" yKey="prix_moyen" color={colors.secondary} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* ── LIGNE 2 : Top quartiers | Quartier le plus cher ── */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={paperStyle}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: colors.accent, display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <EmojiEvents sx={{ color: colors.accent }} /> Top quartiers les plus chers
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <TopQuartiersTable data={quartiersChers} title="" />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{
              ...paperStyle,
              background: colors.gradient.secondary,
              position: 'relative', overflow: 'hidden',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: shadows.large },
              '&::before': {
                content: '""', position: 'absolute', top: 0, right: 0,
                width: '150px', height: '150px',
                background: `radial-gradient(circle, ${colors.accent}20 0%, transparent 70%)`,
                borderRadius: '50%',
              },
            }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Star sx={{ fontSize: 40, color: colors.accent }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>Quartier le plus cher</Typography>
                </Box>
                {stats.quartier_plus_cher && (
                  <>
                    <Typography variant="h2" sx={{ color: colors.accent, fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                      {stats.quartier_plus_cher.nom}
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <LocationCity fontSize="small" /> {stats.quartier_plus_cher.ville}
                    </Typography>
                    <Box sx={{ p: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: borderRadius.medium, backdropFilter: 'blur(10px)' }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>Prix moyen</Typography>
                      <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                        {formatPrix(stats.quartier_plus_cher.prix_moyen)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>FCFA</Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* ── LIGNE 3 : Carte Sénégal pleine largeur ── */}
        <Grid container sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: borderRadius.large, boxShadow: shadows.medium, '&:hover': { boxShadow: shadows.large }, transition: transitions.normal }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: colors.primary, display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationCity sx={{ color: colors.primary }} />
                Carte des régions les plus demandées — Sénégal
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textLight, mb: 2 }}>
                Survolez une région pour voir le détail. La couleur reflète l'intensité de la demande immobilière.
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <CarteSenegal quartiersChers={quartiersChers} />
            </Paper>
          </Grid>
        </Grid>

        {/* ── Footer ── */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: colors.textLight }}>
            Données mises à jour le {new Date().toLocaleDateString('fr-FR')} • {stats.total_annonces} annonces analysées
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default Dashboard; 