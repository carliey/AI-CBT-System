import React, { useState } from "react";
import { Question } from "../../../types/test";
import TestEditor from "../../../components/TestEditor";
import { Button, Stack } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import GenerateQuestionsModal from "./GenerateQuestionsModal";

type Props = {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

const Questions = ({ questions, setQuestions }: Props) => {
  const [openGenerator, setOpenGenerator] = useState(false);

  return (
    <div>
      <TestEditor questions={questions} setQuestions={setQuestions} />
      <Stack direction="row" width="100%" justifyContent={"center"} my={4}>
        <Button
          variant="contained"
          startIcon={<SmartToy />}
          onClick={() => setOpenGenerator(true)}
        >
          {questions.length > 1 ? "Regenerate" : "Generate"}
        </Button>
        <GenerateQuestionsModal
          open={openGenerator}
          setQuestions={setQuestions}
          handleClose={() => setOpenGenerator(false)}
        />
      </Stack>
    </div>
  );
};

export default Questions;
