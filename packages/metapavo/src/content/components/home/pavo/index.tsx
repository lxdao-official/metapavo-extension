import React, { useState, useContext, useEffect, useRef } from "react";
import { getNftById, searchProjects } from "../../../../apis/nft_api";
import useGlobal, { GlobalContext } from "../../../context/global";
import { Box, CircularProgress, IconButton } from "@mui/material";
import useThrottle from './useThrottle'
import {
  Container,
  HeadSelect,
  HeadLogo,
  SearchField,
  Head,
  ToolsHotContainer,
  HotTitle,
  ToolsItemContainer,
  TrendsHotContainer,
  TrendsItemContainer,
  HistoryHotContainer,
  HistoryHotItemContainer,
  HeadReturnContainer,
  SearchItemContainer,
  ModalContainer,
} from "./styleCom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import ClearIcon from "@mui/icons-material/Clear";
import { getUsersFavs, getVisitHistories } from "../../../../apis/nft_api";
import { IVisitHistory, IFavs } from "../../../../apis/types";
import moment from "moment";
import { useNavigate } from "react-router";
import { WalletContext } from "../../../context/useWallet";
import { useSnackbar } from "notistack";
import TrendsALL, { TrendsItem } from "./comps/WatchListAll";
import HistoryALL, { HistoryItem } from "./comps/historyListAll";
import { isTemplateElement } from "@babel/types";
const arrow_down = chrome.runtime.getURL("images/svgs/arrow_down.svg");
const logo = chrome.runtime.getURL("images/svgs/logo.svg");
const logo_name = chrome.runtime.getURL("images/svgs/MetaPavo.svg");
const RectangleTool = chrome.runtime.getURL("images/svgs/RectangleTool.svg");
const Trend1 = chrome.runtime.getURL("images/svgs/Trend1.svg");
const Trend2 = chrome.runtime.getURL("images/svgs/Trend2.svg");
const history_icon1 = chrome.runtime.getURL("images/svgs/history_icon1.svg");
const history_icon2 = chrome.runtime.getURL("images/svgs/history_icon2.svg");
const link1 = chrome.runtime.getURL("images/svgs/link1.svg");
const link2 = chrome.runtime.getURL("images/svgs/link2.svg");
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");
const enter = chrome.runtime.getURL("images/svgs/enter.svg");
const flag = chrome.runtime.getURL("images/svgs/flag.svg");
const userIcon = chrome.runtime.getURL("images/svgs/user_icon.svg");
const up = chrome.runtime.getURL("images/svgs/u_arrow-up.svg");
const down = chrome.runtime.getURL("images/svgs/u_arrow-down.svg");
const esc = chrome.runtime.getURL("images/svgs/ESC.svg");
const enter_btn = chrome.runtime.getURL("images/svgs/enter_btn.svg");

