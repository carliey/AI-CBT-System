import {
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
import { ChangeEvent, useRef, useState } from "react";
import { Document } from "../../../types/documents";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
}

const GenerateQuestionsModal = ({ open, onClose }: Props) => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const handleClickGenerate = () => {
    if (selectedDocument && numberOfQuestions && difficultyLevel) {
      console.log({
        selectedDocument,
        numberOfQuestions,
        difficultyLevel,
      });
    } else {
      toast.error("Please enter all fields");
    }
  };

  const uploadFile = async (data: FormData) => {
    try {
      //   const response = await addMedia(data).unwrap();
      //   setSelectedDocument(response?.media[0]?.url); // automatically select file
    } catch (error) {
      alert({ status: "error", message: "Failed to upload media" });
      console.log(error);
    }
  };

  const handleImagePickerChange = function (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      setSelectedDocument(file);
      uploadFile(data);
    }
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg">
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
        >
          Generate
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateQuestionsModal;
