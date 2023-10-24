import { Paper } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
const Appbar = () => {
  return (
    <Paper
      sx={{ p: 2, borderBottom: "1px solid #f3f3f3", backgroundColor: "white" }}
    >
      <ComputerIcon fontSize="large" />
    </Paper>
  );
};

export default Appbar;
