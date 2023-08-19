import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button, Stack, Typography } from "@mui/material";
import Pending from "./Pending";
import Elapsed from "./Elapsed";
import { useNavigate } from "react-router-dom";

const Tests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Tests</Typography>
        <Button onClick={() => navigate("create")}>Create New</Button>
      </Stack>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        centered
        sx={{
          "& .Mui-selected": {
            color: "black !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "black",
          },
        }}
      >
        <Tab label="Elapsed" />
        <Tab label="Pending" />
      </Tabs>
      {activeTab == 0 && <Elapsed />}
      {activeTab == 1 && <Pending />}
    </Box>
  );
};

export default Tests;
