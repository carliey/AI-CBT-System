import React from "react";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import Pending from "./Published";
import Elapsed from "./Completed";
import { useNavigate } from "react-router-dom";
import TabSwitcher from "../../components/TabSwitcher";
import Completed from "./Completed";
import Published from "./Published";
import Unpublished from "./Unpublished";

const Tests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = ["Completed", "Published", "Unpublished"];

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Tests</Typography>
        <Button onClick={() => navigate("create")}>Create New</Button>
      </Stack>
      <TabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      {activeTab == 0 && <Completed />}
      {activeTab == 1 && <Published />}
      {activeTab == 2 && <Unpublished />}
    </Box>
  );
};

export default Tests;
