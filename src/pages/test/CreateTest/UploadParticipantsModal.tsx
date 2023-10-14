import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, useRef } from "react";
import { useExtractParticipantsFromListMutation } from "../testApiSlice";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UploadParticipantsModal = ({ open, onClose }: Props) => {
  const [extractParticipants] = useExtractParticipantsFromListMutation();

  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (data: FormData) => {
    try {
      console.log("data", data);

      for (const value of data.values()) {
        console.log("data", value);
      }

      const response = await extractParticipants(data).unwrap();
      console.log(response);
      //   setSelectedDocument(response?.media[0]?.url); // automatically select file
      toast.success("Media uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload media");
      console.log(error);
    }
  };

  const handleFilePicker = function (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      const data = new FormData();
      data.append("excel", file);

      uploadFile(data);
    }
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg">
      <DialogTitle>
        Upload List<span style={{ fontSize: "14px" }}>(spreandsheet)</span>
      </DialogTitle>
      <DialogContent>
        <Stack alignItems="center" gap={1} my={2}>
          <Button
            onClick={() => uploadButtonRef.current?.click()}
            variant="outlined"
          >
            Select File
          </Button>
          <input
            style={{ display: "none" }}
            type="file"
            ref={uploadButtonRef}
            onChange={handleFilePicker}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />

          <Typography variant="caption">
            <strong>selected file title</strong>
          </Typography>
        </Stack>

        {/* <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => alert("upload")}
          disabled={isLoading}
        >
          {isLoading ? "loading" : "Upload"}
        </Button> */}
      </DialogContent>
    </Dialog>
  );
};

export default UploadParticipantsModal;
