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
import { useExtractTextMutation } from "../testApiSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const GenerateQuestionsModal = ({ open, onClose }: Props) => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const uploadButtonRef = useRef<HTMLInputElement>(null);
  const [extractText] = useExtractTextMutation();

  const handleClickGenerate = () => {
    if (selectedDocument && numberOfQuestions && difficultyLevel) {
      console.log({
        selectedDocument,
        numberOfQuestions,
        difficultyLevel,
      });
    } else {
      toast.error("Please all fields");
    }
  };

  const uploadFile = async (data: FormData) => {
    try {
      // const base_url = import.meta.env.VITE_API_URL;

      // console.log(base_url);
      // const response = await fetch(`http://localhost:5051/extract-text`, {
      //   method: "POST",
      //   body: data,
      // });

      // if (response.ok) {
      //   const result = await response.text();
      //   console.log("File uploaded:", result);
      //   // Handle the response as needed
      // } else {
      //   throw new Error("Failed to upload the file");
      // }
      const res = await extractText(data).unwrap();
      console.log(res.text);
      toast.success("Text extracted successfully");
    } catch (error) {
      toast.error("failed to upload media");
      console.log(error);
    }
  };

  // const reader = new FileReader();

  // reader.onload = async (event: any) => {
  //   const fileBuffer = event.target.result;

  //   if (file.type === "application/pdf") {
  //     const pdf = await pdfjs.getDocument({ data: fileBuffer }).promise;
  //     const pdfText = await getPageText(pdf);
  //     console.log("PDF Text:", pdfText);
  //   } else if (
  //     file.type ===
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  //   ) {
  //     const mammothResult = await mammoth.extractRawText({
  //       arrayBuffer: fileBuffer,
  //     });
  //     const wordText = mammothResult.value;
  //     console.log("Word Text:", wordText);
  //   }
  // };

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
