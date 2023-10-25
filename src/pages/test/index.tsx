import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TabSwitcher from "../../components/TabSwitcher";
import Completed from "./Completed";
import Published from "./Published";
import Unpublished from "./Unpublished";
import { useGetQuizzesQuery } from "./testApiSlice";

const Tests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = ["Completed", "Published", "Unpublished"];

  const { data: quizes } = useGetQuizzesQuery();
  console.log("quizes", quizes);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Tests</Typography>
        <Button variant="outlined" onClick={() => navigate("create")}>
          Create New
        </Button>
      </Stack>
      <TabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      {activeTab == 0 && <Completed />}
      {activeTab == 1 && <Published />}
      {activeTab == 2 && <Unpublished />}
    </Paper>
  );
};

export default Tests;
