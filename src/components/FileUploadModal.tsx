import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Button, DialogContent, Typography } from "@mui/material";
import { useRef, useState } from "react";

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
}

function FileUploadModal({ onClose, open }: FileUploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const uploadingMedia = false;
  const imageButtonRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    onClose();
  };

  const uploadFile = async (data: any) => {
    try {
      // const response = await addMedia(data).unwrap();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    if (e.type === "dragover" || e.type === "dragenter") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDragEnd = (e: any) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const data = new FormData();
      data.append("file", file);
      uploadFile(data);
    }
  };

  const handleImagePickerChange = function (e: any) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      // uploadFile(data);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg">
      <DialogTitle>Upload file(pdf)</DialogTitle>
      <DialogContent>
        <Box
          className="body"
          id="drop_zone"
          onDrop={handleDragEnd}
          onDragOver={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          sx={{
            backgroundColor: "#fff",
            textAlign: "center",
            margin: "20px 40px 40px 40px",
            padding: "50px",
            border: "1px dashed",
            borderColor: dragActive ? "green" : "primary.main",
          }}
        >
          {dragActive ? (
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: "42px",
              }}
            >
              Drop files here
            </Typography>
          ) : (
            <>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "28px",
                  lineHeight: "42px",
                }}
              >
                Drop file here
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "28px",
                  lineHeight: "42px",
                  margin: "20px auto",
                }}
              >
                OR
              </Typography>
              <Button
                variant="contained"
                onClick={() => imageButtonRef?.current?.click()}
                disabled={uploadingMedia}
              >
                {uploadingMedia ? "Uploading..." : "Select file"}
              </Button>
              <input
                style={{ display: "none" }}
                type="file"
                ref={imageButtonRef}
                onChange={handleImagePickerChange}
                accept=".pdf"
              />
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default FileUploadModal;
