import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UploadParticipantsModal = ({ open, onClose }: Props) => {
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (data: FormData) => {
    try {
      //   const response = await addMedia(data).unwrap();
      //   setSelectedDocument(response?.media[0]?.url); // automatically select file
      alert({ status: "success", message: "Media uploaded successfully" });
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
            onChange={handleImagePickerChange}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />

          <Typography variant="caption">
            <strong>selected file title</strong>
          </Typography>
        </Stack>

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => alert("upload")}
        >
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UploadParticipantsModal;
