import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import Navigation from "./Navigation";
import { Container } from "@mui/material";

const DashboardLayout = () => {
  return (
    <>
      <Appbar />
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default DashboardLayout;
