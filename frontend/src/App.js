import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import AnnoncesPage from './pages/Annonces';
import AnnonceDetail from './pages/AnnonceDetail';  // ← IMPORT AJOUTÉ
import About from './pages/About';
import ChatBot from './components/ChatBot';
import { colors } from './utils/theme';

const theme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box
            component="main"
            sx={{
              flex: 1,
              width: '100%',
              boxSizing: 'border-box',
              mt: { xs: '100px', sm: '120px', md: '130px' },
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/annonces" element={<AnnoncesPage />} />
              <Route path="/annonce/:id" element={<AnnonceDetail />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          <Footer />
          <ChatBot />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;