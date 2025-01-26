import React, { useState, useEffect } from "react";
import axios from "axios";

const TraceabilityForm = () => {
  const [serial, setSerial] = useState("");
  const [stage, setStage] = useState("");
  const [failures, setFailures] = useState("");
  const [traceabilities, setTraceabilities] = useState([]);
  const [filterSerial, setFilterSerial] = useState("");

  // Buscar rastreabilidade ao carregar a página
  useEffect(() => {
    axios.get("http://localhost:8000/traceability/").then((response) => {
      setTraceabilities(response.data);
    });
  }, []);

  // Enviar rastreabilidade ao backend
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

      // Atualizar a lista de rastreabilidades
      const response = await axios.get("http://localhost:8000/traceability/");
      setTraceabilities(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar rastreabilidade:", error);
    }
  };

  // Filtrar por serial
  const handleFilter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/traceability/?serial=${filterSerial}`
      );
      setTraceabilities(response.data);
    } catch (error) {
      console.error("Erro ao filtrar rastreabilidade:", error);
    }
  };

  return (
    <div>
      <h2>Rastreabilidade</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Serial do Material"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          required
        />
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          required
        >
          <option value="">Selecione a Etapa</option>
          <option value="Recebimento">Recebimento</option>
          <option value="Lavagem">Lavagem</option>
          <option value="Esterilização">Esterilização</option>
          <option value="Distribuição">Distribuição</option>
        </select>
        <input
          type="text"
          placeholder="Falhas (se houver)"
          value={failures}
          onChange={(e) => setFailures(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Filtrar por Serial</h3>
      <input
        type="text"
        placeholder="Serial"
        value={filterSerial}
        onChange={(e) => setFilterSerial(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrar</button>

      <h3>Rastreabilidade Registrada</h3>
      <ul>
        {traceabilities.map((trace) => (
          <li key={trace.id}>
            Serial: {trace.serial} | Etapa: {trace.stage} | Falhas: {trace.failures || "Nenhuma"} | Data:{" "}
            {new Date(trace.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TraceabilityForm;
