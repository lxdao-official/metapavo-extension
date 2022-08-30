import { Box } from "@mui/material";
import { useState } from "react";
import { searchProjects } from "../../../../../../utils/apis/nft_api";
import { Component1 } from "../../../assets/Svgs";
import { SearchField, SearchItemContainer } from "./styleCom";
import { useThrottle, useThrottleFn } from "ahooks";
const enter = chrome.runtime.getURL("images/svgs/enter.svg");
const flag = chrome.runtime.getURL("images/svgs/flag.svg");
const userIcon = chrome.runtime.getURL("images/svgs/user_icon.svg");
const up = chrome.runtime.getURL("images/svgs/u_arrow-up.svg");
const down = chrome.runtime.getURL("images/svgs/u_arrow-down.svg");
const esc = chrome.runtime.getURL("images/svgs/ESC.svg");
const enter_btn = chrome.runtime.getURL("images/svgs/enter_btn.svg");
const SearchItem = (props: any) => {
  const item = props.itemData;
  const clickFn = props.onClick;

  return (
    <SearchItemContainer onClick={clickFn}>
      <div className="front">
        <img className="user-icon" src={item.user_icon} alt="" />
        <span className="user-name">{item.user_name}</span>
        {item.contract_is_verified ? (
          <Component1 sx={{ ml: 0.5, width: "16px", height: "16px" }} />
        ) : null}
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
export const SearchCom = (props: any) => {
  const [curValue, setCurValue] = useState<string>("");
  const [searchData, setSearchData] = useState<any[]>([]);

  const { run, cancel, flush } = useThrottleFn(
    async (keyword: string) => {
      if (!keyword) {
        setSearchData([]);
        return;
      }
      // search project 请求逻辑
      try {
        const searchResult: any = await searchProjects(keyword);
        if (searchResult.data) {
          let searchData = searchResult.data;
          searchData = searchData.map((item: any) => {
            return {
              ...item,
              project_id: item.id,
              user_icon: item.image_url,
              user_name: item.name,
              flag: flag,
              contract_is_verified: item.contract_is_verified,
              eth: `${item.floor_price ? Math.round(item.floor_price * 1000) / 1000 : 0} ETH`,
            };
          });
          setSearchData(searchData);
        }
      } catch (e) {
        setSearchData([]);
      }
    },
    {
      wait: 500,
    },
  );
  const searchChange = async (e: any) => {
    const curValue = e.target.value;

    setCurValue(curValue);

    run(curValue);
  };

  return (
    <SearchField>
      <div className="metapavo-search">
        <input
          type="text"
          onChange={searchChange}
          onPaste={searchChange}
          value={curValue}
          placeholder="Search collection/address/.."
        />
        {/* {status !== 1 && <div>/</div>} */}
      </div>

      <div className="metapavo-search-data">
        {searchData.length
          ? searchData.map((item: any, index: number) => {
              return (
                <SearchItem
                  key={index}
                  itemData={item}
                  onClick={() => {
                    props.goDetail(item.project_id);
                    // setTimeout(() => {
                    //   setStatus(0);
                    //   setSearchData([]);
                    //   setCurValue("");
                    // }, 1000);
                  }}
                />
              );
            })
          : null}

        {searchData.length ? (
          <div className="metapavo-prompt">
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
              <img className="metapavo-down" src={down} alt="" />
            </Box>

            <span className="metapavo-text-chose">选择</span>
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
              <img className="metapavo-esc" src={esc} alt="" />
            </Box>

            <span className="metapavo-text-close">关闭窗口</span>
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
              <img className="metapavo-enter-btn" src={enter_btn} alt="" />
            </Box>
            <span className="metapavo-text-check">选中</span>
          </div>
        ) : null}
      </div>
    </SearchField>
  );
};
