import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import AlarmList from "./alarmList";
import FavList from "./favList";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-popop";

document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const RootElement = styled.div`
  width: 400px;
  height: 400px;
  padding: 10px;
`;
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
      style={{ padding: "10px 0" }}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
function Page() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Alarm List" />
          <Tab label="Watch List" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AlarmList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FavList />
      </TabPanel>
    </Box>
  );
}
root.render(
  <React.StrictMode>
    <RootElement>
      <Page />
    </RootElement>
  </React.StrictMode>,
);
