import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { Option, Quiz } from "../../types/test";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import {
  useCreateParticipantResultMutation,
  useSubmitAnswerMutation,
} from "./participantApiSlice";
import { toast } from "react-toastify";

interface QuizPageProps {
  test: Quiz;
  participant_id: number;
}

function QuizPage({ test, participant_id }: QuizPageProps) {
  const navigate = useNavigate();
  const [submitAnswer] = useSubmitAnswerMutation();
  const [createResult, { isLoading: isCreatingResult }] =
    useCreateParticipantResultMutation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [openWarning, setOpenWarning] = useState(false);

  const [timeLeft, setTimeLeft] = useState(() => {
    const storedCountdown = localStorage.getItem(`countdown_${test.id}`);
    if (storedCountdown) {
      return parseInt(storedCountdown);
    }
    return test.duration * 60 * 1000;
  });

  const [responses, setResponses] = useState<
    { questionId: number; option_id: number }[]
  >([]);

  const handleResponseChange = async (
    questionId: number | undefined,
    optionId: number | undefined
  ) => {
    const body = {
      quizId: test.id,
      participantId: participant_id,
      questionId: question.id,
      optionId: optionId,
    };
    try {
      setOpenWarning(false);
      await submitAnswer(body).unwrap();

      const existingResponse = responses.find(
        (response) => response.questionId === questionId
      );

      if (existingResponse) {
        // If a response for the current question already exists, update it
        const updatedResponses = responses.map((response) =>
          response.questionId === questionId
            ? { questionId: questionId!, option_id: optionId! }
            : response
        );
        setResponses(updatedResponses);
      } else {
        // If no response for the current question exists, add a new one
        setResponses([
          ...responses,
          { questionId: questionId!, option_id: optionId! },
        ]);
      }
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
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

  const handleSubmit = async () => {
    //implement the submit function
    const res = await createResult({
      participantId: participant_id,
      quizId: test.id,
    }).unwrap();

    localStorage.clear();
    navigate("/quiz-complete", {
      state: { ...res.data, total_questions: test.questions.length },
    });
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
                    checked={
                      !!responses.find(
                        (response) =>
                          response.questionId === question.id &&
                          response.option_id === option.id
                      )
                    }
                    onChange={() =>
                      handleResponseChange(question.id, option.id)
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
        <Button variant="contained" onClick={() => setOpenWarning(true)}>
          {isCreatingResult ? "loading..." : "Submit Test"}{" "}
        </Button>
        <Dialog
          open={openWarning}
          onClose={() => setOpenWarning(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Warning! </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to submit this quiz, action cannot be
              reversed!!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenWarning(false)} variant="contained">
              No
            </Button>
            <Button onClick={handleSubmit} autoFocus variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default QuizPage;
