import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserForm from "./pages/Users";
import MaterialForm from "./pages/Materials";
import TraceabilityForm from "./pages/Traceability";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

const drawerWidthExpanded = 240; // Largura expandida do sidebar
const drawerWidthCollapsed = 80; // Largura retraída do sidebar

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Controle do sidebar (expandido/retraído)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: sidebarOpen
            ? `calc(100% - ${drawerWidthExpanded}px)`
            : `calc(100% - ${drawerWidthCollapsed}px)`,
          ml: sidebarOpen ? `${drawerWidthExpanded}px` : `${drawerWidthCollapsed}px`,
          transition: "all 0.3s",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            CME System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidthExpanded : drawerWidthCollapsed,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: sidebarOpen ? drawerWidthExpanded : drawerWidthCollapsed,
            boxSizing: "border-box",
            transition: "width 0.3s",
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={toggleSidebar}>
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <nav>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link
                  to="/users"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    padding: sidebarOpen ? "10px 20px" : "10px",
                    display: "block",
                  }}
                >
                  Gerenciamento de Usuários
                </Link>
              </li>
              <li>
                <Link
                  to="/materials"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    padding: sidebarOpen ? "10px 20px" : "10px",
                    display: "block",
                  }}
                >
                  Cadastro de Materiais
                </Link>
              </li>
              <li>
                <Link
                  to="/traceability"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    padding: sidebarOpen ? "10px 20px" : "10px",
                    display: "block",
                  }}
                >
                  Rastreabilidade
                </Link>
              </li>
            </ul>
          </nav>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          ml: sidebarOpen ? `${drawerWidthExpanded}px` : `${drawerWidthCollapsed}px`,
          transition: "all 0.3s",
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/users" element={<UserForm />} />
          <Route path="/materials" element={<MaterialForm />} />
          <Route path="/traceability" element={<TraceabilityForm />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
