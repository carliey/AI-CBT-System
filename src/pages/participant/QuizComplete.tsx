import { TaskAlt } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Participant } from "../../types/participants";
import { Quiz } from "../../types/test";

interface QuizResult {
  id: number;
  participant: Participant;
  quiz: Quiz;
  correct_answers: number;
  questions_attempted: number;
  total_questions: number;
}

function QuizComplete() {
  const location = useLocation();
  const result = location.state as QuizResult;
  console.log("result", result);

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Box sx={{ textAlign: "center" }}>
        <TaskAlt sx={{ height: "150px", width: "150px", color: "green" }} />
        {result ? (
          <>
            <Typography variant="h4">
              Your test has been submitted successfully
            </Typography>
            <Typography variant="button" fontSize={16}>
              Total Quesiotns: <strong>{result.total_questions}</strong>
            </Typography>
            <Typography variant="button" fontSize={16}>
              Your Score: <strong>{result.correct_answers}</strong>
            </Typography>

            <Typography fontSize={18}>
              Please check your email for your score
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
