import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container 
      style={{ 
        textAlign: 'center', 
        marginTop: '30%', 
        marginLeft: '31%',
      }}>
      <Typography variant="h3" gutterBottom>
        Sistema CME
      </Typography>
      <Typography variant="h6" paragraph>
        Bem-vindo ao sistema de gestão da Central de Materiais e Esterilização.
      </Typography>
    </Container>
  );
};

export default Home;
