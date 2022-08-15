import React, { useContext, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Extention from "./extention";

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
      svg{
        width:14px;
        height:14px;
      }
`;
const AccordionPage = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <style type="text/css">{css}</style>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ fontSize: "14px" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel1" ? (
              <RemoveIcon sx={{ fontSize: "14px" }} />
            ) : (
              <AddIcon sx={{ color: "#5B28EB", fontSize: "14px" }} />
            )
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontSize: "14px" }}>MetaPavo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: "14px" }}>MetaPavo</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ fontSize: "14px" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel2" ? (
              <RemoveIcon sx={{ fontSize: "14px" }} />
            ) : (
              <AddIcon sx={{ color: "#5B28EB", fontSize: "14px" }} />
            )
          }
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontSize: "14px" }}>Moonbirds</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Extention />
        </AccordionDetails>
      </Accordion>

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
            zIndex: 2,
            background: "#fff",
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
};

export default AccordionPage;
