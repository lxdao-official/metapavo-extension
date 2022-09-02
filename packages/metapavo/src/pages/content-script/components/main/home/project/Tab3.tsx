import { Box, MenuItem } from "@mui/material";
import React from "react";
import { css } from "./styles";
import { EthIcon, Fliter, Left_Icon } from "../../../assets/Svgs";
interface MediaProps {
  loading?: boolean;
}
const options = [
  { name: "All Events", id: "0" },
  { name: "Recent Salas", id: "1" },
  { name: "Recent Listings", id: "2" },
  { name: "Recent Mint", id: "3" },
];

const mockEvent = [
  {
    icon: <Left_Icon sx={{ width: "14px", height: "14px" }} />,
    avatar: "",
    title: "#3472",
    content: "Rank 2331",
    date: "1h ago",
    price: 0.02,
  },
  {
    icon: <Left_Icon sx={{ width: "14px", height: "14px" }} />,
    avatar: "",
    title: "#3472",
    content: "Rank 2331",
    date: "1h ago",
    price: 0.02,
  },
  {
    icon: <Left_Icon sx={{ width: "14px", height: "14px" }} />,
    avatar: "",
    title: "#3472",
    content: "Rank 2331",
    date: "1h ago",
    price: 0.02,
  },
  {
    icon: <Left_Icon sx={{ width: "14px", height: "14px" }} />,
    avatar: "",
    title: "#3472",
    content: "Rank 2331",
    date: "1h ago",
    price: 0.02,
  },
  {
    icon: <Left_Icon sx={{ width: "14px", height: "14px" }} />,
    avatar: "",
    title: "#3472",
    content: "Rank 2331",
    date: "1h ago",
    price: 0.02,
  },
  {
    icon: <Left_Icon sx={{ width: "14px", height: "14px" }} />,
    avatar: "",
    title: "#3472",
    content: "Rank 2331",
    date: "1h ago",
    price: 0.02,
  },
];

const line = (obj: any) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "36px",
      width: "100%",
      mb: 1.5,
      fontSize: "14px",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Box
        sx={{
          height: "15.56",
          width: "15.56",
          margin: "12.22px",
        }}
      >
        {obj.icon}
      </Box>
      <Box sx={{ height: "36px", width: "36px", backgroundColor: "#eee", mr: "12px" }}>
        {obj.avatar}
      </Box>
      <Box>
        <Box sx={{ fontWeight: 700, fontSize: "13px", lineHeight: "16px", mb: "4px" }}>
          {obj.title}
        </Box>
        <Box sx={{ fontSize: "11px", lineHeight: "13px", color: "#A9A8AF", display: "flex" }}>
          {obj.content} ·{" "}
          {/* <Box component="span" sx={{ fontStyle: "italic" }}>
            {obj.date}
          </Box> */}
        </Box>
      </Box>
    </Box>
    <Box
      sx={{
        pr: "18px",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "17px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <EthIcon sx={{ fontSize: "inherit" }} />
      {obj.price}
    </Box>
  </Box>
);
export const Tab3 = (props: MediaProps) => {
  const { loading = false } = props;
  const [show, setShow] = React.useState(false);
  const [val, setVal] = React.useState(0);

  const handleChange = (event: any) => {
    setVal(event);
    setShow(!show);
  };
  return (
    <div className="metapavo-tabInner">
      <style type="text/css">{css}</style>
      <Box className="metapavo-topSelect" onClick={() => setShow(!show)}>
        <div>{options[val]?.name}</div>
        <Fliter sx={{ width: "15px", height: "15px", mr: "10.5px" }} />
        {show && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              top: "48px",
              left: 0,
              border: "1px solid #E5E3E6",
              borderRadius: "0px 0px 6px 6px",
              paddingBottom: "5px",
            }}
          >
            {options.map((pp, ii) => (
              <MenuItem
                value={pp.id}
                className="metapavo-option"
                sx={{
                  fontSize: "14px",
                }}
                onClick={() => handleChange(ii)}
              >
                {pp.name}
              </MenuItem>
            ))}
          </Box>
        )}
      </Box>
      {mockEvent.map((e) => line(e))}
    </div>
  );
};
