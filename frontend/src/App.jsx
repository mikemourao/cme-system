import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserForm from "./pages/Users";
import MaterialForm from "./pages/Materials";
import TraceabilityForm from "./pages/Traceability";
import Home from "./pages/Home";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Person as PersonIcon, Inventory as InventoryIcon, Timeline as TimelineIcon } from "@mui/icons-material";

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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={toggleSidebar}>
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Box sx={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
          <List>
            <ListItem button component={Link} to="/users">
              <Tooltip title="Gerenciamento de Usuários" arrow>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
              </Tooltip>
              {sidebarOpen && <ListItemText primary="Gerenciamento de Usuários" />}
            </ListItem>
            <ListItem button component={Link} to="/materials">
              <Tooltip title="Cadastro de Materiais" arrow>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
              </Tooltip>
              {sidebarOpen && <ListItemText primary="Cadastro de Materiais" />}
            </ListItem>
            <ListItem button component={Link} to="/traceability">
              <Tooltip title="Rastreabilidade" arrow>
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
              </Tooltip>
              {sidebarOpen && <ListItemText primary="Rastreabilidade" />}
            </ListItem>
          </List>
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
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserForm />} />
          <Route path="/materials" element={<MaterialForm />} />
          <Route path="/traceability" element={<TraceabilityForm />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
