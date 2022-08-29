import React, { useRef } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { ProjectTab } from "./ProjectMain";
import { Mortar_board, Mortar_board_1 } from "../../../assets/Svgs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, overflowY: "scroll", height: "calc(100vh - 156px)" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Extention() {
  const [hide, setHide] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ backgroundColor: "#fff" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ backgroundColor: "#FDFDFD" }}
        >
          <Tab
            icon={
              value == 0 ? (
                <Mortar_board sx={{ width: "20px", height: "20px" }} />
              ) : (
                <Mortar_board_1 sx={{ width: "20px", height: "20px" }} />
              )
            }
            {...a11yProps(0)}
            sx={{ flex: 1 }}
          />
          {/* <Tab
            icon={
              value == 1 ? (
                <Graph sx={{ width: "20px", height: "20px" }} />
              ) : (
                <Graph_1 sx={{ width: "20px", height: "20px" }} />
              )
            }
            {...a11yProps(1)}
            sx={{ flex: 1 }}
          />
          <Tab
            icon={
              value == 2 ? (
                <Checklist sx={{ width: "20px", height: "20px" }} />
              ) : (
                <Checklist_1 sx={{ width: "20px", height: "20px" }} />
              )
            }
            {...a11yProps(2)}
            sx={{ flex: 1 }}
          /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProjectTab />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <MoonbirdsTab2 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MoonbirdsTab3 />
      </TabPanel> */}
    </div>
  );
}

export default Extention;
