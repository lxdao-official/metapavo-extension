import React, { useContext, useEffect, useRef } from "react";
import useGlobal, { GlobalContext } from "../../context/global";
import { Box, Tabs, Tab, Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoonbirdsTab1, MoonbirdsTab2 } from "./moonbirdsTab";

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
        <Box sx={{ p: 0, overflowY: "scroll" }}>
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
  const rootRef = useRef<any>(null);
  const [hide, setHide] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<FavoriteIcon />} {...a11yProps(0)} />
          <Tab icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab icon={<FavoriteIcon />} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MoonbirdsTab1 />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MoonbirdsTab2 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}

export default Extention;
