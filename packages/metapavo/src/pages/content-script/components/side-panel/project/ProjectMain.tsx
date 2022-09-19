import { useContext, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import { AddWatchButton, css, LinkButton } from "./styles";
import ReactMarkdown from "react-markdown";
import React from "react";
import {
  addFavByProjectId,
  isFaved,
  removeFavByProjectId,
} from "../../../../../utils/apis/nft_api";
import { GlobalContext } from "../../../context/useGlobal";
import { EthIcon, Shield_error, Component1, Ellipsis } from "../../assets/Svgs";
import { getLang } from "../../../../../utils/lang";
import { linkImages } from "../../../../../utils/linkImages";
const placeholderImg = chrome.runtime.getURL("images/placeholder.png");
const link2 = chrome.runtime.getURL("images/svgs/image-2.svg");
const link3 = chrome.runtime.getURL("images/svgs/image-3.svg");
const link4 = chrome.runtime.getURL("images/svgs/image-4.svg");
const link5 = chrome.runtime.getURL("images/svgs/image-5.svg");
const link6 = chrome.runtime.getURL("images/svgs/image-6.svg");
const link7 = chrome.runtime.getURL("images/svgs/image-7.svg");
const link8 = chrome.runtime.getURL("images/svgs/image-8.svg");
const link9 = chrome.runtime.getURL("images/svgs/image-9.svg");
const link10 = chrome.runtime.getURL("images/svgs/image-9.svg");
const icon_github = chrome.runtime.getURL("images/github.png");
const icon_website = chrome.runtime.getURL("images/website.png");
const icon_discord = chrome.runtime.getURL("images/discord.png");
const icon_gem = chrome.runtime.getURL("images/gem.png");
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
  </Box>
);

