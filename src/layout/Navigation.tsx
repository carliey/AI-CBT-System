import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const pages = ["Overview", "Library", "Tests", "settings"];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ borderBottom: "1px solid #f3f3f3", backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flex: 1,
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".12rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Company name
          </Typography>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            {/* to be displayed mobile */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink to={page === "Overview" ? "/" : `${page}`}>
                {({ isActive }) => (
                  <Button
                    key={page}
                    sx={{
                      mx: 2,
                      color: isActive ? "black" : "grey",
                      backgroundColor: isActive ? "#F5F5F5" : "transparent",
                      display: "block",
                    }}
                  >
                    {page}
                  </Button>
                )}
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navigation;
