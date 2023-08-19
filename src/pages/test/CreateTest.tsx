import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TestEditor from "../../components/TestEditor";
import { Questions } from "../../types/questions";
import { useState } from "react";
import TabSwitcher from "../../components/TabSwitcher";
import ParticipantsTable from "./ParticipantsTable";

const CreateTest = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Questions", "Settings"];

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

        {activeTab === 0 && (
          <>
            <Card elevation={2} sx={{ my: 2 }}>
              <CardContent>
                <TextField
                  fullWidth
                  placeholder="Test Title"
                  variant="standard"
                />
                <TextField
                  fullWidth
                  placeholder="Test Description"
                  variant="standard"
                />
              </CardContent>
            </Card>
            <TestEditor questions={questions} setQuestions={setQuestions} />
          </>
        )}
        {activeTab === 1 && <ParticipantsTable />}
      </Container>
    </Box>
  );
};

export default CreateTest;
