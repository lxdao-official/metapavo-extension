import { Box, CircularProgress } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { getNftById, getUsersFavs, getVisitHistories } from "../../../../../apis/nft_api";
import { IFavs, IVisitHistory } from "../../../../../apis/types";
import { GlobalContext } from "../../../../context/global";
import {
  HistoryHotContainer,
  HistoryHotItemContainer,
  TrendsHotContainer,
  TrendsItemContainer,
} from "../styleCom";
const RectangleTool = chrome.runtime.getURL("images/svgs/RectangleTool.svg");
export const HistoryItem = (props: any) => {
  const { userIcon, useName, userEth, links, dayTime, hourTime } = props.itemData;

  return (
    <HistoryHotItemContainer onClick={props.onClick}>
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
const HistoryALL = (props: any) => {
  const [list, setList] = useState([]);
  const [watchLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { setActiveProject } = useContext(GlobalContext);
  const getWatchList = async () => {
    setLoading(true);
    try {
      const res = await getVisitHistories(1, 20);
      if (res.data) {
        setList(
          res.data.map((item: IVisitHistory) => {
            return {
              userIcon: item.project?.image_url,
              useName: item.project?.name,
              userEth: `Floor: ${
                item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
              } E`,
              links: [],
              dayTime: moment(item.created_at).fromNow(),
              hourTime: moment(item.created_at).format("mm:ss"),
              project_id: item.project_id,
            };
          }),
        );
      }
    } catch (e) {
      enqueueSnackbar("loading error");
    }
    setLoading(false);
  };
  const goDetail = async (project_id: string) => {
    const project = await getNftById(project_id);
    if (project) {
      setActiveProject(project);
    }
  };
  useEffect(() => {
    getWatchList();
  }, []);
  return (
    <HistoryHotContainer>
      {watchLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
          <CircularProgress style={{ color: "#b721ff", width: "20px", height: "20px" }} />
        </Box>
      ) : null}
      <div className="history-list">
        {list.map((item: any, index: number) => {
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

export default HistoryALL;
