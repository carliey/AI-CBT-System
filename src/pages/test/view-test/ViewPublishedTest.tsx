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
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Option, Question, Quiz } from "../../../types/test";
import TabSwitcher from "../../../components/TabSwitcher";
import { ArrowBack, Check } from "@mui/icons-material";
import { optionTitle } from "../../../data/optionTitle";
import { useReactToPrint } from "react-to-print";
import { useAppSelector } from "../../../app/hooks";
import { selectCurrentUser } from "../../auth/authSlice";

const ViewPublishedTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const componentToPrintRef = useRef(null);

  const test = location.state as Quiz;

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Questions", "Participants", "Results"];

  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current || null,
  });

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
              <span className="label"> Date:</span>{" "}
              {new Date(test.date).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <span className="label"> Duration: </span>
              {test.duration} minutes
            </Typography>
          </Grid>
        </Grid>

        <TabSwitcher
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
        {activeTab == 0 && (
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
        {activeTab == 1 && (
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
          </React.Fragment>
        )}
        {activeTab == 2 && (
          <React.Fragment>
            <Table>
              <TableHead>
                <TableCell align="left">S/N</TableCell>
                <TableCell>Application number</TableCell>
                <TableCell>name</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Score</TableCell>
              </TableHead>
              <TableBody>
                {test.results?.map((result, resultIndex) => (
                  <TableRow key={resultIndex}>
                    <TableCell>{resultIndex + 1}</TableCell>
                    <TableCell>
                      {result.participant.application_number}
                    </TableCell>
                    <TableCell>{result.participant.name}</TableCell>
                    <TableCell>{result.participant.email}</TableCell>
                    <TableCell>{result.correct_answers}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack justifyContent={"center"} direction={"row"} my={2} gap={2}>
              {/* <Button variant="outlined">PDF</Button>
              <Button variant="outlined">XLS</Button> */}
              <Button variant="outlined" onClick={handlePrint}>
                Print
              </Button>
            </Stack>
          </React.Fragment>
        )}
      </Paper>
      <div style={{ display: "none" }}>
        <Box
          ref={componentToPrintRef}
          sx={{
            p: 2,
            textAlign: "center",
          }}
        >
          <h2 style={{ textTransform: "uppercase" }}>{user.name}</h2>
          <h3 style={{ textTransform: "uppercase" }}>
            {test.title} test result
          </h3>
          <Table>
            <TableHead>
              <TableCell align="left">S/N</TableCell>
              <TableCell>Application number</TableCell>
              <TableCell>name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Score</TableCell>
            </TableHead>
            <TableBody>
              {test.results?.map((result, resultIndex) => (
                <TableRow key={resultIndex}>
                  <TableCell>{resultIndex + 1}</TableCell>
                  <TableCell>{result.participant.application_number}</TableCell>
                  <TableCell>{result.participant.name}</TableCell>
                  <TableCell>{result.participant.email}</TableCell>
                  <TableCell>{result.correct_answers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </div>
    </div>
  );
};

export default ViewPublishedTest;
