import { useContext } from 'react';

import { getNftByIdV2 } from '../../../../../utils/apis/nft_api_v2';
import { getLang } from '../../../../../utils/lang';
import { GlobalContext } from '../../../context/useGlobal';
import { HeadCom } from './comps/Head';
import { HistoryHot } from './comps/HistoryHot';
import { SearchCom } from './comps/SearchCom';
import { ToolsHot } from './comps/ToolsHot';
import { Container } from './styles';

const Pavo = () => {
  const { setActiveProject } = useContext(GlobalContext);
  const goDetail = async (project_id: string) => {
    const project = await getNftByIdV2(project_id);
    if (project) {
      setActiveProject(project);
    }
  };

  return (
    <Container>
      <HeadCom />

      <SearchCom goDetail={goDetail} />

      <ToolsHot title={getLang('Tools')} />

      <HistoryHot title={getLang('History')} goDetail={goDetail} />
    </Container>
  );
};

export default Pavo;
