import { Box, Button } from "@mui/material";
import TestEditor from "../../components/TestEditor";
import { Questions } from "../../types/questions";
import { useState } from "react";

const CreateTest = () => {
  const [questions, setQuestions] = useState<Questions>([
    {
      question: "",
      options: [
        { option: "", is_correct: false },
        { option: "", is_correct: false },
        { option: "", is_correct: false },
        { option: "", is_correct: false },
      ],
    },
  ]);

  return (
    <Box>
      <TestEditor questions={questions} setQuestions={setQuestions} />
      <Button onClick={() => console.log(questions)}>submit</Button>
    </Box>
  );
};

export default CreateTest;
