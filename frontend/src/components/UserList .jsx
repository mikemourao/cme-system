import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.role}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
