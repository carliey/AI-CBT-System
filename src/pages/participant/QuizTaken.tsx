import { Box, Paper, Typography } from "@mui/material";

function QuizTaken() {
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Box textAlign={"center"}>
        <Typography variant="h4">You have already taken this test </Typography>
        <Typography mt={2}>Please await futher instructions </Typography>
      </Box>
    </Paper>
  );
}

export default QuizTaken;
