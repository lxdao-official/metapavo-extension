import React, { useContext } from "react";
import { Box, MenuItem, IconButton } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useSnackbar } from "notistack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MuiMarkdown from "mui-markdown";
import { Shield_error, Component1, Btc, Left_Icon, Fliter } from "../../../assets/Svgs";
import useGlobal, { GlobalContext } from "../../../../context/global";
import copy from "clipboard-copy";
import styled from "styled-components";
import { addFavByProjectId, removeFavByProjectId } from "../../../../../../utils/apis/nft_api";
const link2 = chrome.runtime.getURL("images/svgs/image-2.svg");
const link3 = chrome.runtime.getURL("images/svgs/image-3.svg");
const link4 = chrome.runtime.getURL("images/svgs/image-4.svg");
const link5 = chrome.runtime.getURL("images/svgs/image-5.svg");
const link6 = chrome.runtime.getURL("images/svgs/image-6.svg");
const link7 = chrome.runtime.getURL("images/svgs/image-7.svg");
const link8 = chrome.runtime.getURL("images/svgs/image-8.svg");
const link9 = chrome.runtime.getURL("images/svgs/image-9.svg");
const link10 = chrome.runtime.getURL("images/svgs/image-9.svg");
const css = `
  
    .metapavo-tabInner{
      text-align:left;
      
    }
    .metapavo-tabInner * {
      box-sizing: border-box;
    }
    .metapavo-message{
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
    .metaPavo-mr8{
      margin-right:8px;
      width:14px;
      height:14px;
    }
    .metapavo-icon{
      margin-right:15px;
      margin-left:12px;
      width:20px;
      height:20px;
    }
    .metapavo-boxText{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 4px;
      width: 50px;
      height: 19px;
      background: #F5F5F5;
      border-radius: 4px;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      color: #353536;
      
    }
    .metapavo-addwatch{
      height: 19px !important;
    background: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%) !important;
    border-radius: 4px !important;
    color: #fff !important;
    font-size: 12px !important;
    line-height: 18px !important;
    border: none !important;
    margin-left: 10px !important;
    padding:0 10px 0 5px !important;
    cursor:pointer !important;
    }
    .metapavo-ellipsis{
      width:16px;
      height:8px;
      background: #24292E;
      color:#fff;
      margin-left:8px;
    }
    .metapavo-roundT{
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
    .metapavo-selectClass{
      color:#5B28EB;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      display: flex;
      border: none;
      outline: none;
      // appearance: none;
      // -webkit-appearance: none;
      // -moz-appearance: none;
    }
    .metapavo-topSelect{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid #E5E3E6;
      border-radius: 6px;
      margin:15px 11px 25px 12px;
      width:calc(100% - 23px);
      color: #D7D7D7;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      position:relative;
    }
    .metapavo-topSelect:after{
      content:"v",
      position:"absolute";
      right:17.5px;
      top:10.5px;
    }
    .metapavo-option{
      margin-top:5px;
      padding: 8px 16px;
      color:#000;
    }
    
    .metapavo-option:hover{
        backgroundColor:#F5F5F5;
    }
`;
const card = (obj: any) => (
  <Box
    component="div"
    sx={{
      px: "15px",
      py: "10px",
      // width: "100%",
      height: "55.71px",
      border: "0.794574px solid #D7D7D7",
      borderRadius: "6.35659px",
      textAlign: "left",
      maxWidth: "130px",
    }}
  >
    <Box
      sx={{
        mb: "6.36px",
        fontWeight: 500,
        fontSize: "12px",
        transform: "scale(0.9)",
        lineHeight: "11px",
        color: "#A9A8AF",
        display: "flex",
        alignItems: "center",
        wordBreak: "break-all",
        transformOrigin: "0 0",
      }}
    >
      {obj.label}
    </Box>
    <Box
      sx={{
        mb: 1.5,
        fontWeight: 600,
        fontSize: "14px",
        color: "#353536",
        lineHeight: "17px",
        display: "flex",
        fontFamily: "Inter",
      }}
    >
      <Box sx={{ fontSize: "14px" }}>{obj.icon}</Box>
      {obj.value}
    </Box>
    {/* <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        fontSize: "9px",
        lineHeight: "11px",
      }}
    >
      <Box component="span" className="metapavo-roundT">
        {obj.date}
      </Box>
      <Box component="span" sx={{ color: obj.rate > 0 ? "#07A333" : "#FF1159" }}>
        {obj.rate}%
      </Box>
    </Box> */}
  </Box>
);
const LinkButton = styled.a`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  display: flex;
  text-decoration: none;
  align-items: center;

  color: #000000;
  cursor: pointer;
`;
const info = (obj: any) => (
  <>
    {obj.array.filter((f: any) => {
      return f;
    }).length === 0 ? null : (
      <Box sx={{ mb: 2.25, mx: 3, textAlign: "left" }}>
        <Box sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "15px", mb: "14px" }}>
          {obj.name}
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {obj.array.map((item: any) =>
            item ? (
              <LinkButton href={item.link} target="_blank" rel="noreferrer">
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
                  <img src={item.img} className="metaPavo-mr8" />
                  {item.label}
                </Box>
              </LinkButton>
            ) : null,
          )}
        </Box>
      </Box>
    )}
  </>
);
interface MediaProps {
  loading?: boolean;
}

