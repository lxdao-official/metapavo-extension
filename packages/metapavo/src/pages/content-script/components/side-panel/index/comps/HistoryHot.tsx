import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "../../../../plugins/watchlist/HistoryListPage";
import { HistoryHotContainer, HotTitle } from "../styles";
import { Empty } from "./Empty";
import { linkImages } from "../../../../../../utils/linkImages";
import { getVisitHistories } from "../../../../../../utils/apis/nft_api";
import { IVisitHistory } from "../../../../../../utils/apis/types";
import moment from "moment";
import { useNavigate } from "react-router-dom";
export const HistoryHotTitle = (props: any) => {
  const title = props.title;
  const navigate = useNavigate();
  return (
    <HotTitle>
      <span className="title">{title}</span>
      <span
        className="op"
        onClick={() => {
          navigate("/history");
        }}
      >
        More
      </span>
    </HotTitle>
  );
};
export const HistoryHot = (props: any) => {
  const title = props.title;
  const [getHistoryLoading, setGetHistoryLoading] = useState(false);
  const [historyHot, setHistoryHot] = useState<any[]>([]);
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
  useEffect(() => {
    console.log("init");
    getHistories();
    // getFavs();
  }, []);
  return (
    <HistoryHotContainer>
      <HistoryHotTitle title={title} />

      <div className="hot-history-list">
        {getHistoryLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
            <CircularProgress style={{ color: "#b721ff", width: "20px", height: "20px" }} />
          </Box>
        ) : historyHot.length === 0 ? (
          <Empty />
        ) : null}

        {historyHot.map((item: any, index: number) => {
          return (
            <Item
              key={index}
              itemData={item}
              onClick={() => {
                props.goDetail(item.project_id);
              }}
            />
          );
        })}
      </div>
    </HistoryHotContainer>
  );
};
