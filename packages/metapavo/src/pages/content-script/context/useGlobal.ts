import { getNftByIdV2 } from 'extension-common/src/apis/nft_api_v2';
import { projectLinksWrapper } from 'extension-common/src/apis/project_wrapper';
import { IProjectV2 } from 'extension-common/src/apis/types';
import { Checker } from 'extension-common/src/recognizer/checkers';
import React from 'react';

type RecognizerStatus = 'danger' | 'warning' | 'success' | 'none';
export const GlobalContext = React.createContext<{
  activeProject: IProjectV2 | null;
  activeTokenId: string | null;
  setActiveTokenId: (tokenId: string) => void;
  setActiveProject: (activeProject: IProjectV2 | null) => void;
  detectStatus: RecognizerStatus;
  setDetectStatus: (detectStatus: RecognizerStatus) => void;
  checkPlatform: () => void;
  addRootClass: string;
  showSuccess: () => void;
  setAddRootClass: (addRootClass: string) => void;
  refreshActiveProject: () => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  scamInfo: {
    result: boolean;
    slug: string;
    name: string;
    twitterUsername: string;
    scamDataList?: {
      name: string;
      url: string;
      username: string;
      status: number;
      createTime: string;
      updateTime: string;
      levenshtein: number;
    }[];
  } | null;
}>({} as any);
function useGlobal() {
  const [activeProject, _setActiveProject] = React.useState<IProjectV2 | null>(
    null,
  );
  const [activeTokenId, setActiveTokenId] = React.useState<string | null>(null);
  const [detectStatus, setDetectStatus] =
    React.useState<RecognizerStatus>('none');
  const [addRootClass, setAddRootClass] = React.useState('');
  const [scamInfo, setScamInfo] = React.useState<{
    result: boolean;
    slug: string;
    name: string;
    twitterUsername: string;
    scamDataList?: {
      name: string;
      url: string;
      username: string;
      status: number;
      createTime: string;
      updateTime: string;
      levenshtein: number;
    }[];
  } | null>(null);
  const checker = new Checker();
  const setActiveProject = (_project: IProjectV2 | null) => {
    if (_project) {
      _setActiveProject(projectLinksWrapper(_project));
    } else {
      _setActiveProject(_project);
    }
  };
  checker.on('changed', (projectInfo: IProjectV2 | null) => {
    if (projectInfo) {
      setDetectStatus('success');
      setTimeout(() => {
        showSuccess();
      }, 1000);
      setActiveProject(projectInfo);
    } else {
      setDetectStatus('none');
      setActiveProject(null);
      setAddRootClass('');
    }
  });
  checker.on(
    'danger',
    (scamInfo: {
      result: boolean;
      slug: string;
      name: string;
      twitterUsername: string;
      scamDataList?: {
        name: string;
        url: string;
        username: string;
        status: number;
        createTime: string;
        updateTime: string;
        levenshtein: number;
      }[];
    }) => {
      if (scamInfo) {
        setDetectStatus('danger');
        setTimeout(() => {
          setAddRootClass('metapavo-main-box-danger');
        }, 1000);
        setScamInfo(scamInfo);
      } else {
        setScamInfo(null);
      }
    },
  );
  checker.on('tokenIdChanged', (tokenId: string) => {
    if (tokenId) {
      setActiveTokenId(tokenId);
    } else {
      setActiveTokenId('');
    }
  });
  function showSuccess() {
    setAddRootClass('metapavo-main-box-success');
  }

  async function checkPlatform() {
    checker.check();
  }

  async function refreshActiveProject() {
    if (activeProject) {
      const res = await getNftByIdV2(activeProject.symbol);
      if (res) {
        setActiveProject(res);
      }
    }
  }

  const [showSearch, setShowSearch] = React.useState(false);
  return {
    activeProject,
    setActiveProject,
    detectStatus,
    setDetectStatus,
    checkPlatform,
    addRootClass,
    showSuccess,
    setAddRootClass,
    refreshActiveProject,
    activeTokenId,
    setActiveTokenId,
    showSearch,
    setShowSearch,
    scamInfo,
  };
}
export default useGlobal;