function formatAddress(address: string) {
  // ens
  if (address.includes(".")) {
    return address;
  }
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

//two decimal places
const twoDecimal = (num: any) => {
  if (!num || num !== num || num == "NaN") return 0.0;
  const data = num + "".toLocaleString();
  return Number(data).toFixed(2);
};
const ProjectTab = (props: MediaProps) => {
  const { loading = false } = props;
  const { activeProject, detectStatus, refreshActiveProject } = useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();
  const copyContractAddress = () => {
    if (activeProject?.contract_address) {
      copy(activeProject.contract_address);
      enqueueSnackbar("Copied", {});
    }
  };
  const mookData = [
    {
      label: "Total Sales",
      value: `${twoDecimal(activeProject?.total_sales)}`,
      date: "24H",
      rate: 0,
      icon: "$ ",
    },
    {
      label: "Holders",
      value: `${activeProject?.num_owners?.toLocaleString() || "-"}/${
        activeProject?.total_supply ? parseInt(activeProject?.total_supply).toLocaleString() : "-"
      }`,
      date: "24H",
      rate: 0,
      icon: <></>,
    },
    {
      label: "Volume (24H)",
      value: `${twoDecimal(activeProject?.one_day_volume)} Ξ`,
      date: "24H",
      rate: 0,
      icon: <Btc sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
    {
      label: "Volume (7D)",
      value: `${twoDecimal(activeProject?.seven_day_volume)} Ξ`,
      date: "24H",
      rate: 0,
      icon: <Btc sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
    {
      label: "Floor Price",
      value: `${twoDecimal(activeProject?.floor_price)} Ξ`,
      date: "24H",
      rate: 0,
      icon: <Btc sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
  ];

  const moreDataInfo = [
    {
      name: "More Data",
      array: [
        {
          link: `https://nfteye.io/collections/${activeProject?.id}`,
          label: "NFTEye",
          img: link8,
        },
        {
          link: `https://nftnerds.ai/collection/${activeProject?.contract_address}/liveview`,
          label: "NFTNerds",
          img: link9,
        },
      ],
    },
  ];
  const linksInfo = [
    {
      name: "Collection info",
      array: [
        // { icon: "", label: "onchainroyale.xyz" },
        {
          link: `https://etherscan.io/address/${activeProject?.contract_address}`,
          label: "Etherscan",
          img: link2,
        },
        activeProject?.external_url
          ? { link: `${activeProject?.external_url}`, label: "Website" }
          : null,
        activeProject?.github ? { link: `${activeProject?.github}`, label: "Github" } : null,
      ],
    },
    {
      name: "Buy now",
      array: [
        activeProject?.id
          ? {
              link: `https://opensea.io/collection/${activeProject?.id}`,
              label: "OpenSea",
              img: link3,
            }
          : null,
        activeProject?.contract_address
          ? {
              link: `https://looksrare.org/collections/${activeProject?.contract_address}`,
              label: "Looksrare",
              img: link4,
            }
          : null,
        activeProject?.contract_address
          ? {
              link: `https://x2y2.io/collection/${activeProject?.id}/items`,
              label: "X2Y2",
              img: link5,
            }
          : null,
      ],
    },
    {
      name: "Soicial Media",
      array: [
        activeProject?.twitter_username
          ? {
              link: `https://twitter.com/${activeProject?.twitter_username}`,
              label: "Twitter",
              img: link6,
            }
          : null,
        activeProject?.discord_url
          ? { link: `${activeProject?.discord_url}`, label: "Discord" }
          : null,
        activeProject?.instagram_username
          ? {
              link: `https://t.me/${activeProject?.instagram_username}`,
              label: "Instagram",
              img: link7,
            }
          : null,
      ],
    },
  ];
  async function addFav() {
    if (activeProject) {
      try {
        await addFavByProjectId(activeProject.id);
        enqueueSnackbar("Add to favorite successfully");
        refreshActiveProject();
      } catch (e: any) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Please select a project first", { variant: "error" });
    }
  }
  async function removeFav() {
    if (activeProject) {
      try {
        await removeFavByProjectId(activeProject.id);
        enqueueSnackbar("Remove from favorite successfully");
        refreshActiveProject();
      } catch (e: any) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Please select a project first", { variant: "error" });
    }
  }
  return (
    <div className="metapavo-tabInner">
      <style type="text/css">{css}</style>

      {detectStatus === "danger" && (
        <div className="metapavo-message">
          <Shield_error className="metapavo-icon" />
          该项目存在风险，有可能是某知名项目的仿盘，确定你已经对该项目已经有充分了解！
        </div>
      )}
      <Box sx={{ p: 2.25 }}>
        <Box sx={{ display: "flex" }}>
          <Box component="img" src={activeProject?.image_url || ""} width={85} height={85} />
          <Box
            component={"div"}
            sx={{
              marginLeft: "15px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "17px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {activeProject?.name}
              {activeProject?.contract_is_verified ? (
                <Component1 sx={{ ml: 0.5, width: "16px", height: "16px" }} />
              ) : null}
            </Box>
            <Box
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "17px",
                color: "#A9A8AF",
                mt: 0.75,
                display: "flex",
              }}
            >
              {activeProject?.contract_address
                ? formatAddress(activeProject?.contract_address)
                : ""}
              <IconButton
                onClick={() => {
                  copyContractAddress();
                }}
                sx={{ ml: 0.5, height: "17px", width: "17px" }}
              >
                <ContentCopyIcon sx={{ ml: 0.5, height: "17px", width: "17px" }} />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: "12px" }}>
              <Box className="metapavo-boxText">{activeProject?.type === 1 ? "ERC20" : "NFT"}</Box>
              {activeProject?.faved ? (
                <button
                  className="metapavo-addwatch"
                  onClick={() => {
                    removeFav();
                  }}
                >
                  － WATCHING
                </button>
              ) : (
                <button
                  className="metapavo-addwatch"
                  onClick={() => {
                    addFav();
                  }}
                >
                  ＋ WATCH LIST
                </button>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 1.25, fontSize: "11px", lineHeight: "13px" }}>
          {activeProject?.describe ? activeProject?.describe : ""}
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
      <Box sx={{ mt: 2.5 }}>{linksInfo.map((ii) => info(ii))}</Box>
      <Box sx={{ mt: 2.5 }}>{moreDataInfo.map((ii) => info(ii))}</Box>
    </div>
  );
};

const MoonbirdsTab2 = () => {
  const { activeProject, detectStatus } = useGlobal();
  const mookData = [
    {
      label: "Total Sales",
      value: `${twoDecimal(activeProject?.total_sales)}`,
      date: "24H",
      rate: 0,
      icon: "$",
    },
    {
      label: "Holders",
      value: `${activeProject?.num_owners?.toLocaleString() || "-"}/${
        activeProject?.total_supply ? parseInt(activeProject?.total_supply) : "-"
      }`,
      date: "24H",
      rate: 0,
      icon: <Btc sx={{ fontSize: "inherit", marginTop: "1.5px" }} />,
    },
    {
      label: "Volume(24H)",
      value: `${twoDecimal(activeProject?.one_day_volume)}`,
      date: "24H",
      rate: 0,
      icon: <Btc sx={{ fontSize: "inherit", marginTop: "1.5px" }} />,
    },
    {
      label: "Volume(7D)",
      value: `${twoDecimal(activeProject?.seven_day_volume)}`,
      date: "24H",
      rate: 0,
      icon: <Btc sx={{ fontSize: "inherit", marginTop: "1.5px" }} />,
    },
    {
      label: "Floor Price",
      value: `${twoDecimal(activeProject?.floor_price)}`,
      date: "24H",
      rate: 0,
      icon: <Btc sx={{ fontSize: "inherit", marginTop: "1.5px" }} />,
    },
  ];
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
          textAlign: "left",
        }}
      >
        {mookData.map((ii) => card(ii))}
      </Box>
      <Box sx={{ mb: 1, px: 2 }}>
        <Box sx={{ p: "10px", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "15px" }}>
            Market Cap & Volume
          </Box>
          <select className="metapavo-selectClass">
            <option value={10}>24h</option>
            <option value={20}>3d</option>
            <option value={30}>4d</option>
          </select>
        </Box>
        <Skeleton variant="rectangular" width={"100%"} height={162} />
      </Box>
      {/* <Box sx={{ mt: 2.5 }}>{mockInfo_.map((ii) => info(ii))}</Box> */}
    </div>
  );
};

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
      <Btc sx={{ fontSize: "inherit" }} />
      {obj.price}
    </Box>
  </Box>
);
const MoonbirdsTab3 = (props: MediaProps) => {
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

export { ProjectTab, MoonbirdsTab2, MoonbirdsTab3 };