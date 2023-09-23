import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  Input,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { Option, Questions } from "../../types/test";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

interface QuizPageProps {
  questions: Questions;
}

interface CountdownRendererProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function QuizPage({ questions }: QuizPageProps) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(""));

  const handleResponseChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
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
    navigate("/quiz-complete");

    //send the responses to a server or calculate the score, etc.
    //navigate the user to the result screen
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const question = questions[currentQuestion];

  const countdownRenderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      handleSubmit();
      return <Typography>00:00:00</Typography>;
    } else {
      // Render a countdown
      return (
        <Typography>
          - {hours}:{minutes}:{seconds}
        </Typography>
      );
    }
  };

  return (
    <Box className="container">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Paper sx={{ width: "200px", p: 1, textAlign: "center" }}>
          <Countdown date={Date.now() + 5000} renderer={countdownRenderer} />
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
            {question.question}
          </Typography>
          <Grid container columnSpacing={10} rowSpacing={2}>
            {question.options.map((option: Option, optionIndex) => (
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
          Submit Quiz
        </Button>
      </Box>
    </Box>
  );
}

export default QuizPage;
