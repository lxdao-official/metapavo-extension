import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getNftById, getUsersFavs } from "../../../../../../../utils/apis/nft_api";
import { IFavs } from "../../../../../../../utils/apis/types";
import { GlobalContext } from "../../../../../context/useGlobal";
import { TrendsHotContainer, TrendsItemContainer } from "../styleCom";
const RectangleTool = chrome.runtime.getURL("images/svgs/RectangleTool.svg");
export const TrendsItem = (props: any) => {
  const item = props.itemData;

  return (
    <TrendsItemContainer onClick={props.onClick}>
      <div
        style={{ backgroundImage: `url(${item.img ? item.img : RectangleTool})` }}
        className="des-cover"
      />
      <div className="des-title">
        <span className="name">{item.name}</span>
        <span className="eth-own">{item.eth}</span>
      </div>
    </TrendsItemContainer>
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
  const getWatchList = async () => {
    setLoading(true);
    try {
      const res = await getUsersFavs(page, 20);
      if (res.data) {
        setList(
          res.data.map((item: IFavs) => {
            return {
              img: item.project?.image_url,
              name: item.project?.name,
              eth: `Floor: ${
                item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
              } E`,
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
            img: item.project?.image_url,
            name: item.project?.name,
            eth: `Floor: ${
              item.project?.floor_price ? Number(item.project.floor_price).toFixed(2) : "-"
            } E`,
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
  useEffect(() => {
    setPage(1);
    getWatchList();
  }, []);
  return (
    <TrendsHotContainer>
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
