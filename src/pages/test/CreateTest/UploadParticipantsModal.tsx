import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, useRef } from "react";
import { toast } from "react-toastify";
import { Participant } from "../../../types/participants";
import { read, utils } from "xlsx";

interface Props {
  open: boolean;
  onClose: () => void;
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
}

const UploadParticipantsModal = ({ open, onClose, setParticipants }: Props) => {
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  const handleFilePicker = function (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const wb = read(data); // the the workbook
        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        const res: Participant[] = utils.sheet_to_json(ws);
        if (res) {
          toast.success("Participant data successfully extracted");
        }
        setParticipants(
          res.map((participant) => ({
            name: participant.name,
            application_number: participant.application_number,
            email: participant.email,
          }))
        );
      };
      reader.readAsArrayBuffer(e.target.files[0]);

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
