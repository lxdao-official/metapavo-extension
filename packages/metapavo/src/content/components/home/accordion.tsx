import React, { useContext, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Extention from "./extention";
import useGlobal, { GlobalContext } from "../../context/global";
import { NoFound } from "./nofound";
import { Bottom_1, Bottom_2, Bottom_3 } from "../assets/Svgs";

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
const AccordionPage = () => {
  const { activeProject, activeAccoidion, setActiveAccoidion } = useContext(GlobalContext);

  return (
    <div>
      <style type="text/css">{css}</style>
      <Accordion
        expanded={activeAccoidion === 0}
        onChange={() => setActiveAccoidion(0)}
        sx={{ fontSize: "14px" }}
      >
        <AccordionSummary
          expandIcon={
            activeAccoidion === 0 ? (
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
        expanded={activeAccoidion == 1}
        onChange={() => setActiveAccoidion(1)}
        sx={{ fontSize: "14px" }}
      >
        <AccordionSummary
          expandIcon={
            activeAccoidion === 1 ? (
              <RemoveIcon sx={{ fontSize: "14px" }} />
            ) : (
              <AddIcon sx={{ color: "#5B28EB", fontSize: "14px" }} />
            )
          }
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontSize: "14px" }}>
            {activeProject?.name || "unknown"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {activeProject ? <Extention /> : <NoFound />}
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
            <Bottom_1 sx={{ mr: "5px", fontSize: "inherit" }} />
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
            <Bottom_2 sx={{ mr: "5px", fontSize: "inherit" }} />
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
            <Bottom_3 sx={{ mr: "5px", fontSize: "inherit" }} />
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
