import React, { useState, useContext, useEffect, useRef } from "react";
import { searchProjects } from "../../../../apis/nft_api";
import useGlobal, { GlobalContext } from "../../../context/global";
import { Box } from "@mui/material";
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

// import images
// <<<<<<< HEAD
// import arrow_down from "./images/arrow_down.svg";
// import logo from "./images/logo.svg";
// import logo_name from "./images/MetaPavo.svg";
// import RectangleTool from "./images/RectangleTool.svg";
// import Trend1 from "./images/Trend1.svg";
// import Trend2 from "./images/Trend2.svg";
// import history_icon1 from "./images/history_icon1.svg";
// import history_icon2 from "./images/history_icon2.svg";
// import link1 from "./images/link1.svg";
// import link2 from "./images/link2.svg";
// import returnImg from "./images/return.svg";
// import enter from "./images/enter.svg";
// import flag from "./images/flag.svg";
// import userIcon from "./images/user_icon.svg";
// import up from "./images/u_arrow-up.svg";
// import down from "./images/u_arrow-down.svg";
// import esc from "./images/ESC.svg";
// import enter_btn from "./images/enter_btn.svg";
import { getUsersFavs, getVisitHistories } from "../../../../apis/nft_api";
import { IVisitHistory, IFavs } from "../../../../apis/types";
import moment from "moment";
import { useNavigate } from "react-router";
// import arrow_down from "./images/arrow_down.svg";
// import logo from "./images/logo.svg";
// import logo_name from "./images/MetaPavo.svg";
// import RectangleTool from "./images/RectangleTool.svg";
// import Trend1 from "./images/Trend1.svg";
// import Trend2 from "./images/Trend2.svg";
// import history_icon1 from "./images/history_icon1.svg";
// import history_icon2 from "./images/history_icon2.svg";
// import link1 from "./images/link1.svg";
// import link2 from "./images/link2.svg";
// import returnImg from "./images/return.svg";
// import enter from "./images/enter.svg";
// import flag from "./images/flag.svg";
// import userIcon from "./images/user_icon.svg";
// import up from "./images/u_arrow-up.svg";
// import down from "./images/u_arrow-down.svg";
// import esc from "./images/ESC.svg";
// import enter_btn from "./images/enter_btn.svg";

const url_prefix = "https://lengyuerbucket.oss-cn-beijing.aliyuncs.com/pavo/";
const arrow_down = url_prefix + "arrow_down.svg";
const logo = url_prefix + "logo.svg";
const logo_name = url_prefix + "MetaPavo.svg";
const RectangleTool = url_prefix + "RectangleTool.svg";
const Trend1 = url_prefix + "Trend1.svg";
const Trend2 = url_prefix + "Trend2.svg";
const history_icon1 = url_prefix + "history_icon1.svg";
const history_icon2 = url_prefix + "history_icon2.svg";
const link1 = url_prefix + "link1.svg";
const link2 = url_prefix + "link2.svg";
const returnImg = url_prefix + "return.svg";
const enter = url_prefix + "enter.svg";
const flag = url_prefix + "flag.svg";
const userIcon = url_prefix + "user_icon.svg";
const up = url_prefix + "u_arrow-up.svg";
const down = url_prefix + "u_arrow-down.svg";
const esc = url_prefix + "ESC.svg";
const enter_btn = url_prefix + "enter_btn.svg";

