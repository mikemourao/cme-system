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

const Materials = () => {
  const [materials, setMaterials] = useState([]); // Lista de materiais
  const [open, setOpen] = useState(false); // Controle do modal
  const [name, setName] = useState(""); // Nome do material
  const [type, setType] = useState(""); // Tipo do material
  const [expirationDate, setExpirationDate] = useState(""); // Data de validade
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Controle do Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensagem do Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severidade do Snackbar

  // Controle do Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null); // Material selecionado para exclusão

  // Buscar lista de materiais ao carregar o componente
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:8000/materials/");
      setMaterials(response.data);
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
    }
  };

  const handleOpen = () => setOpen(true); // Abrir modal
  const handleClose = () => {
    setOpen(false); // Fechar o modal
    setName(""); // Limpar campos do formulário
    setType("");
    setExpirationDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/materials/", {
        name,
        type,
        expiration_date: expirationDate,
      });
      setSnackbarMessage("Material cadastrado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpen(false);
      fetchMaterials(); // Atualizar tabela
    } catch (error) {
      console.error("Erro ao cadastrar material:", error);
      setSnackbarMessage("Erro ao cadastrar material.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleOpenPopover = (event, materialId) => {
    setAnchorEl(event.currentTarget); // Define o botão como âncora
    setSelectedMaterialId(materialId); // Define o material selecionado
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Fecha o popover
    setSelectedMaterialId(null); // Limpa o material selecionado
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/materials/${selectedMaterialId}`);
      setSnackbarMessage("Material excluído com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchMaterials(); // Atualizar tabela
      handleClosePopover(); // Fecha o popover
    } catch (error) {
      console.error("Erro ao excluir material:", error);
      setSnackbarMessage("Erro ao excluir material.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Fechar Snackbar
  };

  return (
    <Box p={3}>
      {/* Título */}
      <Typography variant="h4" gutterBottom>
        Cadastro de Materiais
      </Typography>

      {/* Botão para abrir o formulário */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Cadastrar Material
      </Button>

      {/* Modal do formulário */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Cadastro de Material
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome do Material"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Tipo do Material"
              value={type}
              onChange={(e) => setType(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Data de Validade"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
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

      {/* Tabela de Materiais */}
      <TableContainer component={Paper} sx={{ height: "450px", overflow: "auto", marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Data de Validade</TableCell>
              <TableCell>Serial</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.id}</TableCell>
                <TableCell>{material.name}</TableCell>
                <TableCell>{material.type}</TableCell>
                <TableCell>{material.expiration_date}</TableCell>
                <TableCell>{material.serial}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={(e) => handleOpenPopover(e, material.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* Popover de confirmação */}
                  <Popover
                    open={Boolean(anchorEl) && selectedMaterialId === material.id}
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
                        Deseja realmente excluir este material?
                      </Typography>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        sx={{ marginRight: 1 }}
                      >
                        Excluir
                      </Button>
                      <Button variant="outlined" onClick={handleClosePopover}>
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
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Materials;
