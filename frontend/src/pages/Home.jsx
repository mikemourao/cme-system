import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Sistema CME
      </Typography>
      <Typography variant="h6" paragraph>
        Bem-vindo ao sistema de gestão da Central de Materiais e Esterilização.
      </Typography>
      <Link to="/users" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Gerenciar Usuários
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
