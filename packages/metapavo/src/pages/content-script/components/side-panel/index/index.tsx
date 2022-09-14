import { useContext } from "react";
import { getNftById } from "../../../../../utils/apis/nft_api";
import { GlobalContext } from "../../../context/useGlobal";

import { Container } from "./styles";
import { SearchCom } from "./comps/SearchCom";
import { HistoryHot } from "./comps/HistoryHot";
import { ToolsHot } from "./comps/ToolsHot";
import { HeadCom } from "./comps/Head";

const Pavo = () => {
  const { setActiveProject } = useContext(GlobalContext);
  const goDetail = async (project_id: string) => {
    const project = await getNftById(project_id);
    if (project) {
      setActiveProject(project);
    }
  };

  return (
    <Container>
      <HeadCom />

      <SearchCom goDetail={goDetail} />

      <ToolsHot title={"TOOLS"} />

      <HistoryHot title={"HISTORY"} goDetail={goDetail} />
    </Container>
  );
};

export default Pavo;
