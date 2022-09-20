import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProjectContainer from "../project/ProjectContainer";
import { GlobalContext } from "../../../context/useGlobal";
import { NoFound } from "./NoFound";
import { MetaPavo } from "../../assets/Svgs";
import Pavo from "../index/index";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import AlarmListPage from "../../../../plugins/alarmreminder/AlarmListPage";
import HisotryListPage from "../../../../plugins/history/HistoryListPage";
import WatchListPage from "../../../../plugins/watchlist/WatchListPage";
import Uniswap from "../../../../plugins/swap/uniswap";
import { getLang } from "../../../../../utils/lang";
import MyNftsListPage from "../../../../plugins/mynfts/MyNftsListPage";

const AccordionContainer = styled.div`
  div::-webkit-scrollbar {
    width: 0px;
  }

  div::-webkit-scrollbar-track {
    background-color: none;
  }

  div::-webkit-scrollbar-thumb {
    background-color: none;
  }

  div::-webkit-scrollbar-thumb:hover {
    background-color: none;
  }

  div::-webkit-scrollbar-thumb:active {
    background-color: none;
  }
  @keyframes slideshow {
    0% {
      margin-left: 5px;
    }
    to {
      margin-left: -281px;
    }
  }
  .textScroll {
    -webkit-animation: slideshow 20s linear infinite;
    animation: slideshow 20s linear infinite;
  }
  .Mui-expanded {
    margin: 0 !important;
    min-height: 37px !important;
    align-items: center;
  }
  .MuiAccordionSummary-root {
    margin: 0 !important;
    min-height: 37px !important;
    height: 37px;
    align-items: center;
  }
  .MuiAccordion-root:before {
    display: none !important;
  }
  .MuiAccordionSummary-expandIconWrapper {
    color: #d1d0d6 !important;
  }
  .MuiAccordionSummary-root {
    background: #efefef !important;
  }
  .MuiAccordionDetails-root {
    background: none !important;
  }
`;
const AccordionPage = () => {
  const { activeProject, activeAccoidion, setActiveAccoidion, refreshActiveProject } =
    useContext(GlobalContext);

  useEffect(() => {
    console.log("Accordion effect");

    if (activeProject) {
      setActiveAccoidion(1);
    }
  }, [activeProject]);

  return (
    <AccordionContainer>
      <Accordion
        expanded={activeAccoidion === 0}
        onChange={() => setActiveAccoidion(0)}
        sx={{
          fontSize: "14px",
          m: "0px !important",
          border: "none",
          borderBottom: "1px solid #E8E8E8",
          boxShadow: "none",
          minHeight: "37px",
          width: "100%",
        }}
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
          sx={{
            backgroundColor: "#EFEFEF",
            margin: "0",
          }}
        >
          <Box
            sx={{
              width: "33%",
              flexShrink: 0,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              color: "#1C1B1D",
            }}
          >
            <MetaPavo sx={{ mr: 0.5, fontSize: "20px", height: "20px" }} />
            MetaPavo
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#fcfcfc",
            overflowY: "auto",
            height: "calc(100vh - 108px)",
            padding: 0,
            borderTop: "1px solid #E8E8E8",
          }}
        >
          {activeAccoidion === 0 ? (
            <div>
              <Routes>
                <Route path="/index" element={<Pavo />} />
                <Route path="/alarms" element={<AlarmListPage />} />
                <Route path="/history" element={<HisotryListPage />} />
                <Route path="/watchlist" element={<WatchListPage />} />
                <Route path="/swap" element={<Uniswap />} />
                <Route path="/mynfts" element={<MyNftsListPage />} />
              </Routes>
            </div>
          ) : null}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={activeAccoidion == 1}
        onChange={() => setActiveAccoidion(1)}
        sx={{
          fontSize: "14px",
          m: "0px !important",
          border: "none",
          borderBottom: "1px solid #E8E8E8",
          alignItems: "center",
          boxShadow: "none",
        }}
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
          sx={{
            backgroundColor: "#EFEFEF",
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              color: "#1C1B1D",
              overflow: "hidden",
            }}
          >
            {activeProject?.imageUrl ? (
              <Box
                component="img"
                src={activeProject?.imageUrl}
                sx={{ mr: 0.5, fontSize: "20px", height: "20px", width: "20px" }}
              />
            ) : null}
            <Box sx={{ color: "#1C1B1D" }}>{activeProject?.name || getLang("UNKOWN")}</Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            p: 0,
            backgroundColor: "#fcfcfc",
            boxShadow: "none",
            height: "calc(100vh - 108px)",
            overflowY: "auto",
          }}
        >
          {activeAccoidion === 1 ? activeProject ? <ProjectContainer /> : <NoFound /> : null}
        </AccordionDetails>
      </Accordion>
    </AccordionContainer>
  );
};

export default AccordionPage;
