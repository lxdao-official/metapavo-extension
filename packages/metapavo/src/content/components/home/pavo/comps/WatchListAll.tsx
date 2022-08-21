import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { getNftById, getUsersFavs } from "../../../../../apis/nft_api";
import { IFavs } from "../../../../../apis/types";
import { GlobalContext } from "../../../../context/global";
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
const TrendsALL = (props: any) => {
  const [list, setList] = useState([]);
  const [watchLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { setActiveProject } = useContext(GlobalContext);
  const getWatchList = async () => {
    setLoading(true);
    try {
      const res = await getUsersFavs(1, 20);
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
    <TrendsHotContainer>
      {watchLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "30px" }}>
          <CircularProgress style={{ color: "#b721ff", width: "20px", height: "20px" }} />
        </Box>
      ) : null}
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
    </TrendsHotContainer>
  );
};

export default TrendsALL;
