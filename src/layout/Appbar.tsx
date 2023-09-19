import { Box, Paper, Typography } from "@mui/material";

const Appbar = () => {
  return (
    <Paper
      sx={{ p: 2, borderBottom: "1px solid #f3f3f3", backgroundColor: "white" }}
    >
      <Typography variant="h6">App Logo</Typography>
    </Paper>
  );
};

export default Appbar;
