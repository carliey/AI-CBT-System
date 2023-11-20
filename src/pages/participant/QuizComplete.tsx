import { TaskAlt } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { QuizResult } from "../../types/test";

function QuizComplete() {
  const location = useLocation();
  const result = location.state as QuizResult;

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Box sx={{ textAlign: "center" }}>
        <TaskAlt sx={{ height: "150px", width: "150px", color: "green" }} />
        {result ? (
          <>
            <Typography variant="h4">
              Your test has been submitted successfully
            </Typography>
            <Typography variant="h5" fontSize={16} mt={2}>
              Total Questions: <strong>{result.total_questions}</strong>
            </Typography>
            <Typography variant="h5" fontSize={16}>
              Your Score: <strong>{result.correct_answers}</strong>
            </Typography>

            <Typography fontSize={18} mt={2}>
              Thank you for participating, we will reach out to you for futher
              instructions.
            </Typography>
          </>
        ) : (
          <Typography>Test not submitted</Typography>
        )}
      </Box>
    </Paper>
  );
}

export default QuizComplete;