function AlarmIcon() {
  return (
    <div
      style={{
        background: "#6EDFA3",
        borderRadius: "6px",
        width: "60px",
        height: "60px",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0001 29.5557C22.7502 29.5557 28.2223 24.0836 28.2223 17.3335C28.2223 10.5833 22.7502 5.11121 16.0001 5.11121C9.24988 5.11121 3.77783 10.5833 3.77783 17.3335C3.77783 24.0836 9.24988 29.5557 16.0001 29.5557Z"
          fill="white"
          stroke="white"
          strokeWidth="2.66667"
          strokeLinejoin="round"
        />
        <path
          d="M15.8392 10.2357L15.8384 17.5749L21.0199 22.7565"
          stroke="#6EDFA3"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.6665 5.99996L7.33317 2.66663"
          stroke="white"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.3332 5.99996L24.6665 2.66663"
          stroke="white"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// test data
const testSearchData = [
  {
    user_icon: userIcon,
    user_name: "Moonbirds",
    flag: flag,
    eth: "0.02 ETH",
  },
];
const testToolsHotData = [
  { img: AlarmIcon, name: "Alarm Reminder" },
  // { img: RectangleTool, name: "时区计算" },
  // { img: RectangleTool, name: "无常损失" },
];
const testTrendsHotData = [
  { img: Trend1, name: "Doodles", eth: "Floor: 12 wETH" },
  { img: Trend2, name: "Moonbirds", eth: "Floor: 12 wETH" },
];
const testHistoryHotData = [
  {
    userIcon: history_icon1,
    useName: "Drippies™",
    userEth: "Floor: 12 E",
    links: [{ link: "", img: link1 }],
    dayTime: "今天",
    hourTime: "3:23 am",
  },
  {
    userIcon: history_icon2,
    useName: "Azuki",
    userEth: "Floor: 120 E",
    links: [
      { link: "", img: link1 },
      { link: "", img: link2 },
    ],
    dayTime: "3月23日",
    hourTime: "8:23 pm",
  },
];

const testToolsAll = [
  { img: RectangleTool, name: "Gas查询" },
  { img: RectangleTool, name: "时区计算" },
  { img: RectangleTool, name: "无常损失" },
  { img: RectangleTool, name: "Gas查询" },
  { img: RectangleTool, name: "时区计算" },
  { img: RectangleTool, name: "无常损失" },
];
const testTrendsAll = [
  { img: Trend1, name: "Doodles", eth: "Floor: 12 wETH" },
  { img: Trend2, name: "Moonbirds", eth: "Floor: 12 wETH" },
  { img: Trend1, name: "Doodles", eth: "Floor: 12 wETH" },
  { img: Trend2, name: "Moonbirds", eth: "Floor: 12 wETH" },
  { img: Trend1, name: "Doodles", eth: "Floor: 12 wETH" },
  { img: Trend2, name: "Moonbirds", eth: "Floor: 12 wETH" },
];
const testHostoryAll = [
  {
    userIcon: history_icon1,
    useName: "Drippies™",
    userEth: "Floor: 12 E",
    links: [{ link: "", img: link1 }],
    dayTime: "今天",
    hourTime: "3:23 am",
  },
  {
    userIcon: history_icon2,
    useName: "Azuki",
    userEth: "Floor: 120 E",
    links: [
      { link: "", img: link1 },
      { link: "", img: link2 },
    ],
    dayTime: "3月23日",
    hourTime: "8:23 pm",
  },
];

const Pavo = () => {
  const [status, setStatus] = useState<number>(0);
  const [curValue, setCurValue] = useState<string>("");
  const [selectMenu, setSelectMenu] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [toolsHot, setToolsHot] = useState<any[]>([]);
  const [toolsAll, setToolsAll] = useState<any[]>([]);
  const [trendsHot, setTrendsHot] = useState<any[]>([]);
  const [trendsAll, setTrendsAll] = useState<any[]>([]);
  const [historyHot, setHistoryHot] = useState<any[]>([]);
  const [historyAll, setHistoryAll] = useState<any[]>([]);
  const searchDom = useRef<HTMLInputElement | null>(null);
  const { refreshActiveProject, setActiveProject } = useContext(GlobalContext);
  const { loginedAddress, logout } = useContext(WalletContext);

  const navigate = useNavigate();
  const mapStatus: any = {};
  mapStatus[(mapStatus[0] = "Hall")] = 0;
  mapStatus[(mapStatus[1] = "SearchShow")] = 1;
  mapStatus[(mapStatus[2] = "Tools")] = 2;
  mapStatus[(mapStatus[3] = "Trends")] = 3;
  mapStatus[(mapStatus[4] = "History")] = 4;
  mapStatus[(mapStatus[5] = "Seting")] = 5;
  const [watchListLoading, setWatchListLoading] = useState(false);
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
            userEth: `Floor: ${item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
              } E`,
            links: [{ link: "", img: link1 }],
            dayTime: moment(item.created_at).fromNow(),
            hourTime: moment(item.created_at).format("mm:ss"),
            project_id: item.project_id,
          };
        }),
      );
    }
    setGetHistoryLoading(false);
  }
  async function getFavs() {
    setWatchListLoading(true);
    const res = await getUsersFavs(1, 6);
    if (res.data) {
      setTrendsHot(
        res.data.map((item: IFavs) => {
          return {
            img: item.project?.image_url,
            name: item.project?.name,
            eth: `Floor: ${item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
              } E`,
            project_id: item.project_id,
          };
        }),
      );
    }
    setWatchListLoading(false);
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
  const HeadCom = () => {
    return (
      <Head>
        <HeadSelect onClick={() => setSelectMenu(!selectMenu)}>
          <span>{formatAddress(loginedAddress)}</span>
          <img src={arrow_down} alt="" />
        </HeadSelect>

        <HeadLogo>
          <img className="logo" src={logo} alt="" />
          <img className="logo-name" src={logo_name} alt="" />
        </HeadLogo>
      </Head>
    );
  };

  const SearchItem = (props: any) => {
    const item = props.itemData;
    const clickFn = props.onClick

    return (
      <SearchItemContainer onClick={clickFn}>
        <div className="front">
          <img className="user-icon" src={item.user_icon} alt="" />
          <span className="user-name">{item.user_name}</span>
          <img className="flag" src={item.flag} alt="" />
        </div>

        <div className="end">
          <div className="eth">
            <span className="num">{item.eth}</span>
            <span>Floor</span>
          </div>
          <img className="enter" src={enter} alt="" />
        </div>
      </SearchItemContainer>
    );
  };

  // 检索组件
  const SearchCom = (props: any) => {
    const status = props.status
    const searchData = props.searchData

    if (status === 1) {
      searchInputFocus()
    }

    return (
      <SearchField>
        <div className="search">
          <input
            type="text"
            onChange={searchChange}
            ref={searchDom}
            value={curValue}
            placeholder="Search collection/address/.."
          />
          {status !== 1 && <div>/</div>}
        </div>

        <div className="search-data">
          {status === 1 &&
            searchData.length &&
            searchData.map((item: any, index: number) => {
              return <SearchItem
                key={index}
                itemData={item}
                onClick={() => {
                  goDetail(item.project_id);
                  setTimeout(() => {
                    setStatus(0)
                    setSearchData([])
                    setCurValue('')
                  }, 1000)
                }}
              />;
            })}

          {status === 1 && (
            <div className="prompt">
              <Box
                sx={{
                  boxShadow: "0px 1.5px 0px rgba(215, 215, 215, 0.6)",
                  boxSizing: "border-box",
                  width: "23px",
                  height: "21px",
                  marginLeft: "-10px",
                  marginRight: "7px",
                  borderRadius: "3px",
                  padding: "2px 5px",
                  border: "0.5px solid #D7D7D7",
                }}
              >
                <img className="up" src={up} alt="" />
              </Box>
              <Box
                sx={{
                  boxShadow: "0px 1.5px 0px rgba(215, 215, 215, 0.6)",
                  boxSizing: "border-box",
                  width: "23px",
                  height: "21px",
                  borderRadius: "3px",
                  padding: "2px 5px",
                  border: "0.5px solid #D7D7D7",
                }}
              >
                <img className="down" src={down} alt="" />
              </Box>

              <span className="text-chose">选择</span>
              <Box
                sx={{
                  boxShadow: "0px 1.5px 0px rgba(215, 215, 215, 0.6)",
                  boxSizing: "border-box",
                  width: "32px",
                  height: "21px",
                  borderRadius: "3px",
                  padding: "0px 3px",
                  border: "0.5px solid #D7D7D7",
                }}
              >
                <img className="esc" src={esc} alt="" />
              </Box>

              <span className="text-close">关闭窗口</span>
              <Box
                sx={{
                  boxShadow: "0px 1.5px 0px rgba(215, 215, 215, 0.6)",
                  boxSizing: "border-box",
                  width: "23px",
                  height: "21px",
                  borderRadius: "3px",
                  padding: "2px 5px",
                  border: "0.5px solid #D7D7D7",
                }}
              >
                <img className="enter-btn" src={enter_btn} alt="" />
              </Box>
              <span className="text-check">选中</span>
            </div>
          )}
        </div>
      </SearchField>
    );
  };

  const ToolsItem = (props: any) => {
    const item = props.itemData;

    return (
      <ToolsItemContainer>
        <img src={item.img} />
        <span>{item.name}</span>
      </ToolsItemContainer>
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
    const data = props.data;
    const title = props.title;
    let navigate = useNavigate();
    return (
      <ToolsHotContainer>
        <HotTitle>
          <span className="title">{title}</span>
        </HotTitle>

        <div className="hot-tool-list">
          <ToolsItemContainer
            onClick={() => {
              navigate("/alarms");
            }}
          >
            <AlarmIcon />
            <span>Alarm Reminder</span>
          </ToolsItemContainer>
        </div>
      </ToolsHotContainer>
    );
  };

  const ToolsAll = (props: any) => {
    const data = props.data;

    return (
      <ToolsHotContainer>
        <div className="tool-list">
          {data.map((item: any, index: number) => {
            return <ToolsItem key={index} itemData={item} />;
          })}
        </div>
      </ToolsHotContainer>
    );
  };

  const TrendsHot = (props: any) => {
    const data = props.data;
    const title = props.title;

    return (
      <TrendsHotContainer>
        <TitleOfHot title={title} />
        {watchListLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
            <CircularProgress style={{ color: "#b721ff", width: "20px", height: "20px" }} />
          </Box>
        ) : null}
        <div className="hot-trend-list">
          {data.map((item: any, index: number) => {
            return (
              <TrendsItem
                key={index}
                itemData={item}
                onClick={() => {
                  goDetail(item.project_id);
                }}
              />
            );
          })}
        </div>
      </TrendsHotContainer>
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
          ) : null}
          {data.map((item: any, index: number) => {
            return (
              <HistoryItem
                key={index}
                itemData={item}
                onClick={() => {
                  goDetail(item.project_id);
                }}
              />
            );
          })}
        </div>
      </HistoryHotContainer>
    );
  };

  const HeadReturn = (props: any) => {
    const title = props.title;

    return (
      <HeadReturnContainer>
        <img onClick={() => opMoreClick("Hall")} src={returnImg} alt="" />
        <span>{title}</span>
      </HeadReturnContainer>
    );
  };

  const { enqueueSnackbar } = useSnackbar();
  const copyContractAddress = () => {
    copy(loginedAddress);
    enqueueSnackbar("Copied", {});
  };
  const LoginModal = (props: any) => {
    return (
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
              navigate("/login");
            }}
          >
            退出登录
          </div>
        </div>
        <div className="mask" />
      </ModalContainer>
    );
  };

  const generateComFromStatus = (status: number) => {
    const generateComs = [];

    switch (status) {
      case 0:
        generateComs.push(
          ...[
            <HeadCom key={0} />,
            <SearchCom key={1} status={status} searchData={searchData} />,
            <ToolsHot key={2} data={toolsHot} title={"Tools"} />,
            <TrendsHot key={3} data={trendsHot} title={"Trends"} />,
            <HistoryHot key={4} title={"History"} data={historyHot} />,
          ],
        );
        break;
      case 1:
        generateComs.push(...[<HeadCom key={0} />, <SearchCom key={1} status={status} searchData={searchData} />]);
        break;
      case 2:
        generateComs.push(
          ...[
            <HeadReturn key={0} title={mapStatus[status]} />,
            <ToolsAll key={1} data={toolsAll} />,
          ],
        );
        break;
      case 3:
        generateComs.push(
          ...[
            <HeadReturn key={0} title={mapStatus[status]} />,
            <TrendsALL key={1} data={trendsAll} />,
          ],
        );
        break;
      case 4:
        generateComs.push(
          ...[
            <HeadReturn key={0} title={mapStatus[status]} />,
            <HistoryALL key={4} title={"History"} data={historyAll} />,
          ],
        );
        break;
    }

    return generateComs;
  };

  const opMoreClick = (title: string) => {
    setStatus(mapStatus[title]);
  };

  const search = useThrottle(async () => {
    // search project 请求逻辑
    const searchResult: any = await searchProjects(curValue);
    let searchData = searchResult.data
    searchData = searchData.map((item: any) => {
      return {
        ...item,
        project_id: item.id,
        user_icon: item.image_url,
        user_name: item.name,
        flag: flag,
        eth: `${item.floor_price ? Math.round(item.floor_price * 1000) / 1000 : 0} ETH`,
      }
    })
    setSearchData(searchData);
    setStatus(1);
  }, 1000, [])

  const searchChange = async (e: any) => {
    const curValue = e.target.value;

    setCurValue(curValue);

    if (!curValue) {
      setStatus(0);
      setSearchData([])
      return
    }

    search()
  };

  const searchInputFocus = () => {
    searchDom.current !== null && searchDom.current.focus();
  }

  useEffect(() => {
    searchInputFocus()
  }, [curValue])

  useEffect(() => {
    getHistories();
    getFavs();
    setToolsAll(testToolsAll);
    setTrendsAll(testTrendsAll);
    setHistoryAll(testHostoryAll);
  }, []);

  useEffect(() => {
    console.log("cur status", status, searchData)
  })

  return (
    <Container>
      {generateComFromStatus(status)}
      {selectMenu && <LoginModal />}
    </Container>
  );
};

export default Pavo;
