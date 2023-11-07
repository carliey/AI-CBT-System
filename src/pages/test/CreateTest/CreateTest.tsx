import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Question } from "../../../types/test";
import { ChangeEvent, useState } from "react";
import TabSwitcher from "../../../components/TabSwitcher";
import Settings from "./Settings";
import Questions from "./Questions";
import { useCreateQuizMutation } from "../testApiSlice";
import { toast } from "react-toastify";
import { Participant } from "../../../types/participants";
import { useNavigate } from "react-router-dom";

export interface FormData {
  title: string;
  description: string;
  instructions: string;
  duration: number;
  date: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  instructions: "",
  duration: 0,
  date: "",
};

const CreateTest = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Settings", "Questions"];

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [createQuiz] = useCreateQuizMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [questions, setQuestions] = useState<Question[]>([
    // {
    //   text: "",
    //   options: [
    //     { option: "", is_correct: false },
    //     { option: "", is_correct: false },
    //     { option: "", is_correct: false },
    //     { option: "", is_correct: false },
    //   ],
    // },
  ]);

  const handleSaveTest = async () => {
    const testBody = {
      ...formData,
      questions,
      participants: participants,
    };

    //validation
    if (!formData.title) {
      return toast.error("Please enter title");
    }
    if (!formData.description) {
      return toast.error("Please enter description");
    }
    if (!formData.instructions) {
      return toast.error("Please enter instructions");
    }
    if (!formData.duration) {
      return toast.error("Please enter duration");
    }
    if (!formData.date) {
      return toast.error("Please select date");
    }
    if (!participants || participants.length < 1) {
      return toast.error("please add participants");
    }
    if (!questions || questions.length < 1) {
      return toast.error("please generate questions");
    }

    try {
      const res = await createQuiz(testBody).unwrap();
      if (res) {
        toast.success("test created successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
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
          <Questions questions={questions} setQuestions={setQuestions} />
        )}
        {activeTab === 0 && (
          <Settings
            formData={formData}
            handleChange={handleChange}
            participants={participants}
            setParticipants={setParticipants}
          />
        )}
      </Container>
    </Box>
  );
};

export default CreateTest;
