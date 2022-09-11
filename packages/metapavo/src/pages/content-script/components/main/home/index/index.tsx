import { useState, useContext, useEffect } from "react";
import { getNftById } from "../../../../../../utils/apis/nft_api";
import { GlobalContext } from "../../../../context/useGlobal";
import { Box, CircularProgress, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import {
  Container,
  HeadSelect,
  HeadLogo,
  Head,
  ToolsHotContainer,
  HotTitle,
  ToolsItemContainer,
  HistoryHotContainer,
  HeadReturnContainer,
  ModalContainer,
  ModalBG,
} from "./styleCom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import ClearIcon from "@mui/icons-material/Clear";
import { getVisitHistories } from "../../../../../../utils/apis/nft_api";
import { IVisitHistory } from "../../../../../../utils/apis/types";
import moment from "moment";
import { useNavigate } from "react-router";
import { WalletContext } from "../../../../context/useWallet";
import { SearchCom } from "./search";
import { AlarmIcon, HistoryIcon, SwapIcon, WatchlistIcon } from "./icons/icons";
import { Item } from "../../../../plugins/watchlist/HistoryListPage";
import { linkImages } from "../../../../../../utils/linkImages";
const arrow_down = chrome.runtime.getURL("images/svgs/arrow_down.svg");
const index_logo = chrome.runtime.getURL("images/index-logo.png");

const Pavo = () => {
  const [status, setStatus] = useState<number>(0);

  const [selectMenu, setSelectMenu] = useState<boolean>(false);

  const [historyHot, setHistoryHot] = useState<any[]>([]);

  const { setShowLogin, setActiveProject } = useContext(GlobalContext);
  const { loginedAddress, logout } = useContext(WalletContext);

  const navigate = useNavigate();
  const mapStatus: any = {};
  mapStatus[(mapStatus[0] = "Hall")] = 0;
  mapStatus[(mapStatus[1] = "SearchShow")] = 1;
  mapStatus[(mapStatus[2] = "TOOLS")] = 2;
  mapStatus[(mapStatus[3] = "WATCHLIST")] = 3;
  mapStatus[(mapStatus[4] = "HISTORY")] = 4;
  mapStatus[(mapStatus[5] = "Alarm List")] = 5;
  mapStatus[(mapStatus[6] = "Seting")] = 6;

  const [getHistoryLoading, setGetHistoryLoading] = useState(false);
  async function getHistories() {
    setGetHistoryLoading(true);
    const res = await getVisitHistories(1, 10);
    if (res.data) {
      setHistoryHot(
        res.data.map((item: IVisitHistory) => {
          return {
            userIcon: item.project?.image_url,
            useName: item.project?.name,
            userEth: `Floor: ${
              item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
            } E`,
            links: [
              item.project?.external_url
                ? {
                    link: item.project?.external_url,
                    img: linkImages.website,
                  }
                : null,
              item.project?.id
                ? {
                    link: `https://opensea.io/collection/${item.project?.id}`,
                    label: "OpenSea",
                    img: linkImages.opensea,
                  }
                : null,
              item.project?.id
                ? {
                    link: `https://www.gem.xyz/collection/${item.project?.id}`,
                    label: "Gem",
                    img: linkImages.gem,
                  }
                : null,
              item.project.twitter_username
                ? {
                    link: `https://twitter.com/${item.project.twitter_username}`,
                    label: "Twitter",
                    img: linkImages.twitter,
                  }
                : null,
            ].filter((item) => item),
            dayTime: moment(item.updated_at).format("MM-DD"),
            hourTime: moment(item.updated_at).format("mm:ss"),
            project_id: item.project_id,
          };
        }),
      );
    }
    setGetHistoryLoading(false);
  }

  const goDetail = async (project_id: string) => {
    const project = await getNftById(project_id);
    if (project) {
      setActiveProject(project);
    }
  };
  function formatAddress(address: string) {
    // ens
    if (address.includes(".")) {
      return address;
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  // 头部组件
  const HeadCom = (props: any) => {
    return (
      <Head>
        <HeadSelect onClick={() => setSelectMenu(!selectMenu)}>
          <span>{formatAddress(loginedAddress)}</span>
          <img src={arrow_down} alt="" />
        </HeadSelect>

        <HeadLogo>
          <img className="logo" src={index_logo} alt="" />
        </HeadLogo>
      </Head>
    );
  };

  const TitleOfHot = (props: any) => {
    const title = props.title;

    return (
      <HotTitle>
        <span className="title">{title}</span>
        <span className="op" onClick={() => opMoreClick(title)}>
          More
        </span>
      </HotTitle>
    );
  };

  const ToolsHot = (props: any) => {
    const title = props.title;
    return (
      <ToolsHotContainer>
        <HotTitle>
          <span className="title">{title}</span>
        </HotTitle>

        <div className="hot-tool-list">
          <ToolsItemContainer
            onClick={() => {
              navigate("/watchlist");
              // setStatus(5);
            }}
          >
            <WatchlistIcon />
            <span>Watch List</span>
          </ToolsItemContainer>
          <ToolsItemContainer
            onClick={() => {
              navigate("/alarms");
              // setStatus(5);
            }}
          >
            <AlarmIcon />
            <span>Alarm Reminder</span>
          </ToolsItemContainer>
          <ToolsItemContainer
            onClick={() => {
              navigate("/history");
              // setStatus(5);
            }}
          >
            <HistoryIcon />
            <span>History</span>
          </ToolsItemContainer>
          <ToolsItemContainer
            onClick={() => {
              navigate("/swap");
              // setStatus(5);
            }}
          >
            <SwapIcon />
            <span>Swap</span>
          </ToolsItemContainer>
        </div>
      </ToolsHotContainer>
    );
  };

  const Empty = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          padding: "30px 0",
        }}
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="#999"
        >
          <path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path>
        </svg>
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#555", textAlign: "center" }}>
          No Records
        </div>
      </div>
    );
  };

  const HistoryHot = (props: any) => {
    const data = props.data;
    const title = props.title;

    return (
      <HistoryHotContainer>
        <TitleOfHot title={title} />

        <div className="hot-history-list">
          {getHistoryLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
              <CircularProgress style={{ color: "#b721ff", width: "20px", height: "20px" }} />
            </Box>
          ) : data.length === 0 ? (
            <Empty />
          ) : null}

          {data.map((item: any, index: number) => {
            return (
              <Item
                key={index}
                itemData={item}
                // onClick={() => {
                //   goDetail(item.project_id);
                // }}
              />
            );
          })}
        </div>
      </HistoryHotContainer>
    );
  };

  const copyContractAddress = () => {
    copy(loginedAddress);
    toast.success("Copied");
  };
  const LoginModal = (props: any) => {
    return (
      <>
        <ModalBG
          onClick={() => {
            setSelectMenu(false);
          }}
        ></ModalBG>
        <ModalContainer>
          <div className="user-des">
            <div className="user-topLine">
              <div className="user-name">
                <span className="user-code">{formatAddress(loginedAddress)}</span>
                <IconButton
                  onClick={() => {
                    copyContractAddress();
                  }}
                  sx={{ ml: 0.5, height: "17px", width: "17px" }}
                >
                  <ContentCopyIcon sx={{ ml: 0.5, height: "17px", width: "17px" }} />
                </IconButton>
              </div>
              {/* <div className="user-eth">Value: 1213.22 USDC</div> */}
            </div>
            <ClearIcon
              sx={{ height: "24px", width: "24px", color: "#D1D0D6", cursor: "pointer" }}
              onClick={() => setSelectMenu(!selectMenu)}
            />
          </div>
          <div className="op-list">
            {/* <div className="metaPavo-pp">系统设置</div> */}
            <div
              className="metaPavo-pp"
              onClick={async () => {
                await logout();
                setShowLogin(true);
              }}
            >
              Logout
            </div>
          </div>
          <div className="mask" />
        </ModalContainer>
      </>
    );
  };

  const opMoreClick = (title: string) => {
    setStatus(mapStatus[title]);
  };

  useEffect(() => {
    console.log("init");
    getHistories();
    // getFavs();
  }, []);

  return (
    <Container>
      <HeadCom />

      {/* 0 1 */}
      <SearchCom goDetail={goDetail} />

      <ToolsHot title={"TOOLS"} />

      {/* <WatchListHot data={trendsHot} title={"WATCHLIST"} /> */}

      <HistoryHot data={historyHot} title={"HISTORY"} />

      {/* 2 3 4 5 */}
      {/* {(status === 2 || status === 3 || status === 4 || status === 5) && (
        <DetailPage>
          <HeadReturn title={mapStatus[status]} />
          {status === 2 && <ToolsAll data={toolsAll} />}

          {status === 3 && <TrendsALL data={trendsAll} />}

          {status === 4 && <HistoryALL title={"History"} data={historyAll} />}
        </DetailPage>
      )} */}

      {selectMenu && <LoginModal />}
    </Container>
  );
};

export default Pavo;
