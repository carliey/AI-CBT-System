import { Box, Typography } from "@mui/material";
import { completedTests } from "../../data/tests";
import { Test } from "../../types/test";

const Completed = () => {
  return (
    <div>
      {completedTests.map((test: Test) => (
        <Box key={test.id}>
          <Typography>{test.title}</Typography>
        </Box>
      ))}
    </div>
  );
};

export default Completed;
