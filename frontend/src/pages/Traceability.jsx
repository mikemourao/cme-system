import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import axios from "axios";

const Traceability = () => {
  const [traceabilityData, setTraceabilityData] = useState([]); // Lista de rastreabilidade
  const [serial, setSerial] = useState(""); // Número de série
  const [stage, setStage] = useState(""); // Etapa
  const [failures, setFailures] = useState(""); // Falhas
  const [filterSerial, setFilterSerial] = useState(""); // Filtro de número de série

  // Buscar lista de rastreabilidade ao carregar o componente
  useEffect(() => {
    fetchTraceability();
  }, []);

  const fetchTraceability = async (serialFilter = "") => {
    try {
      const response = await axios.get(
        `http://localhost:8000/traceability/?serial=${serialFilter}`
      );
      setTraceabilityData(response.data);
    } catch (error) {
      console.error("Erro ao buscar rastreabilidade:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/traceability/", {
        serial,
        stage,
        failures,
      });
      alert("Rastreabilidade cadastrada com sucesso!");
      setSerial("");
      setStage("");
      setFailures("");
      fetchTraceability(); // Atualizar a tabela
    } catch (error) {
      console.error("Erro ao cadastrar rastreabilidade:", error);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    fetchTraceability(filterSerial); // Buscar dados filtrados
  };

  const clearFilter = () => {
    setFilterSerial("");
    fetchTraceability(); // Limpar o filtro e buscar todos os dados
  };

  // Função para calcular totais de ocorrências por serial e etapa
  const calculateTotals = () => {
    const totals = {};
    traceabilityData.forEach((item) => {
      const key = `${item.serial}-${item.stage}`;
      totals[key] = (totals[key] || 0) + 1;
    });
    return totals;
  };

  // Exportar para PDF com tabela organizada
  const exportToPDF = () => {
    const totals = calculateTotals();
    const doc = new jsPDF({ orientation: "landscape" }); // PDF em modo paisagem

    // Título do Relatório
    doc.text("Relatório de Rastreabilidade", 14, 10);

    // Dados da Tabela
    const tableData = traceabilityData.map((item) => ({
      ID: item.id,
      Serial: item.serial,
      Etapa: item.stage,
      Falhas: item.failures || "Nenhuma",
      Total: totals[`${item.serial}-${item.stage}`],
      Data: new Date(item.timestamp).toLocaleString(),
    }));

    // Configurar colunas e dados
    const tableColumns = [
      { header: "ID", dataKey: "ID" },
      { header: "Serial", dataKey: "Serial" },
      { header: "Etapa", dataKey: "Etapa" },
      { header: "Falhas", dataKey: "Falhas" },
      { header: "Total", dataKey: "Total" },
      { header: "Data", dataKey: "Data" },
    ];

    autoTable(doc, {
      head: [tableColumns.map((col) => col.header)],
      body: tableData.map((row) => tableColumns.map((col) => row[col.dataKey])),
      startY: 20,
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 15 }, // ID
        1: { cellWidth: 40 }, // Serial
        2: { cellWidth: 40 }, // Etapa
        3: { cellWidth: 50 }, // Falhas
        4: { cellWidth: 20 }, // Total
        5: { cellWidth: 50 }, // Data
      },
      theme: "grid",
    });

    doc.save("rastreabilidade.pdf");
  };

  // Exportar para XLSX
  const exportToXLSX = () => {
    const totals = calculateTotals();
    const data = traceabilityData.map((item) => ({
      ID: item.id,
      Serial: item.serial,
      Etapa: item.stage,
      Falhas: item.failures || "Nenhuma",
      Total: totals[`${item.serial}-${item.stage}`],
      Data: new Date(item.timestamp).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rastreabilidade");
    XLSX.writeFile(workbook, "rastreabilidade.xlsx");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "stretch",
        width: "100%",
        padding: 3,
        boxSizing: "border-box",
      }}
    >
      {/* Título */}
      <Typography variant="h4" gutterBottom>
        Cadastro e Consulta de Rastreabilidade
      </Typography>

      {/* Formulário de Cadastro */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cadastro de Rastreabilidade
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "16px" }}>
            <TextField
              fullWidth
              label="Número de Série"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Etapa"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              margin="normal"
              required
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              <option value="Recebimento">Recebimento</option>
              <option value="Lavagem">Lavagem</option>
              <option value="Esterilização">Esterilização</option>
              <option value="Distribuição">Distribuição</option>
            </TextField>
            <TextField
              fullWidth
              label="Falhas (opcional)"
              value={failures}
              onChange={(e) => setFailures(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ alignSelf: "center" }}
            >
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Filtro por número de série */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="Filtrar por Número de Série"
          value={filterSerial}
          onChange={(e) => setFilterSerial(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            endAdornment: filterSerial && (
              <IconButton onClick={clearFilter}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filtrar
        </Button>
      </Box>

      {/* Botões de Exportação */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={exportToPDF}>
          Exportar PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={exportToXLSX}>
          Exportar XLSX
        </Button>
      </Box>

      {/* Tabela de Rastreabilidade */}
      <TableContainer
        component={Paper}
        sx={{
          height: "250px",
          overflow: "auto", // Adiciona barra de rolagem
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Número de Série</TableCell>
              <TableCell>Etapa</TableCell>
              <TableCell>Falhas</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {traceabilityData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.serial}</TableCell>
                <TableCell>{item.stage}</TableCell>
                <TableCell>{item.failures || "Nenhuma"}</TableCell>
                <TableCell>
                  {new Date(item.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Traceability;