// test data
const testSearchData = [
  {
    user_icon: userIcon,
    user_name: "Moonbirds",
    flag: flag,
    eth: "0.02 ETH",
  },
];
function AlarmIcon() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
    >
      <path
        d="M271.4 877.5c-4.4 0-8.8-1.2-12.7-3.8-10.5-7-13.4-21.2-6.4-31.8l59.1-88.7c7-10.5 21.2-13.4 31.8-6.4 10.5 7 13.4 21.2 6.4 31.8l-59.1 88.7c-4.4 6.6-11.7 10.2-19.1 10.2zM752.6 877.5c-7.4 0-14.7-3.6-19.1-10.2l-59.9-89.8c-7-10.5-4.2-24.8 6.4-31.8 10.5-7 24.7-4.2 31.8 6.4l59.9 89.8c7 10.5 4.2 24.8-6.4 31.8-3.9 2.6-8.4 3.8-12.7 3.8zM420.6 257.9c-5.9 0-11.7-2.2-16.2-6.7l-49-49c-13.2-13.2-34.6-13.2-47.8 0l-19 19c-8.9 8.9-23.4 8.9-32.4 0-8.9-8.9-8.9-23.4 0-32.4l19-19c31-31 81.5-31 112.6 0l49 49c8.9 8.9 8.9 23.4 0 32.4-4.5 4.4-10.4 6.7-16.2 6.7zM230.2 270c-5.9 0-11.7-2.2-16.2-6.7-8.9-8.9-8.9-23.4 0-32.4l2.1-2.1c8.9-8.9 23.4-8.9 32.4 0s8.9 23.4 0 32.4l-2.1 2.1c-4.5 4.5-10.3 6.7-16.2 6.7zM219.7 428.9c-5.9 0-11.7-2.2-16.2-6.7L168 386.7c-30.2-30.2-30.2-79.5 0-109.7 8.9-8.9 23.4-8.9 32.4 0 8.9 8.9 8.9 23.4 0 32.4-12.4 12.4-12.4 32.5 0 44.9l35.5 35.5c8.9 8.9 8.9 23.4 0 32.4-4.5 4.5-10.4 6.7-16.2 6.7zM795.8 437.5c-5.9 0-11.7-2.2-16.2-6.7-8.9-8.9-8.9-23.4 0-32.4l44.1-44.1c12.4-12.4 12.4-32.5 0-44.9L716.4 202.1c-13.2-13.2-34.6-13.2-47.8 0l-49 49c-8.9 8.9-23.4 8.9-32.4 0-8.9-8.9-8.9-23.5 0-32.4l49-49c31.1-31 81.6-31 112.6 0L856 277c30.2 30.2 30.2 79.5 0 109.7l-44 44.1c-4.5 4.4-10.4 6.7-16.2 6.7z"
        fill="#6893FF"
        p-id="13119"
      ></path>
      <path
        d="M512 843.2c-176.9 0-320.7-143.9-320.7-320.7S335.1 201.7 512 201.7s320.7 143.9 320.7 320.7S688.9 843.2 512 843.2z m0-595.7c-151.6 0-274.9 123.3-274.9 274.9S360.4 797.3 512 797.3 786.9 674 786.9 522.4 663.6 247.5 512 247.5z"
        fill="#6893FF"
        p-id="13120"
      ></path>
      <path
        d="M477.7 568.2c-7.6 0-15-3.8-19.4-10.7-6.8-10.7-3.6-24.9 7.1-31.6L683 388.5c10.7-6.7 24.8-3.6 31.6 7.1 6.8 10.7 3.6 24.9-7.1 31.6L489.9 564.7c-3.8 2.4-8.1 3.5-12.2 3.5z"
        fill="#39DB8F"
        p-id="13121"
      ></path>
      <path
        d="M546.3 568.2c-4 0-8.1-1.1-11.8-3.3L420 496.2c-10.9-6.5-14.4-20.6-7.9-31.4 6.5-10.9 20.6-14.4 31.4-7.9L558 525.6c10.9 6.5 14.4 20.6 7.9 31.4-4.2 7.3-11.8 11.2-19.6 11.2z"
        fill="#FF6E90"
        p-id="13122"
      ></path>
    </svg>
  );
}
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
  const [searchData, setSearchData] = useState<any[]>([]);
  const [toolsHot, setToolsHot] = useState<any[]>([]);
  const [toolsAll, setToolsAll] = useState<any[]>([]);
  const [trendsHot, setTrendsHot] = useState<any[]>([]);
  const [trendsAll, setTrendsAll] = useState<any[]>([]);
  const [historyHot, setHistoryHot] = useState<any[]>([]);
  const [historyAll, setHistoryAll] = useState<any[]>([]);
  const searchDom = useRef<HTMLInputElement | null>(null);
  const { refreshActiveProject, setActiveProject } = useGlobal();

  const mapStatus: any = {};
  mapStatus[(mapStatus[0] = "Hall")] = 0;
  mapStatus[(mapStatus[1] = "SearchShow")] = 1;
  mapStatus[(mapStatus[2] = "Tools")] = 2;
  mapStatus[(mapStatus[3] = "Trends")] = 3;
  mapStatus[(mapStatus[4] = "History")] = 4;
  mapStatus[(mapStatus[5] = "Seting")] = 5;

  async function getHistories() {
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
            links: [{ link: "", img: link1 }],
            dayTime: moment(item.created_at).fromNow(true),
            hourTime: moment(item.created_at).format("mm:ss"),
          };
        }),
      );
    }
  }
  async function getFavs() {
    const res = await getUsersFavs(1, 6);
    if (res.data) {
      setTrendsHot(
        res.data.map((item: IFavs) => {
          return {
            img: item.project?.image_url,
            name: item.project?.name,
            eth: `Floor: ${
              item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
            } E`,
          };
        }),
      );
    }
  }

  // 头部组件
  const HeadCom = () => {
    return (
      <Head>
        <HeadSelect>
          <span>0X34ea...f3cd</span>
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

    return (
      <SearchItemContainer>
        <img className="user-icon" src={item.user_icon} alt="" />
        <span className="user-name">{item.user_name}</span>
        <img className="flag" src={item.flag} alt="" />
        <div className="eth">
          <span className="num">{item.eth}</span>
          <span>Floor</span>
        </div>
        <img className="enter" src={enter} alt="" />
      </SearchItemContainer>
    );
  };

  // 检索组件
  const SearchCom = () => {
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
            searchData.map((item, index) => {
              return <SearchItem key={index} itemData={item} />;
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
        {item.img}
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
        <TitleOfHot title={title} />

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

  const TrendsItem = (props: any) => {
    const item = props.itemData;

    return (
      <TrendsItemContainer>
        <div
          style={{ backgroundImage: `url(${item.img ? item.img : RectangleTool})` }}
          className="des-cover"
        />
        <div className="des-title">
          <span className="name">{item.name}</span>
          <span className="eth-own">{item.eth}</span>
        </div>
      </TrendsItemContainer>
    );
  };

  const TrendsHot = (props: any) => {
    const data = props.data;
    const title = props.title;

    return (
      <TrendsHotContainer>
        <TitleOfHot title={title} />

        <div className="hot-trend-list">
          {data.map((item: any, index: number) => {
            return <TrendsItem key={index} itemData={item} />;
          })}
        </div>
      </TrendsHotContainer>
    );
  };

  const TrendsALL = (props: any) => {
    const data = props.data;

    return (
      <TrendsHotContainer>
        <div className="trend-list">
          {data.map((item: any, index: number) => {
            return <TrendsItem key={index} itemData={item} />;
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
          {data.map((item: any, index: number) => {
            return <HistoryItem key={index} itemData={item} />;
          })}
        </div>
      </HistoryHotContainer>
    );
  };

  const HistoryALL = (props: any) => {
    const data = props.data;

    return (
      <HistoryHotContainer>
        <div className="history-list">
          {data.map((item: any, index: number) => {
            return <HistoryItem key={index} itemData={item} />;
          })}
        </div>
      </HistoryHotContainer>
    );
  };

  const HistoryItem = (props: any) => {
    const { userIcon, useName, userEth, links, dayTime, hourTime } = props.itemData;

    return (
      <HistoryHotItemContainer>
        <img className="user-icon" src={userIcon} alt="" />
        <div className="user-des">
          <span className="user-name">{useName}</span>
          <span className="user-eth">{userEth}</span>
        </div>
        <div className="imgs-container">
          {links.map((link: any, index: number) => {
            return (
              <div className="link-container" key={index}>
                <img className="link-icon" src={link.img} alt="" />
              </div>
            );
          })}
        </div>
        <div className="times">
          <span className="day-time">{dayTime}</span>
          <span className="hour-time">{hourTime}</span>
        </div>
      </HistoryHotItemContainer>
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

  const LoginModal = (props: any) => {
    return (
      <ModalContainer>
        <div className="user-des" />
        <div className="op-list">
          <div>系统设置</div>
          <div>退出登录</div>
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
            <SearchCom key={1} />,
            <ToolsHot key={2} data={toolsHot} title={"Tools"} />,
            <TrendsHot key={3} data={trendsHot} title={"Watch List"} />,
            <HistoryHot key={4} title={"History"} data={historyHot} />,
          ],
        );
        break;
      case 1:
        generateComs.push(...[<HeadCom key={0} />, <SearchCom key={1} />]);
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
    console.log("more click", title);
    setStatus(mapStatus[title]);
  };

  const searchChange = async (e: any) => {
    const curValue = e.target.value;

    setCurValue(curValue);

    if (curValue) {
      console.log("curValue", curValue);
      // search project 请求逻辑
      const searchResult = await searchProjects(curValue);
      setStatus(1);
    } else {
      setStatus(0);
    }

    setTimeout(() => {
      searchDom.current !== null && searchDom.current.focus();
    });
  };

  useEffect(() => {
    getHistories();
    getFavs();
    setSearchData(testSearchData);
    setToolsHot(testToolsHotData);
    setToolsAll(testToolsAll);
    setTrendsHot(testTrendsHotData);
    setTrendsAll(testTrendsAll);

    setHistoryAll(testHostoryAll);
  }, []);

  return (
    <Container>
      {generateComFromStatus(status)}
      {/* <LoginModal /> */}
    </Container>
  );
};

export default Pavo;