const info = (obj: any) => (
  <>
    {obj.array.filter((f: any) => {
      return f;
    }).length === 0 ? null : (
      <Box sx={{ mb: 2.25, mx: 2, textAlign: "left" }}>
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
  const [show, setShow] = React.useState(false);
  const copyContractAddress = () => {
    if (activeProject?.contractAddress) {
      copy(activeProject.contractAddress);
      toast.success("Copied", {});
    }
  };
  const [faved, setFaved] = React.useState(false);

  useEffect(() => {
    refreshFavedStatus();
  }, [activeProject?.id]);
  const mookData = [
    {
      label: getLang("Total_Sales"),
      value: `${Number(
        twoDecimal(activeProject?.nftProjectInfo?.stats[0]?.totalSales),
      ).toLocaleString()}`,
      date: "24H",
      rate: 0,
      icon: <></>,
    },
    {
      label: getLang("Holders"),
      value: `${activeProject?.nftProjectInfo?.stats[0]?.numOwners.toLocaleString() || "-"}/${
        activeProject?.nftProjectInfo?.stats[0]?.totalSupply
          ? parseInt(activeProject?.nftProjectInfo.stats[0]?.totalSupply).toLocaleString()
          : "-"
      }`,
      date: "24H",
      rate: 0,
      icon: <></>,
    },

    {
      label: getLang("Volume") + " (total)",
      value: `${Number(
        twoDecimal(activeProject?.nftProjectInfo?.stats[0].totalVolume),
      ).toLocaleString()} Ξ`,
      date: "24H",
      rate: 0,
      icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
    {
      label: getLang("Volume") + " (24H)",
      value: `${Number(
        twoDecimal(activeProject?.nftProjectInfo?.stats[0].oneDayVolume),
      ).toLocaleString()} Ξ`,
      date: "24H",
      rate: 0,
      icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
    {
      label: getLang("Volume") + " (7D)",
      value: `${Number(
        twoDecimal(activeProject?.nftProjectInfo?.stats[0].sevenDayVolume),
      ).toLocaleString()} Ξ`,
      date: "24H",
      rate: 0,
      icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
    {
      label: getLang("Floor"),
      value: `${Number(
        twoDecimal(activeProject?.nftProjectInfo?.stats[0]?.floorPrice),
      ).toLocaleString()} Ξ`,
      date: "24H",
      rate: 0,
      icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
  ];

  const moreDataInfo = [
    {
      name: getLang("more_data"),
      array: [
        {
          link: activeProject?.links?.nfteye,
          label: "NFTEye",
          img: link8,
        },
        {
          link: activeProject?.links?.nftnerds,
          label: "NFTNerds",
          img: link9,
        },
      ],
    },
  ];
  const linksInfo = [
    {
      name: getLang("Collection_info"),
      array: [
        {
          link: activeProject?.links?.etherscan,
          label: "Etherscan",
          img: link2,
        },
        activeProject?.links?.website
          ? { link: activeProject?.links?.website, label: "Website", img: icon_website }
          : null,
        // activeProject?.
        //   ? { link: `${activeProject?.github}`, label: "Github", img: icon_github }
        //   : null,
      ],
    },
    {
      name: getLang("Buy_now"),
      array: [
        {
          link: activeProject?.links?.opensea,
          label: "OpenSea",
          img: link3,
        },
        {
          link: activeProject?.links?.looksrare,
          label: "Looksrare",
          img: link4,
        },
        {
          link: activeProject?.links?.x2y2,
          label: "X2Y2",
          img: link5,
        },
        {
          link: activeProject?.links?.gem,
          label: "Gem",
          img: icon_gem,
        },
        {
          link: activeProject?.links?.sudoswap,
          label: "Sudoswap",
          img: linkImages.sudoswap,
        },
      ].filter((i) => i.link),
    },
    {
      name: getLang("Soicial_Media"),
      array: [
        {
          link: activeProject?.links?.twitter,
          label: "Twitter",
          img: link6,
        },
        { link: activeProject?.links?.discord, label: "Discord", img: icon_discord },
        // activeProject?
        //   ? {
        //       link: `https://t.me/${activeProject?.instagram_username}`,
        //       label: "Instagram",
        //       img: link7,
        //     }
        //   : null,
      ].filter((i) => i.link),
    },
  ];
  const refreshFavedStatus = async () => {
    if (activeProject?.id) {
      const _isFaved = await isFaved(activeProject?.id);
      console.log("is faved", _isFaved);
      setFaved(_isFaved);
    }
  };
  async function addFav() {
    if (activeProject) {
      try {
        await addFavByProjectId(activeProject.id);
        toast.success("Add to favorite successfully");
        refreshFavedStatus();
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please select a project first");
    }
  }
  async function removeFav() {
    if (activeProject) {
      try {
        await removeFavByProjectId(activeProject.id);
        toast.success("Remove from favorite successfully");
        refreshFavedStatus();
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error("Please select a project first");
    }
  }
  return (
    <div className="metapavo-tabInner">
      <style type="text/css">{css}</style>

      {/* {detectStatus === "danger" && (
        <div className="metapavo-message">
          <Shield_error className="metapavo-icon" />
          There are risks in this project. It may be a copy of a well-known project. Make sure you
          have a full understanding of the project!
        </div>
      )} */}
      <Box sx={{ p: 2.25 }}>
        <Box sx={{ display: "flex" }}>
          <Box
            component="img"
            src={activeProject?.imageUrl || ""}
            width={85}
            height={85}
            style={{
              background: `url(${placeholderImg}) no-repeat center center / cover`,
            }}
          />
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
              {activeProject?.contractData?.isVerified ? (
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
              {activeProject?.contractAddress ? formatAddress(activeProject?.contractAddress) : ""}
              <IconButton
                onClick={() => {
                  copyContractAddress();
                }}
                sx={{ ml: 0.5, height: "17px", width: "17px" }}
              >
                <ContentCopyIcon sx={{ ml: 0.5, height: "17px", width: "17px" }} />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}>
              {faved ? (
                <AddWatchButton
                  onClick={() => {
                    removeFav();
                  }}
                  style={{
                    background: "#F5F5F5",
                    border: "1px solid #F5F5F5",
                    boxShadow: "0px 0px 0px #4216E7",
                    borderRadius: "4px",
                  }}
                >
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ verticalAlign: "-2px", marginRight: "5px", display: "inline-block" }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.39556 0.687639C7.15706 0.437454 4.84294 0.437454 2.60444 0.687639C1.35524 0.827256 0.347427 1.81147 0.200744 3.06561C-0.0669147 5.35409 -0.0669147 7.66597 0.200744 9.95445C0.347427 11.2086 1.35524 12.1928 2.60444 12.3324C4.84294 12.5826 7.15705 12.5826 9.39556 12.3324C10.6448 12.1928 11.6526 11.2086 11.7993 9.95445C12.0669 7.66597 12.0669 5.35409 11.7993 3.06561C11.6526 1.81147 10.6448 0.827256 9.39556 0.687639ZM10.1814 4.2992C10.1814 4.16679 10.1288 4.03979 10.0353 3.94611C9.94163 3.85254 9.81459 3.79999 9.68221 3.79999C9.54977 3.79999 9.4228 3.85254 9.32913 3.94611L4.85228 8.42296L3.04022 6.6109C2.9455 6.52264 2.82023 6.47459 2.69079 6.47688C2.56135 6.47916 2.43784 6.5316 2.3463 6.62314C2.25475 6.71469 2.20231 6.83819 2.20003 6.96763C2.19775 7.09708 2.2458 7.22235 2.33405 7.31707L4.4992 9.48221C4.59288 9.57575 4.71987 9.62831 4.85228 9.62831C4.98469 9.62831 5.11168 9.57575 5.20537 9.48221L10.0353 4.65228C10.1288 4.55859 10.1814 4.4316 10.1814 4.2992Z"
                      fill="#D1D0D6"
                    />
                  </svg>
                  {getLang("WATCHING")}
                </AddWatchButton>
              ) : (
                <AddWatchButton
                  onClick={() => {
                    addFav();
                  }}
                >
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ verticalAlign: "-2px", marginRight: "5px", display: "inline-block" }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.60444 0.687639C4.84294 0.437454 7.15706 0.437454 9.39556 0.687639C10.6448 0.827256 11.6526 1.81147 11.7993 3.06561C12.0669 5.35409 12.0669 7.66597 11.7993 9.95445C11.6526 11.2086 10.6448 12.1928 9.39556 12.3324C7.15705 12.5826 4.84294 12.5826 2.60444 12.3324C1.35524 12.1928 0.347427 11.2086 0.200744 9.95445C-0.0669147 7.66597 -0.0669147 5.35409 0.200744 3.06561C0.347427 1.81147 1.35524 0.827256 2.60444 0.687639ZM6.00001 2.86855C6.30212 2.86855 6.54704 3.11347 6.54704 3.41558V5.963H9.09448C9.39659 5.963 9.6415 6.20791 9.6415 6.51003C9.6415 6.81214 9.39659 7.05705 9.09448 7.05705H6.54704V9.60447C6.54704 9.90658 6.30212 10.1515 6.00001 10.1515C5.6979 10.1515 5.45298 9.90658 5.45298 9.60447V7.05705H2.90558C2.60347 7.05705 2.35856 6.81214 2.35856 6.51003C2.35856 6.20791 2.60347 5.963 2.90558 5.963H5.45299V3.41558C5.45299 3.11347 5.6979 2.86855 6.00001 2.86855Z"
                      fill="#1C1B1D"
                    />
                  </svg>
                  {getLang("Add_to_WATCHLIST")}
                </AddWatchButton>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            m: 0,
            fontSize: "11px",
            lineHeight: "13px",
            maxHeight: show ? "auto" : "50px",
            overflow: "hidden",
            position: "relative",
            marginTop: "10px",
          }}
          onClick={() => setShow(!show)}
        >
          <ReactMarkdown children={activeProject?.describe ? activeProject?.describe : ""} />
          {!show && (
            <Ellipsis
              sx={{
                width: "16px",
                height: "16px",
                position: "absolute",
                bottom: 0,
                right: 0,
                background: "#fff",
              }}
            />
          )}
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

export { ProjectTab };
