import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

// Estilos do Modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const Users = () => {
  const [users, setUsers] = useState([]); // Lista de usuários
  const [open, setOpen] = useState(false); // Controle do modal
  const [name, setName] = useState(""); // Nome do novo usuário
  const [role, setRole] = useState(""); // Função do novo usuário
  const [openSnackbar, setOpenSnackbar] = useState(false); // Controle do Snackbar

  // Buscar lista de usuários ao carregar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleOpen = () => setOpen(true); // Abrir modal
  const handleClose = () => {
    setOpen(false); // Fechar o modal
    setName(""); // Limpar o campo de nome
    setRole(""); // Limpar o campo de função
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/users/", { name, role });
      setName("");
      setRole("");
      setOpen(false);
      fetchUsers(); // Atualizar a tabela

      // Exibir a mensagem de sucesso
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  // Fechar o Snackbar após 3 segundos
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box p={3}>
      {/* Título */}
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Usuários
      </Typography>

      {/* Botão para abrir o formulário */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Cadastrar Usuário
      </Button>

      {/* Modal do formulário */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Cadastro de Usuário
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Função"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              margin="normal"
              required
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              <option value="Técnico">Técnico</option>
              <option value="Enfermagem">Enfermagem</option>
              <option value="Administrativo">Administrativo</option>
            </TextField>
            <Box textAlign="right" mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginRight: 1 }}
              >
                Cadastrar
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Tabela de Usuários */}
      <TableContainer component={Paper} sx={{ height: "450px", overflow: "auto", marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Função</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar de sucesso */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Usuário cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;
