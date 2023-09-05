import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const ViewCompletedTest = () => {
  return (
    <div>
      <h1>view completed test</h1>
      {/* {completedTests.map((test: Test, index) => (
        <Paper key={index} elevation={3} sx={{ my: 3, p: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Test {index + 1}: {test.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Participants: {test.results?.length}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Date: {new Date(test.datetime).toLocaleString()}
          </Typography>
          <List>
            {test.results?.map((result, resultIndex) => (
              <React.Fragment key={resultIndex}>
                <ListItem>
                  <ListItemText
                    primary={`${result.email} - Score: ${result.score}`}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
          <Button
            variant="outlined"
            color="secondary"
            // onClick={() => handleUnpublish(index)}
          >
            Unpublish
          </Button>
        </Paper>
      ))} */}
    </div>
  );
};

export default ViewCompletedTest;
