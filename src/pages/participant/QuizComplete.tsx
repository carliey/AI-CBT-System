import { TaskAlt } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";

function QuizComplete() {
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Box sx={{ textAlign: "center" }}>
        <TaskAlt sx={{ height: "150px", width: "150px", color: "green" }} />
        <Typography variant="h4">
          Your test has been submitted successfully
        </Typography>
        <Typography fontSize={18}>
          Please check your email for your score
        </Typography>
      </Box>
    </Paper>
  );
}

export default QuizComplete;
