import { Box, CircularProgress } from "@mui/material";
import moment from "moment";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNftById, getUsersFavs } from "../../../utils/apis/nft_api";
import { favs, IFavs } from "../../../utils/apis/types";
import { linkImages } from "../../../utils/linkImages";
import { GlobalContext } from "../../content-script/context/useGlobal";
import { HeadReturn } from "../common/HeadReturn";
import { ItemContainer, MoreButton, PageContainer } from "../styleCom";
import { getNftByIdV2 } from "../../../utils/apis/nft_api_v2";
import { getLang } from "../../../utils/lang";
import { ItemSkeleton } from "../../content-script/components/common/ItemSkeleton";
import { projectLinksWrapper } from "../../../utils/apis/project_wrapper";
import { Empty } from "../../content-script/components/side-panel/index/comps/Empty";
import { ListItem } from "../common/ListItem";

const WatchListPage = (props: any) => {
  const [list, setList] = useState<any[]>([]);
  const [watchLoading, setLoading] = useState(false);
  const { setActiveProject } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const getWatchList = async () => {
    getMoreWatchList(1);
  };
  const getMoreWatchList = async (_page: number) => {
    setLoading(true);
    try {
      const res = await getUsersFavs(_page, 20);
      if (res?.data) {
        const newList: any[] = res.data.map((item: favs) => {
          if (item.project) {
            item.project = projectLinksWrapper(item.project);
          }
          return {
            userIcon: item.project?.imageUrl,
            useName: item.project?.name,
            userEth: `Floor: ${
              item.project?.nftProjectInfo?.stats[0]?.floorPrice
                ? Number(item.project.nftProjectInfo.stats[0].floorPrice).toFixed(4)
                : "-"
            } E`,
            links: [
              {
                link: item.project?.externalUrl,
                img: linkImages.website,
              },
              {
                link: item.project?.links?.opensea,
                img: linkImages.opensea,
              },
              {
                link: item.project?.links?.gem,
                img: linkImages.gem,
              },
              {
                link: item.project?.links?.twitter,
                img: linkImages.twitter,
              },
            ].filter((item) => item.link),
            dayTime: moment(item.updated_at).format("MM-DD"),
            hourTime: moment(item.updated_at).format("mm:ss"),
            project_id: item.project_id,
            symbol: item.project?.symbol,
          };
        });
        setList([...list, ...newList]);
      }
    } catch (e) {
      toast.error("loading error");
    }

    setLoading(false);
  };
  const goDetail = async (symbol: string) => {
    const project = await getNftByIdV2(symbol);
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
      <HeadReturn title={getLang("WatchList")} />
      <div className="trend-list">
        {list.map((item: any, index: number) => {
          return (
            <ListItem
              key={index}
              itemData={item}
              onClick={() => {
                goDetail(item.symbol);
              }}
            />
          );
        })}
      </div>
      {watchLoading ? (
        <Box>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </Box>
      ) : list.length === 0 ? (
        <Empty />
      ) : null}
      <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
        <MoreButton onClick={nextPage}>more</MoreButton>
      </Box>
    </PageContainer>
  );
};

export default WatchListPage;
