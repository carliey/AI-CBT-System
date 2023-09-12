import Box from "@mui/material/Box";
import {  Paper, Stack, Typography } from "@mui/material";

const Settings = () => {


  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Settings</Typography>
      </Stack>
      
      <Paper sx={{
        mt:4,
        "& .box":{
          borderBlock:"1px solid black",
          borderCollapse:"collapse",
          cursor:"pointer",
          p:4,
          "& .text":{
            color:'black'
          }
        }
      }}>
        <Box className="box">
          <Typography className="text">Account name</Typography>
        </Box>
        <Box className="box">
          <Typography className="text">Password</Typography>
        </Box>
        <Box className="box">
          <Typography className="text">Appearance</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;