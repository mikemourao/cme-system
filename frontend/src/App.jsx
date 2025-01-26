import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserForm from "./pages/Users";
import MaterialForm from "./pages/Materials";
import TraceabilityForm from "./components/TraceabilityForm ";

const App = () => {
  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/users" style={{ marginRight: "10px" }}>
          Cadastro de Usuários
        </Link>
        <Link to="/materials" style={{ marginRight: "10px" }}>
          Cadastro de Materiais
        </Link>
        <Link to="/traceability">Rastreabilidade</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Bem-vindo ao Sistema CME!</h1>} />
        <Route path="/users" element={<UserForm />} />
        <Route path="/materials" element={<MaterialForm />} />
        <Route path="/traceability" element={<TraceabilityForm />} />
      </Routes>
    </div>
  );
};

export default App;
