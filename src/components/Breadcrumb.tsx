import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  // Break URL into segments: /admin/users/edit → ["admin", "users", "edit"]
  const segments = location.pathname.split("/").filter(Boolean);

  // Remove "admin" from breadcrumb
  const cleanSegments = segments[0] === "admin" ? segments.slice(1) : segments;

  // Build dynamic breadcrumb items
  const crumbs = cleanSegments.map((segment, index) => {
    const path = "/admin/" + cleanSegments.slice(0, index + 1).join("/");

    const label = segment
      .replace(/-/g, " ")         // Replace hyphens
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize

    const isLast = index === cleanSegments.length - 1;

    return isLast ? (
      <Typography key={path} color="text.primary" fontWeight={600}>
        {label}
      </Typography>
    ) : (
      <MuiLink
        component={Link}
        key={path}
        to={path}
        underline="hover"
        color="inherit"
        sx={{ fontWeight: 500 }}
      >
        {label}
      </MuiLink>
    );
  });

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <MuiLink component={Link} to="/admin" underline="hover" color="inherit"/>
      {crumbs}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
