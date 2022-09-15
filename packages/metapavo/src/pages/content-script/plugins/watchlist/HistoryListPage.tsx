import { Box, CircularProgress } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { getNftById, getVisitHistories } from "../../../../utils/apis/nft_api";
import { getNftByIdV2 } from "../../../../utils/apis/nft_api_v2";
import { IFavs } from "../../../../utils/apis/types";
import { linkImages } from "../../../../utils/linkImages";
import { GlobalContext } from "../../context/useGlobal";
import { HeadReturn } from "../common/HeadReturn";
import { ItemContainer, PageContainer } from "../styleCom";
export const Item = (props: any) => {
  const { userIcon, useName, userEth, links, dayTime, hourTime } = props.itemData;

  return (
    <ItemContainer onClick={props.onClick}>
      <img className="user-icon" src={userIcon} alt="" />
      <div className="user-des">
        <span className="user-name">{useName}</span>
        <span className="user-eth">{userEth}</span>
      </div>
      <div className="imgs-container">
        {links.map((link: any, index: number) => {
          return (
            <a className="link-container" key={index} href={link.link} target="_blank">
              <img className="link-icon" src={link.img} alt="" />
            </a>
          );
        })}
      </div>
      <div className="times">
        <span className="day-time">{dayTime}</span>
        <span className="hour-time">{hourTime}</span>
      </div>
    </ItemContainer>
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
const HisotryListPage = (props: any) => {
  const [list, setList] = useState<any[]>([]);
  const [watchLoading, setLoading] = useState(false);
  const { setActiveProject } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const getWatchList = async () => {
    getMoreWatchList(1);
  };
  const getMoreWatchList = async (_page: number) => {
    setLoading(true);
    try {
      const res = await getVisitHistories(_page, 20);
      if (res.data) {
        const newList: any[] = res.data.map((item: IFavs) => {
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
        });
        setList([...list, ...newList]);
      }
    } catch (e) {
      toast.error("loading error");
    }

    setLoading(false);
  };
  const goDetail = async (project_id: string) => {
    const project = await getNftByIdV2(project_id);
    if (project) {
      setActiveProject(project);
    }
  };
  const nextPage = async () => {
    // setPage(page + 1);
    getMoreWatchList(page + 1);
    setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
    getWatchList();
  }, []);
  return (
    <PageContainer>
      <HeadReturn title={"history"} />
      <div className="trend-list">
        {list.map((item: any, index: number) => {
          return (
            <Item
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
    </PageContainer>
  );
};

export default HisotryListPage;
