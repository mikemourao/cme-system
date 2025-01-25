import React from "react";
import UserForm from "./components/UserForm";
import { red } from "@mui/material/colors";
// import UserList from "./components/UserList ";

const App = () => {
  return (
    <div>
      <h1 style={{color: red, backgroundColor: red}}>Gerenciamento de Usuários</h1>
      <UserForm />
      {/* <UserList /> */}
    </div>
  );
};

export default App;
