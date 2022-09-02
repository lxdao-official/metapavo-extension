import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../context/useGlobal";
import { Bottom_1, Bottom_2, Bottom_3 } from "../../assets/Svgs";

const TextScrollStyle = styled.div`
  @keyframes slideshow {
    0% {
      margin-left: 5px;
    }
    to {
      margin-left: -281px;
    }
  }
  display: flex;
  align-items: center;
  width: calc(100% - 102px);
  overflow: hide;
  flex-wrap: nowrap;
  -webkit-animation: slideshow 20s linear infinite;
  animation: slideshow 20s linear infinite;
`;
export default function Bottom() {
  const [btcprice, setBtcprice] = React.useState(0);
  const [ethprice, setEthprice] = React.useState(0);
  const [gas, setGas] = React.useState(0);

  let alreadyFetchPrice = false;
  async function getPrice() {
    chrome.runtime.sendMessage(
      {
        cmd: "getGas",
      },
      function (response) {
        if (!chrome.runtime.lastError) {
          setGas(response);
        } else {
        }
      },
    );
    if (alreadyFetchPrice) {
      return;
    }
    alreadyFetchPrice = true;
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
  const scrollData = [
    {
      icon: <Bottom_1 sx={{ mr: "5px", width: "14px", height: "14px", marginTop: "-2px" }} />,
      name: `${gas}gwei`,
      width: "53px",
    },
    {
      icon: <Bottom_2 sx={{ mr: "5px", width: "14px", height: "14px", marginTop: "-2px" }} />,
      name: `${ethprice.toLocaleString()}`,
      width: "68px",
    },
    {
      icon: <Bottom_3 sx={{ mr: "5px", width: "14px", height: "14px", marginTop: "-2px" }} />,
      name: `${btcprice.toLocaleString()}`,
      width: "73px",
    },
  ];

  useEffect(() => {
    getPrice();
  }, []);
  const scrollView = (item: any) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mr: "10px",
      }}
    >
      {item.icon}
      <Box
        sx={{
          fontWeight: 500,
          fontSize: "11px",
          lineHeight: "120%",
          color: "#616367",
          width: item.width,
        }}
      >
        {item.name}
      </Box>
    </Box>
  );
  return (
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
      <TextScrollStyle>
        {scrollData.map((ii) => scrollView(ii))}
        {scrollData.map((ii) => scrollView(ii))}
        {scrollData.map((ii) => scrollView(ii))}
      </TextScrollStyle>
    </Box>
  );
}
