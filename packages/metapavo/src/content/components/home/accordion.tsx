import React, { useContext, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";
import RemoveIcon from "@mui/icons-material/Remove";
import Extention from "./extention";
import useGlobal, { GlobalContext } from "../../context/global";
import { NoFound } from "./nofound";
import { Bottom_1, Bottom_2, Bottom_3, MetaPavo } from "../assets/Svgs";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Moonbirds from "../assets/Moonbirds.png";
import Pavo from "./pavo";
import { addFavByProjectId, removeFavByProjectId } from "../../../apis/nft_api";

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
            margin-left: 10px;
        }
        to {
            margin-left: -60px;
        }
      }
      .textScroll{
        -webkit-animation: slideshow 5s linear infinite;
        animation: slideshow 5s linear infinite;
      }
  .Mui-expanded{
    margin:0 !important;
    min-height:37px !important;
    align-items: center;
  }
  .MuiAccordionSummary-root{
    margin:0 !important;
    min-height:37px !important;
    height:37px;
    align-items: center;
  }
`;
const AccordionPage = () => {
  const { activeProject, activeAccoidion, setActiveAccoidion, gas, refreshActiveProject } =
    useContext(GlobalContext);
  const [btcprice, setBtcprice] = React.useState(0);
  const [ethprice, setEthprice] = React.useState(0);

  async function getPrice() {
    const result = await fetch("https://data.messari.io/api/v1/assets/eth/metrics/market-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "5b8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f",
      },
    });

    const data = await result.json();
    if (data.data && data.data.market_data) {
      const _ethprice = data.data.market_data.price_usd;
      setEthprice(_ethprice);
    }
    const resbtc = await fetch("https://data.messari.io/api/v1/assets/btc/metrics/market-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "5b8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f",
      },
    });

    const databtc = await resbtc.json();
    if (databtc.data && databtc.data.market_data) {
      const _btcprice = databtc.data.market_data.price_usd;
      setBtcprice(_btcprice);
    }
  }

  useEffect(() => {
    console.log("Accordion effect");
    // getPrice();
    if (activeProject) {
      setActiveAccoidion(1);
    }
  }, []);
  return (
    <div>
      <style type="text/css">{css}</style>
      <Accordion
        expanded={activeAccoidion === 0}
        onChange={() => setActiveAccoidion(0)}
        sx={{
          fontSize: "14px",
          m: "0px !important",
          border: "1px solid rgba(28, 27, 29, 0.04)",
          borderBottom: "none",
          boxShadow: "none",
          minHeight: "37px",
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
          <Typography
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
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: "#fff", overflowY: "auto", height: "calc(100vh - 108px)" }}
        >
          <Typography>{activeAccoidion === 0 ? <Pavo /> : null}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={activeAccoidion == 1}
        onChange={() => setActiveAccoidion(1)}
        sx={{
          fontSize: "14px",
          m: "0px !important",
          border: "1px solid rgba(28, 27, 29, 0.04)",
          borderBottom: "none",
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
          <Typography
            sx={{
              flexShrink: 0,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              color: "#1C1B1D",
            }}
          >
            {activeProject?.image_url ? (
              <Box
                component="img"
                src={activeProject?.image_url}
                sx={{ mr: 0.5, fontSize: "20px", height: "20px", width: "20px" }}
              />
            ) : null}
            <Box>{activeProject?.name || "UNKOWN"}</Box>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, backgroundColor: "#fff", boxShadow: "none" }}>
          {activeAccoidion === 1 ? activeProject ? <Extention /> : <NoFound /> : null}
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
          background: "#EBEBEB",
          overflow: "hidden",
          borderTop: "1px solid #E4E4E7",
        }}
      >
        <Box
          sx={{
            p: "10px",
            display: "flex",
            alignItems: "center",
            zIndex: 2,
            background: "#EBEBEB",
            height: "calc(100% - 1px)",
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
          />
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
            <Bottom_1 sx={{ mr: "5px", fontSize: "inherit", marginTop: "-2px" }} />
            <Box sx={{ fontWeight: 500, fontSize: "11px", lineHeight: "120%", color: "#616367" }}>
              {gas}gwei
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "10px",
            }}
          >
            <Bottom_2 sx={{ mr: "5px", fontSize: "inherit", marginTop: "-2px" }} />
            <Box sx={{ fontWeight: 500, fontSize: "11px", lineHeight: "120%", color: "#616367" }}>
              ${ethprice.toLocaleString()}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "10px",
            }}
          >
            <Bottom_3 sx={{ mr: "5px", fontSize: "inherit", marginTop: "-2px" }} />
            <Box sx={{ fontWeight: 500, fontSize: "11px", lineHeight: "120%", color: "#616367" }}>
              ${btcprice.toLocaleString()}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AccordionPage;
