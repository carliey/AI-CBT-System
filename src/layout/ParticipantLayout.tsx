import { Box, Container, Paper, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

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
        <Typography variant="h6">App Logo</Typography>
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
