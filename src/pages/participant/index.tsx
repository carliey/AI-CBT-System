import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import QuizPage from "./QuizPage";
import { useGetQuizQuery } from "./participantApiSlice";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { quiz_id, participant_id } = useParams();
  const participant = parseInt(participant_id || "");
  const quiz = parseInt(quiz_id || "");

  const { data: quizData } = useGetQuizQuery({
    participant_id: participant,
    quiz_id: quiz,
  });

  console.log("hello", quizData);

  const [hasStarted, setHasStarted] = useState(false);

  const handleStartTest = () => {
    //send an api request to start the test
    setHasStarted(true);
  };

  if (!quizData) {
    return <h1>Something went wrong, unable to fetch quiz</h1>;
  }

  return hasStarted ? (
    <QuizPage test={quizData?.data.Quiz} />
  ) : (
    <Grid container spacing={5}>
      {/* Welcome and Test Instructions Section */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} style={{ padding: "1.5rem" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="h5" paragraph>
            You are participating in the{" "}
            {quizData?.data.Quiz.TestAdministrator?.name} -{" "}
            {quizData?.data.Quiz.title}.
          </Typography>
          <Typography variant="body1" paragraph>
            Please read carefully before you proceed.
          </Typography>

          <Typography variant="body1" paragraph>
            {quizData?.data.Quiz.description}
          </Typography>
          <Typography variant="body1" paragraph>
            {quizData?.data.Quiz.instructions}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Duration: </strong>
            {quizData?.data.Quiz.duration} minutes
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Date: </strong>
            {quizData?.data.Quiz.date}
          </Typography>

          <Typography variant="h6">General Instructions:</Typography>
          <Box
            component="ul"
            sx={{
              "& li": { p: 0.5 },
            }}
          >
            <li>
              Once you begin the test, a timer will start automatically, and you
              will not be able to pause it.
            </li>
            <li>
              You will see the remaining time displayed on the screen so that
              you can manage your time effectively.
            </li>
            <li>
              The test will automatically submit once the time is over, or you
              can submit manually after going through all the questions.
            </li>
            <li>
              Closing the browser tab or window will automatically submit the
              test.
            </li>
            <li>
              Please ensure that you have enough time to complete the test
              before you start.
            </li>
            <li>
              You will not be able to take the test after the specified date.
            </li>
            <li>Read the questions carefully and select your answer.</li>
          </Box>
          <Typography align="center" fontWeight={600}>
            Good luck on your test!
          </Typography>
        </Paper>
      </Grid>

      {/* User Information and Start Button Section */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: "1.5rem" }}>
          <Typography
            variant="body1"
            paragraph
            sx={{ textTransform: "capitalize" }}
          >
            <strong>Full Name:</strong> {quizData?.data.name}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Email:</strong> {quizData?.data.email}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Application no:</strong> {quizData?.data.application_number}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ marginTop: "1rem" }}
            onClick={handleStartTest}
          >
            Start Test
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Quiz;
