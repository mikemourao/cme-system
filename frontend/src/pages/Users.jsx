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
  IconButton,
  Popover,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

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
  const [name, setName] = useState(""); // Nome do usuário
  const [role, setRole] = useState(""); // Função do usuário
  const [editingUser, setEditingUser] = useState(null); // Usuário sendo editado
  const [openSnackbar, setOpenSnackbar] = useState(false); // Controle do Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensagem do Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Tipo do Snackbar

  // Controle do Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // Usuário selecionado para exclusão

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

  const handleOpen = (user = null) => {
    setEditingUser(user);
    setName(user ? user.name : "");
    setRole(user ? user.role : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setRole("");
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`http://localhost:8000/users/${editingUser.id}`, {
          name,
          role,
        });
        setSnackbarMessage("Usuário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8000/users/", { name, role });
        setSnackbarMessage("Usuário cadastrado com sucesso!");
      }

      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      setSnackbarMessage(
        error.response?.data?.detail || "Erro ao salvar usuário."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleOpenPopover = (event, userId) => {
    setAnchorEl(event.currentTarget); // Define o botão como âncora
    setSelectedUserId(userId); // Define o usuário selecionado
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Fecha o popover
    setSelectedUserId(null); // Limpa o usuário selecionado
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/${selectedUserId}`);
      setSnackbarMessage("Usuário excluído com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      fetchUsers();
      handleClosePopover(); // Fecha o popover após exclusão
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setSnackbarMessage("Erro ao excluir usuário.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box p={3}>
      {/* Título */}
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Usuários
      </Typography>

      {/* Botão para abrir o formulário */}
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Cadastrar Usuário
      </Button>

      {/* Modal do formulário */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editingUser ? "Editar Usuário" : "Cadastrar Usuário"}
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
                Salvar
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Tabela de Usuários */}
      <TableContainer
        component={Paper}
        sx={{ height: "450px", overflow: "auto", marginTop: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Função</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={(e) => handleOpenPopover(e, user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* Popover de confirmação */}
                  <Popover
                    open={Boolean(anchorEl) && selectedUserId === user.id}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Box p={2}>
                      <Typography variant="body1" gutterBottom>
                        Deseja realmente excluir?
                      </Typography>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        sx={{ marginRight: 1 }}
                      >
                        Excluir
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleClosePopover}
                      >
                        Cancelar
                      </Button>
                    </Box>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;
