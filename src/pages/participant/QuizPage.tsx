import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { Option, Quiz } from "../../types/test";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

interface QuizPageProps {
  test: Quiz;
}

function QuizPage({ test }: QuizPageProps) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [timeLeft, setTimeLeft] = useState(() => {
    const storedCountdown = localStorage.getItem(`countdown_${test.id}`);
    if (storedCountdown) {
      return parseInt(storedCountdown);
    }
    return test.duration * 60 * 1000;
  });

  const [responses, setResponses] = useState(
    Array(test.questions.length).fill("")
  );

  const handleResponseChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Responses:", responses);
    localStorage.clear();
    navigate("/quiz-complete");

    //send the responses to the server to calculate the user score.
    //navigate the user to the result screen
  };

  const isLastQuestion = currentQuestion === test.questions.length - 1;
  const question = test.questions[currentQuestion];

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      // Prompt the user with a confirmation message
      alert("test will be submitted automatically if you try to leave");
      handleSubmit();
      event.preventDefault();

      // event.returnValue = "test will be submitted automatically";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const countdownRenderer = ({ hours, minutes, seconds, completed }: any) => {
    const isLessThanMinute = hours === 0 && minutes < 5;
    if (completed) {
      handleSubmit(); //submit by countdown
    } else {
      // Render a countdown
      return (
        <Typography
          sx={{
            color: isLessThanMinute ? "red" : "black",
          }}
        >
          - {hours}:{minutes}:{seconds}
        </Typography>
      );
    }
  };

  return (
    <Box className="container">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Paper sx={{ width: "200px", p: 1, textAlign: "center" }}>
          <Countdown
            onTick={(e: any) => {
              localStorage.setItem(`countdown_${test.id}`, e.total);
              setTimeLeft(e.total);
            }}
            date={Date.now() + timeLeft}
            renderer={countdownRenderer}
          />
        </Paper>
      </Box>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Box>
          <Typography fontWeight={600}>
            Question {currentQuestion + 1}.
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" my={2}>
            {question.text}
          </Typography>
          <Grid container columnSpacing={10} rowSpacing={2}>
            {question?.options?.map((option: Option, optionIndex) => (
              <Grid item xs={12} sm={6} key={optionIndex}>
                <Stack direction="row" alignItems="center">
                  <Radio
                    name={`question-${currentQuestion}`}
                    checked={responses[currentQuestion] === option.option}
                    onChange={() =>
                      handleResponseChange(currentQuestion, option.option)
                    }
                  />
                  <Typography variant="body2">{option.option}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="outlined"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        <Button
          variant="outlined"
          onClick={handleNextQuestion}
          disabled={isLastQuestion}
        >
          Next
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Test
        </Button>
      </Box>
    </Box>
  );
}

export default QuizPage;
