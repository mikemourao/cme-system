import React, { useState, useEffect } from "react";
import axios from "axios";

const MaterialForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [materials, setMaterials] = useState([]);

  // Buscar materiais ao carregar a página
  useEffect(() => {
    axios.get("http://localhost:8000/materials/").then((response) => {
      setMaterials(response.data);
    });
  }, []);

  // Enviar material ao backend
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

      // Atualizar a lista de materiais
      const response = await axios.get("http://localhost:8000/materials/");
      setMaterials(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar material:", error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Materiais</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Material"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tipo do Material"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Data de Validade"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Lista de Materiais</h3>
      <ul>
        {materials.map((material) => (
          <li key={material.id}>
            {material.name} - {material.type} - {material.expiration_date} - Serial:{" "}
            {material.serial}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialForm;
