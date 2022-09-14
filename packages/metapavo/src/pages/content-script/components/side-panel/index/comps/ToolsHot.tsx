import { useNavigate } from "react-router-dom";
import { WatchlistIcon, AlarmIcon, HistoryIcon, SwapIcon } from "../icons/icons";
import { ToolsHotContainer, HotTitle, ToolsItemContainer } from "../styles";

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
