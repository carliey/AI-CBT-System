import Box from "@mui/material/Box";
import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import UpdateProfileModal from "./UpdateProfileModal";

const Settings = () => {
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Settings</Typography>
      </Stack>

      <Box
        sx={{
          mt: 4,
          "& .box": {
            borderBlock: "1px solid #F5F5F5",
            cursor: "pointer",
            p: 4,
            "& .text": {
              color: "black",
            },
          },
        }}
      >
        <Box className="box" onClick={() => setOpenUpdateProfile(true)}>
          <Typography className="text">Profile</Typography>
        </Box>
        <UpdateProfileModal
          open={openUpdateProfile}
          onClose={() => setOpenUpdateProfile(false)}
        />
        <Box className="box" onClick={() => setOpenChangePassword(true)}>
          <Typography className="text">Password</Typography>
        </Box>
        <ChangePasswordModal
          open={openChangePassword}
          onClose={() => setOpenChangePassword(false)}
        />
        {/* <Box className="box">
          <Typography className="text">Appearance</Typography>
        </Box> */}
      </Box>
    </Paper>
  );
};

export default Settings;
