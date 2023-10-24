import { Box, Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import ComputerIcon from "@mui/icons-material/Computer";

const ParticipantLayout = () => {
  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          borderBottom: "1px solid #f3f3f3",
          backgroundColor: "white",
        }}
        elevation={2}
      >
        <ComputerIcon />
      </Paper>
      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default ParticipantLayout;
