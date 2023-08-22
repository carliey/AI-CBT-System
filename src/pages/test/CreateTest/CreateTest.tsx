import { Box, Button, Container, Stack, Typography } from "@mui/material";
import TestEditor from "../../../components/TestEditor";
import { Question } from "../../../types/questions";
import { useMemo, useState } from "react";
import TabSwitcher from "../../../components/TabSwitcher";
import ParticipantsTable from "./ParticipantsTable";
import { Participant } from "../../../types/participants";
import Settings from "./Settings";
import Questions from "./Questions";

const CreateTest = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Questions", "Settings"];

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

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ position: "sticky", top: 10 }}
      >
        <Typography variant="h6">Create Test</Typography>
        <Button variant="contained">Save</Button>
      </Stack>
      <Container maxWidth="md">
        <TabSwitcher
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />

        {activeTab === 1 && <Settings />}
        {activeTab === 0 && (
          <Questions questions={questions} setQuestions={setQuestions} />
        )}
      </Container>
    </Box>
  );
};

export default CreateTest;
