import { Box, Paper, Stack, Typography } from "@mui/material";
import { completedTests } from "../../data/tests";
import { Test } from "../../types/test";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const navigate = useNavigate();
  return (
    <div>
      {completedTests.map((test: Test, index) => (
        <Box
          key={index}
          sx={{
            my: 3,
            p: 2,
            border: "2px solid #F5F5F5",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              cursor: "pointer",
            }}
            onClick={() =>
              navigate("completed", {
                state: test,
                preventScrollReset: true,
              })
            }
          >
            <Typography variant="h5" flex={1} component="h2">
              {test.title} {index === 0}
            </Typography>
            <Typography variant="subtitle1" flex={1}>
              Participants: {test.results?.length}
            </Typography>
            <Typography variant="subtitle1" sx={{ width: "220px" }}>
              Date: {new Date(test.datetime).toLocaleString()}
            </Typography>
          </Stack>
        </Box>
      ))}
    </div>
  );
};

export default Completed;
