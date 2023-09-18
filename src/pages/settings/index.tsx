import Box from "@mui/material/Box";
import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import UpdateProfileModal from "./UpdateProfileModal";

const Settings = () => {
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Settings</Typography>
      </Stack>

      <Paper
        sx={{
          mt: 4,
          "& .box": {
            borderBlock: "1px solid black",
            borderCollapse: "collapse",
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
      </Paper>
    </Box>
  );
};

export default Settings;
