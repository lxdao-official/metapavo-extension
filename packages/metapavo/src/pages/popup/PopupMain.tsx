import { useState, useEffect } from "react";
import { Container, MenuListStyle, MenuItemStyle, Badge, Version } from "./styleCom";
import { useNavigate } from "react-router";
import { settingCounts } from "../../utils/apis/nft_api";
import { getLang } from "../../utils/lang";

const manifestData = chrome.runtime.getManifest();

const PopupMain = () => {
  const [counts, setCounts] = useState<{
    favCount: number;
    alarmCount: number;
    historyCount: number;
  }>({
    favCount: 0,
    alarmCount: 0,
    historyCount: 0,
  });

  const navigate = useNavigate();

  const GoIcon = () => (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.66666 11.8333L11.3333 5.16663"
        stroke="#D1D0D6"
        strokeWidth="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.66666 5.16663H11.3333V11.8333"
        stroke="#D1D0D6"
        strokeWidth="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const MenuList = (props: any) => {
    return (
      <MenuListStyle>
        <MenuItemStyle
          onClick={() => {
            navigate("/watchlist");
          }}
        >
          <div className="menu-left">{getLang("WatchList")}</div>
          <div className="menu-right">
            {counts.favCount ? <Badge>{counts.favCount}</Badge> : null}
            <GoIcon />
          </div>
        </MenuItemStyle>

        <MenuItemStyle
          onClick={() => {
            navigate("/alarms");
          }}
        >
          <div className="menu-left">{getLang("AlarmReminder")}</div>
          <div className="menu-right">
            {counts.alarmCount ? <Badge>{counts.alarmCount}</Badge> : null}
            <GoIcon />
          </div>
        </MenuItemStyle>
        <MenuItemStyle
          onClick={() => {
            navigate("/history");
          }}
        >
          <div className="menu-left">{getLang("History")}</div>
          <div className="menu-right">
            {/* {counts.historyCount ? <Badge>{counts.historyCount}</Badge> : null} */}
            <GoIcon />
          </div>
        </MenuItemStyle>
        {/* <MenuItemStyle>
          <div className="menu-left">Timezone Tool</div>
          <div className="menu-right">
            <GoIcon />
          </div>
        </MenuItemStyle> */}
        <MenuItemStyle
          onClick={() => {
            navigate("/report-scam");
          }}
        >
          <div className="menu-left">{getLang("Report_Scam")}</div>
          <div className="menu-right">
            <GoIcon />
          </div>
        </MenuItemStyle>
        <MenuItemStyle
          onClick={() => {
            chrome.tabs.create({
              url: "https://lxdao.io",
            });
          }}
        >
          <div className="menu-left">{getLang("About")} LXDAO</div>
          <div className="menu-right">
            <GoIcon />
          </div>
        </MenuItemStyle>
      </MenuListStyle>
    );
  };
  const getCounts = async () => {
    const _data = await settingCounts();
    if (_data) {
      setCounts(_data);
    }
  };
  useEffect(() => {
    console.log("init");
    getCounts();
  }, []);

  return (
    <Container>
      <MenuList />
      <Version>version: v{manifestData.version}</Version>
    </Container>
  );
};

export default PopupMain;
