import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LayersIcon from "@mui/icons-material/Layers";

const AdminMenuItems: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const location = useLocation();

  return (
    <>
      {/* Dashboard */}
      <ListItemButton
        component={Link}
        to="/admin"
        selected={
          location.pathname === "/admin" ||
          location.pathname === "/admin/dashboard"
        }
        sx={{
          borderRadius: 1,
          "&:hover": { bgcolor: "primary.main", color: "#fff" },
          mt: 1,
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <DashboardIcon />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Dashboard" />}
      </ListItemButton>

      {/* Users */}
      <ListItemButton
        component={Link}
        to="/admin/users"
        sx={{
          borderRadius: 1,
          "&:hover": { bgcolor: "primary.main", color: "#fff" },
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <PeopleIcon />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Users" />}
      </ListItemButton>

      {/* Settings */}
      <ListItemButton
        component={Link}
        to="/admin/settings"
        sx={{
          borderRadius: 1,
          "&:hover": { bgcolor: "primary.main", color: "#fff" },
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <SettingsIcon />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Settings" />}
      </ListItemButton>

      {/* UI Elements */}
      <ListItemButton
        sx={{
          borderRadius: 1,
          "&:hover": { bgcolor: "primary.main", color: "#fff" },
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <LayersIcon />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="UI Elements" />}
      </ListItemButton>
    </>
  );
};

export default AdminMenuItems;