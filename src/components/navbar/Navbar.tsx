import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logout from "../buttons/Logout";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = ["companies", "jobs", "create-job"];
  const email = localStorage.getItem("email");

  return (
    <AppBar position="static" sx={{ marginBottom: "30px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
            {links.map((link) => (
              <NavLink to={`/${link}`} className="navLinkHeader">
                {link}
              </NavLink>
            ))}
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ fontSize: "14px", margin: "0px 15px" }}
            >
              {email}
            </Typography>
            <Logout />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
