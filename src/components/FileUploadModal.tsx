import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function FileUploadModal(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <DialogTitle>Upload file(pdf)</DialogTitle>
      <DialogContent>
        <h3>content</h3>
      </DialogContent>
    </Dialog>
  );
}

export default FileUploadModal;
