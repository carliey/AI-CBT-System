import {
  Box,
  Button,
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
import { useState } from "react";
import { Document } from "../../../types/documents";
import FilePickerModal from "../../../components/FilePickerModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const GenerateQuestionsModal = ({ open, onClose }: Props) => {
  const [openFilePicker, setOpenFilePicker] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const handleClickGenerate = () => {
    if (selectedDocument && numberOfQuestions && difficultyLevel) {
      console.log({
        selectedDocument,
        numberOfQuestions,
        difficultyLevel,
      });
    } else {
      alert("Please select all fields");
    }
  };

  const handleCloseFilePicker = () => {
    setOpenFilePicker(false);
  };
  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg">
      <DialogTitle>Generate Questions</DialogTitle>
      <DialogContent>
        <Stack alignItems="center" gap={1} my={2}>
          <Button onClick={() => setOpenFilePicker(true)} variant="outlined">
            Select Document
          </Button>
          {selectedDocument && (
            <Typography variant="caption">
              {" "}
              Generate from: <strong>{selectedDocument.title}</strong>
            </Typography>
          )}
          <FilePickerModal
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
            handleClose={handleCloseFilePicker}
            open={openFilePicker}
          />
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
        >
          Generate
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateQuestionsModal;
