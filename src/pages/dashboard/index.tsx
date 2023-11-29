import { Card, CardContent, Typography, Grid, Stack } from "@mui/material";
import { useGetUserStatsMutation } from "./dashboardApiSlice";
import { useEffect } from "react";

const Dashboard = () => {
  // Replace these values with your actual data or state

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
                  {data?.totalTestsCreated}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Tests Taken
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {data?.totalTestsTaken}
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
                  {/* {data?.totalParticipantsTakenTests} */}-
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Questions Correct
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {/* {data?.totalQuestionsAnsweredCorrectly} */}-
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
                  -{" "}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Participants Taken
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  -{" "}
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
