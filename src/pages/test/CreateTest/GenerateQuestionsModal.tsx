import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  useExtractTextMutation,
  useGenerateQuestionsMutation,
} from "../testApiSlice";
import { Question } from "../../../types/test";

interface Props {
  open: boolean;
  handleClose: () => void;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const GenerateQuestionsModal = ({ open, handleClose, setQuestions }: Props) => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const uploadButtonRef = useRef<HTMLInputElement>(null);
  const [extractText] = useExtractTextMutation();
  const [generateQuestions, { isLoading: isGeneratingQuestions }] =
    useGenerateQuestionsMutation();

  const handleClickGenerate = async () => {
    try {
      if (!selectedDocument || !numberOfQuestions || !difficultyLevel) {
        return toast.error("Please all fields");
      }
      const body = {
        text: extractedText,
        number_of_questions: numberOfQuestions,
        difficulty_level: parseInt(difficultyLevel),
      };

      const result = await generateQuestions(body).unwrap();
      setQuestions(result.data);
      handleClose();
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong, please try again");
    }
  };

  const uploadFile = async (data: FormData) => {
    try {
      const res = await extractText(data).unwrap();
      toast.success("Text extracted successfully");
      setExtractedText(res.text);
    } catch (error) {
      toast.error("failed to upload media, please try again");
      console.log(error);
    }
  };

  const handleImagePickerChange = function (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      setSelectedDocument(file);
      uploadFile(formData);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg">
      <DialogTitle sx={{ width: "400px" }}>Generate Questions</DialogTitle>
      <DialogContent>
        <Stack alignItems="center" gap={1} my={2}>
          <input
            style={{ display: "none" }}
            type="file"
            ref={uploadButtonRef}
            onChange={handleImagePickerChange}
            accept={"pdf"}
          />
          <Button
            onClick={() => uploadButtonRef.current?.click()}
            variant="outlined"
          >
            Select Document
          </Button>
          {selectedDocument && (
            <Typography variant="caption">
              Generate from: <strong>{selectedDocument.name}</strong>
            </Typography>
          )}
        </Stack>
        <Stack direction={"column"} gap={2} mb={2}>
          <FormControl>
            <TextField
              type="number"
              label="number of questions"
              size="small"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
            />
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Questions Difficulty
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Questions Difficulty"
              value={difficultyLevel}
              onChange={(e: SelectChangeEvent) =>
                setDifficultyLevel(e.target.value)
              }
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleClickGenerate}
          disabled={isGeneratingQuestions}
        >
          {isGeneratingQuestions ? <CircularProgress /> : "Generate"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateQuestionsModal;
