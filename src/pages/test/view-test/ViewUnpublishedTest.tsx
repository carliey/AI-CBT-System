import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Option, Question, Test } from "../../../types/test";
import TabSwitcher from "../../../components/TabSwitcher";
import { ArrowBack, Check } from "@mui/icons-material";
import { optionTitle } from "../../../data/optionTitle";

const ViewUnpublishedTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const test = location.state as Test;

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Participants", "Questions"];

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          my: 3,
          p: 2,
          "& .label": {
            fontWeight: "bold",
          },
        }}
      >
        <Stack direction="row" alignItems={"center"}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>

          <Typography variant="h5" component="h2">
            {test.title}
          </Typography>
        </Stack>
        <Grid container mx={6} rowSpacing={1}>
          <Grid item xs={12}>
            <Typography>{test.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <span className="label"> Total Participants:</span>{" "}
              {test.participants?.length}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <span className="label">Total Submissions:</span>{" "}
              {test.results?.length}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <span className="label"> Date:</span>
              {test.date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <span className="label"> Duration: </span>
              {test.duration}
            </Typography>
          </Grid>
        </Grid>

        <TabSwitcher
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
        {activeTab == 0 && (
          <React.Fragment>
            <Table>
              <TableHead>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Application Number</TableCell>
                <TableCell align="left">Email</TableCell>
              </TableHead>
              <TableBody>
                {test.participants?.map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{participant.name}</TableCell>
                    <TableCell align="left">
                      {participant.application_number}
                    </TableCell>
                    <TableCell align="left">{participant.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* <Stack justifyContent={"center"} direction={"row"} my={2} gap={2}>
              <Button variant="outlined">PDF</Button>
              <Button variant="outlined">XLS</Button>
            </Stack> */}
            <Button variant="outlined">Print</Button>
          </React.Fragment>
        )}
        {activeTab == 1 && (
          <Box>
            {test.questions.map((question: Question, index: number) => (
              <Paper elevation={1} sx={{ p: 2, my: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Question {index + 1}.
                </Typography>
                <Grid container columnSpacing={10} rowSpacing={2}>
                  <Grid item xs={12}>
                    <Typography>{question.text}</Typography>
                  </Grid>
                  {question.options.map((option: Option, i: number) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Stack direction="row" alignItems="center">
                        <Typography>{optionTitle[i]}. &nbsp; </Typography>
                        <Typography
                          sx={{
                            borderBottom: "1px solid grey",
                            minWidth: "100px",
                          }}
                        >
                          {option.option}
                        </Typography>
                        {option.is_correct && (
                          // <Radio name="radio" checked={option.is_correct} />
                          <Check sx={{ color: "green" }} />
                        )}
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default ViewUnpublishedTest;
