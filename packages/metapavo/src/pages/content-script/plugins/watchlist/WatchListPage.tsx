import { Box, CircularProgress } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNftById, getUsersFavs } from "../../../../utils/apis/nft_api";
import { IFavs } from "../../../../utils/apis/types";
import { GlobalContext } from "../../context/useGlobal";
import {
  HeadReturnContainer,
  HistoryHotItemContainer,
  TrendsHotContainer,
  TrendsItemContainer,
} from "../styleCom";
const RectangleTool = chrome.runtime.getURL("images/svgs/RectangleTool.svg");
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");
export const TrendsItem = (props: any) => {
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
const MoreButton = styled.button`
  width: 72px;
  height: 25px;
  background: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  border: none;
  cursor: pointer;
`;
const TrendsALL = (props: any) => {
  const [list, setList] = useState<any[]>([]);
  const [watchLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { setActiveProject } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const getWatchList = async () => {
    setLoading(true);
    try {
      const res = await getUsersFavs(page, 20);
      if (res.data) {
        setList(
          res.data.map((item: IFavs) => {
            return {
              userIcon: item.project?.image_url,
              useName: item.project?.name,
              userEth: `Floor: ${
                item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
              } E`,
              links: [],
              dayTime: moment(item.updated_at).fromNow(),
              hourTime: moment(item.updated_at).format("mm:ss"),
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
  const getMoreWatchList = async (_page: number) => {
    setLoading(true);
    try {
      const res = await getUsersFavs(_page, 20);
      if (res.data) {
        const newList: any[] = res.data.map((item: IFavs) => {
          return {
            userIcon: item.project?.image_url,
            useName: item.project?.name,
            userEth: `Floor: ${
              item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
            } E`,
            links: [],
            dayTime: moment(item.updated_at).fromNow(),
            hourTime: moment(item.updated_at).format("mm:ss"),
            project_id: item.project_id,
          };
        });
        setList([...list, ...newList]);
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
  const nextPage = async () => {
    // setPage(page + 1);
    getMoreWatchList(page + 1);
    setPage(page + 1);
  };

  const HeadReturn = (props: any) => {
    const title = props.title;

    return (
      <HeadReturnContainer>
        <img
          onClick={() => {
            navigate("/index");
          }}
          src={returnImg}
          alt=""
        />
        <span>{title}</span>
      </HeadReturnContainer>
    );
  };
  useEffect(() => {
    setPage(1);
    getWatchList();
  }, []);
  return (
    <TrendsHotContainer>
      <HeadReturn title={"watchlist"} />
      <div className="trend-list">
        {list.map((item: any, index: number) => {
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
      {watchLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
          <CircularProgress style={{ color: "#b721ff", width: "20px", height: "20px" }} />
        </Box>
      ) : null}
      <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
        <MoreButton onClick={nextPage}>more</MoreButton>
      </Box>
    </TrendsHotContainer>
  );
};

export default TrendsALL;
