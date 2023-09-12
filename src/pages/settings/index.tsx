import Box from "@mui/material/Box";
import {  Paper, Stack, Typography } from "@mui/material";
import EditNameModal from "./EditNameModal";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

const Settings = () => {
 
  const [openEditName, setOpenEditName] = useState(false)
  const [openChangePassword, setOpenChangePassword] = useState(false)

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
        <Box className="box" onClick={()=>setOpenEditName(true)}>
          <Typography className="text">Account name</Typography>
          <EditNameModal open={openEditName} handleClose={()=>setOpenEditName(false)} />
        </Box>
        <Box className="box" onClick={()=>setOpenChangePassword(true)}>
          <Typography className="text">Password</Typography>
          <ChangePasswordModal open={openChangePassword} handleClose={()=>setOpenChangePassword(false)} />
        </Box>
        {/* <Box className="box">
          <Typography className="text">Appearance</Typography>
        </Box> */}
      </Paper>
    </Box>
  );
};

export default Settings;