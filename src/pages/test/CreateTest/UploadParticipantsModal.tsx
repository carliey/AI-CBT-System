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
import { Participant } from "../../../types/participants";

interface Props {
  open: boolean;
  onClose: () => void;
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
}

const UploadParticipantsModal = ({ open, onClose, setParticipants }: Props) => {
  const [extractParticipants] = useExtractParticipantsFromListMutation();

  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (data: FormData) => {
    try {
      const response = await extractParticipants(data).unwrap();
      setParticipants(response);
      toast.success("participant data successfully extracted ");
    } catch (error) {
      toast.error(
        "Failed to extract participant data, please check the file and try again"
      );
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

      if (uploadButtonRef?.current !== null) {
        uploadButtonRef.current.value = "";
      }

      onClose();
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
