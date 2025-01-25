import React from 'react';
import UserForm from '../components/UserForm';
// import UserList from '../components/UserList';
import { Container, Typography } from '@mui/material';

const Users = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Usuários
      </Typography>
      <UserForm />
      <UserList />
    </Container>
  );
};

export default Users;
