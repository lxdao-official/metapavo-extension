import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
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
import arrow_down from "./images/arrow_down.svg";
import logo from "./images/logo.svg";
import logo_name from "./images/MetaPavo.svg";
import RectangleTool from "./images/RectangleTool.svg";
import Trend1 from "./images/Trend1.svg";
import Trend2 from "./images/Trend2.svg";
import history_icon1 from "./images/history_icon1.svg";
import history_icon2 from "./images/history_icon2.svg";
import link1 from "./images/link1.svg";
import link2 from "./images/link2.svg";
import returnImg from "./images/return.svg";
import enter from "./images/enter.svg";
import flag from "./images/flag.svg";
import userIcon from "./images/user_icon.svg";
import up from "./images/u_arrow-up.svg";
import down from "./images/u_arrow-down.svg";
import esc from "./images/ESC.svg";
import enter_btn from "./images/enter_btn.svg";

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
  { img: RectangleTool, name: "Gas查询" },
  { img: RectangleTool, name: "时区计算" },
  { img: RectangleTool, name: "无常损失" },
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
    links: [{ link: "", img: link1 }, { link: "", img: link2 }],
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
    links: [{ link: "", img: link1 }, { link: "", img: link2 }],
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

  const mapStatus: any = {};
  mapStatus[(mapStatus[0] = "Hall")] = 0;
  mapStatus[(mapStatus[1] = "SearchShow")] = 1;
  mapStatus[(mapStatus[2] = "Tools")] = 2;
  mapStatus[(mapStatus[3] = "Trends")] = 3;
  mapStatus[(mapStatus[4] = "History")] = 4;
  mapStatus[(mapStatus[5] = "Seting")] = 5;

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
        <img src={item.img ? item.img : RectangleTool} alt="" />
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

    return (
      <ToolsHotContainer>
        <TitleOfHot title={title} />

        <div className="hot-tool-list">
          {data.map((item: any, index: number) => {
            return <ToolsItem key={index} itemData={item} />;
          })}
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
        <img src={item.img ? item.img : RectangleTool} alt="" />
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
            <TrendsHot key={3} data={trendsHot} title={"Trends"} />,
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

  const searchChange = (e: any) => {
    const curValue = e.target.value;

    if (curValue) {
      console.log("curValue", curValue);
      setStatus(1);
    } else {
      setStatus(0);
    }

    setCurValue(curValue);
    setTimeout(() => {
      searchDom.current !== null && searchDom.current.focus();
    });
  };

  useEffect(() => {
    setSearchData(testSearchData);
    setToolsHot(testToolsHotData);
    setToolsAll(testToolsAll);
    setTrendsHot(testTrendsHotData);
    setTrendsAll(testTrendsAll);
    setHistoryHot(testHistoryHotData);
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
