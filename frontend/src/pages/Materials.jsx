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
} from "@mui/material";
import axios from "axios";

// Estilos do Modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
  const handleClose = () => setOpen(false); // Fechar modal

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/materials/", {
        name,
        type,
        expiration_date: expirationDate,
      });
      alert("Material cadastrado com sucesso!");
      setName("");
      setType("");
      setExpirationDate("");
      setOpen(false);
      fetchMaterials(); // Atualizar a tabela
    } catch (error) {
      console.error("Erro ao cadastrar material:", error);
    }
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
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Data de Validade</TableCell>
              <TableCell>Serial</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Materials;
