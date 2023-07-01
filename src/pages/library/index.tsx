import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteForever, Edit, Search, Upload } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FileUploadModal from "../../components/FileUploadModal";
import { useState } from "react";

const rows: any[] = [
  {
    title: "Public service rules",
    description: "2008 edition",
    date_uploaded: "20/05/23",
    number_used: 24,
  },
  {
    title: "Current affairs",
    description: "2020",
    date_uploaded: "20/05/23",
    number_used: 37,
  },
];

export default function Library() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FileUploadModal onClose={handleClose} open={open} />
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <Typography>Documents</Typography>
        <Paper
          sx={{
            p: "0px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
          }}
          elevation={1}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search "
            size="small"
          />
          <IconButton type="button" sx={{ p: "10px" }}>
            <Search />
          </IconButton>
        </Paper>
        <Upload onClick={() => setOpen(true)} />
      </Stack>

      <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Date Uploaded</TableCell>
              <TableCell align="right">Used</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.date_uploaded}</TableCell>
                <TableCell align="right">{row.number_used}</TableCell>
                <TableCell align="right">
                  <Edit />
                </TableCell>
                <TableCell align="right">
                  <DeleteForever />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
