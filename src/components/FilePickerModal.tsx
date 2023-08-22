import React, { useRef, useState, ChangeEvent } from "react";
import { CheckBox, PictureAsPdf, PlayCircleFilled } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Grid,
  ListItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { documents } from "../data/documents";
import { Document } from "../types/documents";
import { StyledTableCell, StyledTableRow } from "./styled/StyledTable";

interface FilePickerModalProps {
  open: boolean;
  handleClose: () => void;
  selectedDocument: Document | null;
  setSelectedDocument: React.Dispatch<React.SetStateAction<Document | null>>;
}

function FilePickerModal({
  open,
  handleClose,
  selectedDocument,
  setSelectedDocument,
}: FilePickerModalProps) {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const uploadButtonRef = useRef<HTMLInputElement>(null);

  //   const {
  //     data: media,
  //     isFetching: isFetchingMedia,
  //   } = useGetMediaQuery({
  //     type: `type/${fileType}`,
  //     page,
  //   });

  //   const [addMedia, { isLoading: uploadingMedia }] = useAddMediaMutation();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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
    <Dialog open={!!open} onClose={handleClose}>
      <Box className="page-body" sx={{ p: 2 }}>
        {/* header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            mb: 3,
            gap: 3,
          }}
        >
          <Typography variant="h5">Select from library</Typography>

          <Button
            sx={{ height: "40px" }}
            onClick={() => uploadButtonRef.current?.click()}
          >
            {loading ? "Uploading..." : "Select from device"}
          </Button>
          <input
            style={{ display: "none" }}
            type="file"
            ref={uploadButtonRef}
            onChange={handleImagePickerChange}
            accept={"pdf"}
          />
        </Box>
        {/* end of header */}
        {loading ? (
          <p>loading...</p>
        ) : (
          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Date Uploaded</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents?.map((document: Document) => (
                  <StyledTableRow
                    key={document.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => {
                      setSelectedDocument(document);
                      handleClose();
                    }}
                  >
                    <StyledTableCell component="th" scope="document">
                      <ListItem>{document.title}</ListItem>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {document.description}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {document.date_uploaded}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Pagination count={10} page={page} onChange={handleChangePage} />
          {/* <Button sx={{ height: "40px" }} onClick={handleClickDone}>
            Done
          </Button> */}
        </Box>
      </Box>
    </Dialog>
  );
}

export default FilePickerModal;
