import { useState } from "react";
import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  Input,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import {
  Check,
  ControlPoint,
  DeleteOutline,
  North,
  SmartToy,
  South,
} from "@mui/icons-material";
import { Option, Question, Questions } from "../types/test";
import GenerateQuestionsModal from "../pages/test/CreateTest/GenerateQuestionsModal";
import { optionTitle } from "../data/optionTitle";

interface Props {
  questions: Questions;
  setQuestions: React.Dispatch<React.SetStateAction<Questions>>;
  deleteQuestion?: () => void;
}

function TestEditor({ questions, setQuestions, deleteQuestion }: Props) {
  const [isDeletingBlock, setIsDeletingBlock] = useState(null);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [targetBlock, setTargetBlock] = useState(null); // to target which block to add loading to
  const [openGenerator, setOpenGenerator] = useState(false);

  const handleAddQuestion = () => {
    setQuestions((prev: Questions) => [
      ...prev,
      {
        text: "",
        options: [
          { option: "", is_correct: false },
          { option: "", is_correct: false },
          { option: "", is_correct: false },
          { option: "", is_correct: false },
        ],
      },
    ]);
  };

  const handleMoveUp = (index: number, item: Question) => {
    const newQuestions = questions;
    newQuestions.splice(index, 1);
    newQuestions.splice(index - 1, 0, item);
    setQuestions([...newQuestions]);
  };

  const handleMoveDown = (index: number, item: Question) => {
    const newQuestions = questions;
    newQuestions.splice(index, 1);
    newQuestions.splice(index + 1, 0, item);
    setQuestions([...newQuestions]);
  };

  const handleDeleteQuestion = async (index: number) => {
    if (questions[index]?.id) {
      // if it has id, it remove from endpoint
      //   let isDeleted = await deleteBlock(questions[index]);
      const isDeleted = true;
      if (isDeleted) {
        // remove from array
        const newQuestions = questions;
        newQuestions.splice(index, 1);
        setQuestions([...newQuestions]);
      }
    } else {
      // remove from array
      const newQuestions = questions;
      newQuestions.splice(index, 1);
      setQuestions([...newQuestions]);
    }
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    param: { question: Question; questionIndex: number; optionIndex?: number }
  ) => {
    const { name, value } = e.target;
    const { question, questionIndex, optionIndex } = param;

    let newQuestion;
    if (name === "question") {
      newQuestion = {
        ...question,
        text: value,
      };
    }

    if (name === "option" && optionIndex !== undefined) {
      const options = question.options; //create a copy of the options array
      const newOption = options[optionIndex]; //get the prev state of target option

      options[optionIndex] = { ...newOption, option: value }; // spread the prev state and append the change

      newQuestion = {
        ...question,
        options: options,
      };
      //also append the change in the new question object
    }

    if (name === "radio" && optionIndex !== undefined) {
      const options = question.options.map((option, index) => ({
        ...option,
        is_correct: index === optionIndex,
      }));

      newQuestion = {
        ...question,
        options: options,
      };
    }

    const copy = questions; //create a copy of the questions state
    if (newQuestion !== undefined) {
      // check if new question has been assigned
      copy[questionIndex] = newQuestion; // make changes to the copied array
    }

    setQuestions([...copy]);
  };

  return (
    <Box
      className="container"
      sx={{
        color: "grey.dark",
        "& .card": {
          width: "100%",
          my: 2,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        },
        "& .card-heading": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& .title": {
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "36px",
          },
        },

        "& .hide": {
          display: "none",
        },

        "& .btn ": {
          padding: "10px",
          display: "flex",
          gap: "6px",
          alignItems: "center",
          cursor: "pointer",
        },

        "& .btn-icon ": {
          border: " 1px solid grey.dark",
          borderRadius: "100%",
          width: "16px",
          display: "inline",
        },
      }}
    >
      <Box className="main-content">
        {/* {questions?.map((question: Question, index: number) => (
          <Card elevation={2} className="card" key={index}>
            <Box className="card-heading">
              <Typography className="title">Question {index + 1}.</Typography>
              <ButtonGroup
                sx={{
                  backgroundColor: "white",
                  color: "grey.dark",
                  borderColor: "grey.dark",
                }}
                size="small"
                aria-label="small button group"
              >
                <Button
                  sx={{
                    borderColor: "grey.dark",
                    color: "grey.dark",
                    p: 0,
                  }}
                  title="move up"
                  disabled={index === 0}
                  onClick={() => handleMoveUp(index, question)}
                >
                  <North />
                </Button>
                <Button
                  sx={{
                    borderColor: "grey.dark",
                    color: "grey.dark",
                    p: 0,
                  }}
                  title="move down"
                  disabled={index === questions.length - 1}
                  onClick={() => handleMoveDown(index, question)}
                >
                  <South />
                </Button>
                <Button
                  sx={{
                    borderColor: "grey.dark",
                    color: "grey.dark",
                    p: 0,
                  }}
                  title="delete"
                  //   onClick={() =>
                  //     setConfirmation({
                  //       message:
                  //         "Are you sure you want to delete this block and its content?",
                  //       action: () => handleDeleteQuestion(index),
                  //     })
                  //   }
                  onClick={() => handleDeleteQuestion(index)}
                  disabled={isDeletingBlock === index}
                >
                  {isDeletingBlock === index ? (
                    <Typography>Loading</Typography>
                  ) : (
                    <DeleteOutline />
                  )}
                </Button>
              </ButtonGroup>
            </Box>
            <Box>
              <textarea
                style={{ width: "100%" }}
                name="question"
                placeholder="type question here"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleQuestionChange(e, { question, questionIndex: index })
                }
                value={question?.text}
              />
              <Grid container columnSpacing={10} rowSpacing={2}>
                {question.options.map((option: Option, i: number) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Stack direction="row" alignItems="start">
                      <Input
                        fullWidth
                        placeholder="Option"
                        name="option"
                        value={option.option}
                        onChange={(e) =>
                          handleQuestionChange(e, {
                            question,
                            questionIndex: index,
                            optionIndex: i,
                          })
                        }
                      />
                      <Radio
                        name="radio"
                        checked={option.is_correct}
                        disabled
                        onChange={(e) =>
                          handleQuestionChange(e, {
                            question,
                            questionIndex: index,
                            optionIndex: i,
                          })
                        }
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Card>
        ))} */}

        {questions.map((question: Question, index: number) => (
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

        <Stack direction="row" width="100%" justifyContent={"space-between"}>
          <Button
            variant="outlined"
            startIcon={<ControlPoint />}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>
          <Button
            variant="contained"
            startIcon={<SmartToy />}
            onClick={() => setOpenGenerator(true)}
          >
            Generate
          </Button>
          <GenerateQuestionsModal
            open={openGenerator}
            onClose={() => setOpenGenerator(false)}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default TestEditor;
