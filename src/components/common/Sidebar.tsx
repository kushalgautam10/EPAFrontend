import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import { menuItems, MenuItemType } from "./MenuConfig";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <List disablePadding>
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            level={0}
            collapsed={collapsed}
            isLast={index === menuItems.length - 1}
          />
        ))}
      </List>
    </Box>
  );
};

interface SidebarItemProps {
  item: MenuItemType;
  level: number;
  collapsed: boolean;
  isLast: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  level,
  collapsed,
  isLast,
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = item.path && location.pathname === item.path;
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const handleItemClick = () => {
    if (hasChildren) setOpen(!open);
  };

  return (
    <>
      {/* Tree Line (LEFT vertical connector) */}
      {level > 0 && (
        <Box
          sx={{
            position: "relative",
            pl: collapsed ? 0 : `${level * 18}px`,
            "&::before": {
              content: '""',
              position: "absolute",
              left: collapsed ? 24 : level * 18 - 12,
              top: 0,
              bottom: isLast ? "50%" : 0,
              width: "1px",
              borderLeft: "1px solid rgba(0,0,0,0.2)",
            },
          }}
        ></Box>
      )}

      {/* Item */}
  <ListItemButton
    onClick={handleItemClick}
    component={item.path ? Link : "button"}
    to={item.path || ""}

    sx={{
    pl: collapsed ? 1 : 2 + level * 1,
    borderRadius: 1,
    mt: 0.8,
    mx: 1,
    

    // ----- ACTIVE STATE -----
    bgcolor: isActive ? "primary.light" : "transparent",
    color: isActive ? "primary.main" : "text.primary",
    fontWeight: 400,
    boxShadow: isActive ? "0 0 0 1px rgba(0,0,0,0.05)" : "none",

    // ----- HOVER STATE -----
    "&:hover": {
      bgcolor: isActive ? "primary.light" : "grey.100",
      color: isActive ? "primary.main" : "text.primary",
    },

    transition: "all 0.2s ease",
  }}
>
  {item.icon && (
    <ListItemIcon
      sx={{
        color: isActive ? "primary.main" : "text.secondary",
        minWidth: collapsed ? 48 : 40,

        // keep icon colored on hover but not overriding active
        "&:hover": {
          color: isActive ? "primary.main" : "text.secondary",
        },
      }}
    >
      {item.icon}
    </ListItemIcon>
  )}

  {!collapsed && (
    <ListItemText
      primary={item.title}
      sx={{
        "& .MuiListItemText-primary": {
          fontWeight: 400,
          fontSize: "0.85rem",
        },
      }}
    />
  )}

  {!collapsed && hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
</ListItemButton>

      {/* Children (with nested tree lines) */}
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children!.map((child, i) => (
              <SidebarItem
                key={i}
                item={child}
                collapsed={collapsed}
                level={level + 1}
                isLast={i === item.children!.length - 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default Sidebar;