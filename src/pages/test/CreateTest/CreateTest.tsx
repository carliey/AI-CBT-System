import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Question } from "../../../types/test";
import { ChangeEvent, useMemo, useState } from "react";
import TabSwitcher from "../../../components/TabSwitcher";
import Settings from "./Settings";
import Questions from "./Questions";
import { participants } from "../../../data/participants";

export interface FormData {
  title: string;
  description: string;
  instructions: string;
  duration: number;
  datetime: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  instructions: "",
  duration: 0,
  datetime: "",
};

const CreateTest = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Questions", "Settings"];

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [questions, setQuestions] = useState<Question[]>([
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

  const participantsList = useMemo(() => {
    return participants || [];
  }, []);

  const handleSaveTest = () => {
    const testBody = {
      ...formData,
      questions,
      participants: participantsList,
    };
    console.log(testBody);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ position: "sticky", top: 10 }}
      >
        <Typography variant="h6">Create Test</Typography>
        <Button variant="contained" onClick={handleSaveTest}>
          Save
        </Button>
      </Stack>
      <Container maxWidth="md">
        <TabSwitcher
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />

        {activeTab === 1 && (
          <Settings
            formData={formData}
            handleChange={handleChange}
            participants={participantsList}
          />
        )}
        {activeTab === 0 && (
          <Questions questions={questions} setQuestions={setQuestions} />
        )}
      </Container>
    </Box>
  );
};

export default CreateTest;
