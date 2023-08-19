import { Tab, Tabs } from "@mui/material";
import React from "react";

type Props = {
  tabs: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

const TabSwitcher = ({ tabs, activeTab, setActiveTab }: Props) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
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
      {tabs.map((tab: string) => (
        <Tab label={tab} />
      ))}
    </Tabs>
  );
};

export default TabSwitcher;
