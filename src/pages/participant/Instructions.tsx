import { Button, Container, Grid, Paper, Typography } from "@mui/material";

const Instructions = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
      }}
    >
      <Grid
        container
        spacing={5}
        alignContent={"stretch"}
        alignItems={"center"}
      >
        {/* Welcome and Test Instructions Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "1.5rem" }}>
            <Typography variant="h4" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body1" paragraph>
              Please read carefully before you proceed.
            </Typography>
            <Typography variant="body1" paragraph>
              You are participating in the FRSC - Marshal basic course test
              2023.
            </Typography>
            <Typography variant="body1" paragraph>
              This test consists of multiple-choice questions on various topics.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Duration: </strong>
              60 minutes
            </Typography>

            <Typography variant="h6">Test Instructions:</Typography>
            <ol>
              <li>
                Once you begin the test, a timer will start automatically, and
                you will not be able to pause it.
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
                Please ensure that you have enough time to complete the test
                before you start.
              </li>
            </ol>
            <Typography>Good luck with your test!</Typography>
          </Paper>
        </Grid>

        {/* User Information and Start Button Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "1.5rem" }}>
            <Typography variant="body1" paragraph>
              <strong>Name:</strong> John doe
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> Johndoe@email.com
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              style={{ marginTop: "1rem" }}
            >
              Start Test
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Instructions;
