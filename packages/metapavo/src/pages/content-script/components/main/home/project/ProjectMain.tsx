import { useContext } from "react";
import { Box, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Shield_error, Component1, EthIcon, Ellipsis } from "../../../assets/Svgs";
import { GlobalContext } from "../../../../context/useGlobal";
import copy from "clipboard-copy";
import { addFavByProjectId, removeFavByProjectId } from "../../../../../../utils/apis/nft_api";
import { css, LinkButton } from "./styles";
import ReactMarkdown from "react-markdown";
import React from "react";
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
  const [show, setShow] = React.useState(false);
  const copyContractAddress = () => {
    if (activeProject?.contract_address) {
      copy(activeProject.contract_address);
      enqueueSnackbar("Copied", {});
    }
  };
  const mookData = [
    {
      label: "Total Sales",
      value: `${Number(twoDecimal(activeProject?.total_sales)).toLocaleString()}`,
      date: "24H",
      rate: 0,
      icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
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
      value: `${Number(twoDecimal(activeProject?.one_day_volume)).toLocaleString()} Ξ`,
      date: "24H",
      rate: 0,
      icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
    {
      label: "Volume (7D)",
      value: `${Number(twoDecimal(activeProject?.seven_day_volume)).toLocaleString()} Ξ`,
      date: "24H",
      rate: 0,
      icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
    },
    {
      label: "Floor Price",
      value: `${Number(twoDecimal(activeProject?.floor_price)).toLocaleString()} Ξ`,
      date: "24H",
      rate: 0,
      icon: <EthIcon sx={{ fontSize: "inherit", marginTop: "1.5px", marginLeft: "-3px" }} />,
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
          ? { link: `${activeProject?.external_url}`, label: "Website", img: icon_website }
          : null,
        activeProject?.github
          ? { link: `${activeProject?.github}`, label: "Github", img: icon_github }
          : null,
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
        activeProject?.contract_address
          ? {
              link: `https://www.gem.xyz/collection/${activeProject?.id}`,
              label: "Gem",
              img: icon_gem,
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
          ? { link: `${activeProject?.discord_url}`, label: "Discord", img: icon_discord }
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
          There are risks in this project. It may be a copy of a well-known project. Make sure you
          have a full understanding of the project!
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
        <Box
          sx={{
            m: 0,
            fontSize: "11px",
            lineHeight: "13px",
            maxHeight: show ? "auto" : "50px",
            overflow: "hidden",
            position: "relative",
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
