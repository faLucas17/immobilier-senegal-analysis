import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import ChatBot from './components/ChatBot';  // ← IMPORT DU CHATBOT
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
        <Navbar />
        {/* Ce Box pousse le contenu sous la Navbar et lui donne toute la largeur */}
        <Box
          component="main"
          sx={{
            width: '100%',
            boxSizing: 'border-box',
            // Ajustez cette valeur selon la hauteur réelle de votre Navbar
            // MUI AppBar par défaut = 64px desktop, 56px mobile
            mt: { xs: '56px', sm: '64px' },
            overflow: 'hidden',
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
        
        {/* 🤖 BOT FLOTTANT — visible sur toutes les pages */}
        <ChatBot />
      </Router>
    </ThemeProvider>
  );
}

export default App;