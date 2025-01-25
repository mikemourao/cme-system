import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users/").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/users/", { name, role });
    setName("");
    setRole("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Função" />
        <button type="submit">Cadastrar</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
