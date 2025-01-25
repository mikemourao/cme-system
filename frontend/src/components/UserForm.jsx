import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/users/", { name, role });
      alert("Usuário cadastrado com sucesso!");
      setName("");
      setRole("");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cargo"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default UserForm;
