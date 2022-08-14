import React, { useRef } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoonbirdsTab1, MoonbirdsTab2 } from "./moonbirdsTab";

const css = `
::-webkit-scrollbar {
  width: 0px;
}
 
::-webkit-scrollbar-track {
  background-color: none;
}
 
::-webkit-scrollbar-thumb {
  background-color: none;
}
 
::-webkit-scrollbar-thumb:hover {
  background-color: none;
}
 
::-webkit-scrollbar-thumb:active {
  background-color: none;
}
@keyframes slideshow {
        0% {
            margin-left: 0;
        }
        to {
            margin-left: -60px;
        }
      }
      .textScroll{
        -webkit-animation: slideshow 5s linear infinite;
        animation: slideshow 5s linear infinite;
      }
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
    >
      {value === index && (
        <Box sx={{ p: 0, overflowY: "scroll", height: "calc(100vh - 200px)" }}>
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
      <style type="text/css">{css}</style>
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
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          alignItems: "center",
          bottom: 0,
          width: "100%",
          height: "32px",
          background: "#fff",
          overflow: "hide",
        }}
      >
        <Box
          sx={{
            p: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "12px",
              height: "12px",
              background: "#37CA12",
              border: "1px solid #49BD4A",
              borderRadius: "100px",
              mr: "10px",
            }}
          ></Box>
          <Box
            sx={{
              fontWeight: 500,
              fontSize: "13px",
              lineHeight: "16px",
              color: "#1C1B1D",
              mr: "10px",
            }}
          >
            Ethereum
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "calc(100% - 102px)",
            overflow: "hide",
          }}
          className="textScroll"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "10px",
            }}
          >
            <Box sx={{ mr: "5px" }}>#</Box>
            <Box sx={{ fontWeight: 500, fontSize: "11px", lineHeight: "120%", color: "#616367" }}>
              31gwei
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "10px",
            }}
          >
            <Box sx={{ mr: "5px" }}>#</Box>
            <Box sx={{ fontWeight: 500, fontSize: "11px", lineHeight: "120%", color: "#616367" }}>
              $1,350
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "10px",
            }}
          >
            <Box sx={{ mr: "5px" }}>#</Box>
            <Box sx={{ fontWeight: 500, fontSize: "11px", lineHeight: "120%", color: "#616367" }}>
              1233,992,212
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Extention;
