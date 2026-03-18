// frontend/src/components/ChatBot.js

import React, { useState, useRef, useEffect } from 'react';
import { 
  Paper, TextField, Button, Box, Typography, 
  Avatar, IconButton, Drawer, Fab 
} from '@mui/material';
import { 
  Send, SmartToy, Person, Chat as ChatIcon, Close 
} from '@mui/icons-material';
import { colors, shadows } from '../utils/theme';
import axios from 'axios';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Bonjour ! Je suis votre assistant immobilier. Posez-moi des questions sur :\n• Prix moyen par ville/quartier\n• Quartiers les plus chers\n• Nombre d'annonces\n• Évolution des prix", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat/', { 
        question: input 
      });
      
      const botMessage = { text: response.data.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        text: "Désolé, je n'ai pas pu traiter votre question. Veuillez réessayer.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: colors.accent,
          '&:hover': { bgcolor: colors.accentDark },
          boxShadow: shadows.large,
          zIndex: 1000
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Fenêtre de chat */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 }, maxWidth: '100%' }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* En-tête */}
          <Box sx={{ 
            p: 2, 
            bgcolor: colors.primary, 
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToy />
              <Typography variant="h6">Assistant Immo</Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 2,
            bgcolor: '#f5f5f5'
          }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                {msg.sender === 'bot' && (
                  <Avatar sx={{ bgcolor: colors.primary, mr: 1, width: 32, height: 32 }}>
                    <SmartToy sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: msg.sender === 'user' ? colors.accent : 'white',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                    boxShadow: shadows.small,
                    whiteSpace: 'pre-line'
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
                {msg.sender === 'user' && (
                  <Avatar sx={{ bgcolor: colors.secondary, ml: 1, width: 32, height: 32 }}>
                    <Person sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Avatar sx={{ bgcolor: colors.primary, mr: 1, width: 32, height: 32 }}>
                  <SmartToy sx={{ fontSize: 18 }} />
                </Avatar>
                <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
                  <Typography variant="body2">En train de réfléchir...</Typography>
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Zone de saisie */}
          <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Posez votre question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <Button
                variant="contained"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                sx={{ bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentDark } }}
              >
                <Send />
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatBot;