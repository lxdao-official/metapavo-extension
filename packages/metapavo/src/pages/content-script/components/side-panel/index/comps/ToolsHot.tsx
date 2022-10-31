import { useNavigate } from 'react-router-dom';

import { getLang } from '../../../../../../utils/lang';
import { HistoryIcon, MYIcon, SwapIcon, WatchlistIcon } from '../icons/icons';
import { HotTitle, ToolsHotContainer, ToolsItemContainer } from '../styles';

const revokeIcon = chrome.runtime.getURL('images/revoke.cash.png');
export const ToolsHot = (props: any) => {
  const title = props.title;
  const navigate = useNavigate();
  return (
    <ToolsHotContainer>
      <HotTitle>
        <span className="title">{title}</span>
      </HotTitle>

      <div className="hot-tool-list">
        <ToolsItemContainer
          onClick={() => {
            navigate('/watchlist');
            // setStatus(5);
          }}
        >
          <WatchlistIcon />
          <span>{getLang('WatchList')}</span>
        </ToolsItemContainer>
        {/* <ToolsItemContainer
          onClick={() => {
            navigate("/alarms");
            // setStatus(5);
          }}
        > */}
        {/* <AlarmIcon />
          <span>{getLang("AlarmReminder")}</span>
        </ToolsItemContainer> */}
        <ToolsItemContainer
          onClick={() => {
            navigate('/history');
            // setStatus(5);
          }}
        >
          <HistoryIcon />
          <span>{getLang('History')}</span>
        </ToolsItemContainer>
        <ToolsItemContainer
          onClick={() => {
            navigate('/mynfts');
          }}
        >
          <MYIcon />
          <span>{getLang('My_NFTs')}</span>
        </ToolsItemContainer>
        <ToolsItemContainer
          onClick={() => {
            navigate('/swap');
            // setStatus(5);
          }}
        >
          <SwapIcon />
          <span>{getLang('Swap')}</span>
        </ToolsItemContainer>
        <ToolsItemContainer
          onClick={() => {
            window.open('https://revoke.cash/');
          }}
        >
          <img src={revokeIcon} style={{ width: '60px', height: '60px' }} />
          <span>{getLang('Revoke')}</span>
        </ToolsItemContainer>
      </div>
    </ToolsHotContainer>
  );
};
