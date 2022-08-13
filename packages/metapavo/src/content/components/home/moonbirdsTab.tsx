import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
// import errorIcon from './../assets/error.png'

const css = `
    .message{
        width: 275px;
        height: 52px;
        box-sizing: border-box;
        margin:16px 14px 0 14px;
        background: rgba(248, 247, 249, 0.5);
        border: 0.8px solid #E14942;
        border-radius: 6.35659px;
        color:#E14942;
        font-size: 11px;
        line-height: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    i{
      margin-right:8px;
    }
    .icon{
      margin-right:15px;
    }
    .boxText{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 4px;
      width: 49px;
      height: 19px;
      background: #F5F5F5;
      border-radius: 4px;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      color: #353536;
      margin-top:12px;
    }
    .ellipsis{
      width:16px:
      height:8px;
      background: #24292E;
      color:#fff;
      margin-left:8px;
    }
    .roundT{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3.17829px 6.35659px;
      width: 30.71px;
      height: 17.36px;
      background: #EFEEF1;
      border-radius: 20.6589px;
      color: #353536;
      margin-right:5px;
    }
    .selectClass{
      color:#5B28EB;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      display: flex;
      border: none;
    }
`;
const mookData = [
  { label: "总市值", value: "$7,959,038.01", date: "24H", rate: 800 },
  { label: "持有者", value: "$7,959,038.01", date: "24H", rate: -800 },
  { label: "交易量（24H）", value: "$7,959,038.01", date: "24H", rate: -800 },
  { label: "地板价", value: "$7,959,038.01", date: "24H", rate: 800 },
];
const card = (obj: any) => (
  <Box
    component="div"
    sx={{
      px: "15px",
      py: "10px",
      width: "100%",
      height: "83.71px",
      background: "rgba(248, 247, 249, 0.7)",
      border: "0.794574px solid #D7D7D7",
      borderRadius: "6.35659px",
    }}
  >
    <Box
      sx={{ mb: "6.36px", fontWeight: 700, fontSize: "9px", lineHeight: "11px", color: "#A9A8AF" }}
    >
      {obj.label}
    </Box>
    <Box sx={{ mb: 1.5, fontWeight: 700, fontSize: "14px", color: "#353536", lineHeight: "17px" }}>
      {obj.value}
    </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        fontSize: "9px",
        lineHeight: "11px",
      }}
    >
      <Box component="span" className="roundT">
        {obj.date}
      </Box>
      <Box component="span" sx={{ color: obj.rate > 0 ? "#07A333" : "#FF1159" }}>
        {obj.rate}%
      </Box>
    </Box>
  </Box>
);

const mockInfo = [
  {
    name: "Collection info",
    array: [
      { icon: "", label: "onchainroyale.xyz" },
      { icon: "", label: "Etherscan" },
    ],
  },
  {
    name: "Buy now",
    array: [
      { icon: "", label: "Opensea" },
      { icon: "", label: "Looksrare" },
      { icon: "", label: "X2Y2" },
    ],
  },
  {
    name: "Soicial Media",
    array: [
      { icon: "", label: "Twitter" },
      { icon: "", label: "Discord" },
    ],
  },
];

const info = (obj: any) => (
  <Box sx={{ mb: 2.25, mx: 3 }}>
    <Box sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "15px", mb: "14px" }}>{obj.name}</Box>
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {obj.array.map((item: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            lineHeight: "15px",
            mr: 1,
            background: "rgba(248, 247, 249, 0.5)",
            border: "0.8px solid #D7D7D7",
            borderRadius: "6.4px",
            p: "10px",
            mb: 2,
          }}
        >
          <i>#</i>
          {item.label}
        </Box>
      ))}
    </Box>
  </Box>
);
interface MediaProps {
  loading?: boolean;
}
const MoonbirdsTab1 = (props: MediaProps) => {
  const { loading = false } = props;

  return (
    <div>
      <style type="text/css">{css}</style>

      <div className="message">
        <i className="icon">#</i>
        该项目存在风险，有可能是某知名项目的仿盘，确定你已经对该项目已经有充分了解！
      </div>
      <Box sx={{ p: 2.25 }}>
        <Box sx={{ display: "flex" }}>
          <Skeleton variant="rectangular" width={85} height={85} />
          <Box
            component={"div"}
            sx={{ ml: 2.5, display: "flex", justifyContent: "center", flexDirection: "column" }}
          >
            <Box sx={{ fontWeight: 600, fontSize: "14px", lineHeight: "17px" }}>Moonbirds</Box>
            <Box
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "17px",
                color: "#A9A8AF",
                mt: 0.75,
              }}
            >
              0xF71296...e2161C4
            </Box>
            <Box className="boxText">ERC721</Box>
          </Box>
        </Box>
        <Box sx={{ mt: 1.25, fontSize: "11px", lineHeight: "13px" }}>
          This is an image of a Lucky Cat. The left paw beckons people and the right paw money. This
          timeThis is an image of a Lucky Cat
          <i className="ellipsis">...</i>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
          px: 2,
        }}
      >
        {mookData.map((ii) => card(ii))}
      </Box>
      <Box sx={{ mt: 2.5 }}>{mockInfo.map((ii) => info(ii))}</Box>
    </div>
  );
};

const mockInfo_ = [
  {
    name: "More Data",
    array: [
      { icon: "", label: "NFTEye" },
      { icon: "", label: "NFTNerds" },
      { icon: "", label: "NFTgo" },
    ],
  },
];
const MoonbirdsTab2 = () => {
  return (
    <div>
      <style type="text/css">{css}</style>

      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
          px: 2,
          mt: 2.5,
        }}
      >
        {mookData.map((ii) => card(ii))}
      </Box>
      <Box sx={{ mb: 1, px: 2 }}>
        <Box sx={{ p: "10px", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "15px" }}>
            Market Cap & Volume
          </Box>
          <select className="selectClass">
            <option value={10}>24h</option>
            <option value={20}>3d</option>
            <option value={30}>4d</option>
          </select>
        </Box>
        <Skeleton variant="rectangular" width={"100%"} height={162} />
      </Box>
      <Box sx={{ mt: 2.5 }}>{mockInfo_.map((ii) => info(ii))}</Box>
    </div>
  );
};

export { MoonbirdsTab1, MoonbirdsTab2 };