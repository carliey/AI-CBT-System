import { Button, Paper, Stack, Typography } from "@mui/material";
import { Test } from "../../types/test";
import { useNavigate } from "react-router-dom";
import { pendingTests } from "../../data/tests";

const Unpublished = () => {
  const navigate = useNavigate();

  const handlePublish = (e: any) => {
    e.stopPropagation();
    console.log("handle unpublish");
  };
  return (
    <div>
      {pendingTests.map((test: Test, index) => (
        <Paper key={index} elevation={3} sx={{ my: 3, p: 2 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ cursor: "pointer" }}
            alignItems={"center"}
            onClick={() => {
              navigate("published", {
                state: test,
                preventScrollReset: true,
              });
            }}
          >
            <Typography variant="h5" flex={1} component="h2">
              {test.title} {index === 0}
            </Typography>
            <Typography variant="subtitle1" flex={1}>
              Participants: {test.participants?.length}
            </Typography>
            <Typography variant="subtitle1" sx={{ width: "220px" }}>
              Date: {new Date(test.datetime).toLocaleString()}
            </Typography>
            <Button variant="contained" onClick={handlePublish}>
              Publish
            </Button>
          </Stack>
        </Paper>
      ))}
    </div>
  );
};

export default Unpublished;
