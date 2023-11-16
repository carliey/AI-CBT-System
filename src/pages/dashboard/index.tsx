import { Card, CardContent, Typography, Grid, Stack } from "@mui/material";
import { useGetUserStatsMutation } from "./dashboardApiSlice";
import { useEffect } from "react";

const Dashboard = () => {
  // Replace these values with your actual data or state
  const numberOfTestsCreated = 5;
  const numberOfTestsTaken = 3;
  const numberOfQuestionsAttempted = 100;
  const numberOfQuestionsCorrect = 80;
  const numberOfParticipantsTaken = 35;
  const numberOfParticipantsCreated = 50;

  const [getStats, { data }] = useGetUserStatsMutation();

  useEffect(() => {
    const getStatistics = async () => {
      try {
        await getStats().unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    getStatistics();
  }, []);

  console.log("stats", data);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Tests Created
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {numberOfTestsCreated}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Tests Taken
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {numberOfTestsTaken}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Questions Attempted
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {numberOfQuestionsAttempted}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Questions Correct
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {numberOfQuestionsCorrect}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Participants Created
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {numberOfParticipantsCreated}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Participants Taken
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {numberOfParticipantsTaken}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
