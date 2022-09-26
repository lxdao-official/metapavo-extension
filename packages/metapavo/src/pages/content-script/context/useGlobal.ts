import React from "react";
import { useNavigate } from "react-router";
import { createVisitHistory, getNftById } from "../../../utils/apis/nft_api";
import { getNftByIdV2 } from "../../../utils/apis/nft_api_v2";
import { projectLinksWrapper } from "../../../utils/apis/project_wrapper";
import { IProject, IProjectV2 } from "../../../utils/apis/types";
import { ScamResult } from "../../../utils/detector/src";
import { Checker } from "../../../utils/recognizer/checkers";
import { checkTwitterScam } from "../../../utils/recognizer/checkers/twitterScam";
import { checkWebsiteScam } from "../../../utils/recognizer/checkers/websiteScam";
type RecognizerStatus = "danger" | "warning" | "success" | "none";
export const GlobalContext = React.createContext<{
  showMain: boolean;
  setShowMain: (showMain: boolean) => void;
  activeProject: IProjectV2 | null;
  activeTokenId: string | null;
  setActiveTokenId: (tokenId: string) => void;
  setActiveProject: (activeProject: IProjectV2 | null) => void;
  detectStatus: RecognizerStatus;
  setDetectStatus: (detectStatus: RecognizerStatus) => void;
  checkPlatform: () => void;
  addRootClass: string;
  showSuccess: () => void;
  activeAccoidion: number;
  setActiveAccoidion: (activeAccoidion: number) => void;
  setAddRootClass: (addRootClass: string) => void;
  refreshActiveProject: () => void;
  goLogin: () => void;
  showLogin: boolean;
  setShowLogin: (showLogin: boolean) => void;
}>({} as any);
function useGlobal() {
  const [showMain, _setShowMain] = React.useState(false);
  const [activeProject, _setActiveProject] = React.useState<IProjectV2 | null>(null);
  const [activeTokenId, setActiveTokenId] = React.useState<string | null>(null);
  const [detectStatus, setDetectStatus] = React.useState<RecognizerStatus>("none");
  const [addRootClass, setAddRootClass] = React.useState("");
  const [activeAccoidion, setActiveAccoidion] = React.useState(0);
  const checker = new Checker();
  const setActiveProject = (_project: IProjectV2 | null) => {
    if (_project) {
      _setActiveProject(projectLinksWrapper(_project));
    } else {
      _setActiveProject(_project);
    }
  };
  checker.on("changed", (projectInfo: IProjectV2 | null) => {
    console.log("changed", projectInfo);
    if (projectInfo) {
      setDetectStatus("success");
      setTimeout(() => {
        showSuccess();
      }, 1000);
      setActiveProject(projectInfo);
      createVisitHistory(projectInfo.id);
    } else {
      setDetectStatus("none");
      setActiveProject(null);
      setAddRootClass("");
    }
  });
  checker.on("danger", (scamInfo: ScamResult) => {
    console.log("danger", scamInfo);
    if (scamInfo) {
      setDetectStatus("danger");
      setTimeout(() => {
        setAddRootClass("metapavo-main-box-danger");
      }, 1000);
    }
  });
  checker.on("tokenIdChanged", (tokenId: string) => {
    if (tokenId) {
      setActiveTokenId(tokenId);
    } else {
      setActiveTokenId("");
    }
  });
  function showSuccess() {
    setAddRootClass("metapavo-main-box-success");
  }

  function setShowMain(_show: boolean) {
    if (_show) {
      setTimeout(() => {
        document.body.style.paddingRight = "343px";
        document.body.style.boxSizing = "border-box";
      }, 1000);
    } else {
      // setTimeout(() => {
      document.body.style.paddingRight = "0";
      document.body.style.boxSizing = "inherit";
      // }, 800);
    }
    _setShowMain(_show);
  }
  async function checkPlatform() {
    checker.check();
    // const websiteScamResult = await checkWebsiteScam();
    // if (websiteScamResult) {
    //   if (websiteScamResult === "blacklist") {
    //     setDetectStatus("danger");
    //   } else {
    //     setDetectStatus("warning");
    //   }
    //   setTimeout(() => {
    //     setAddRootClass("metapavo-main-box-danger");
    //   }, 1000);
    // } else {
    // setInterval(async () => {
    //   let twitterScamInfo: ScamResult | undefined = undefined;
    //   twitterScamInfo = await checkTwitterScam();
    //   if (twitterScamInfo) {
    //     setDetectStatus("danger");
    //     setTimeout(() => {
    //       setAddRootClass("metapavo-main-box-danger");
    //     }, 1000);
    //   } else {
    //   }
    // }, 2000);
    // }
  }

  async function refreshActiveProject() {
    if (activeProject) {
      const res = await getNftByIdV2(activeProject.symbol);
      if (res) {
        setActiveProject(res);
      }
    }
  }
  let navigate = useNavigate();
  async function goLogin() {
    setShowMain(false);
    // navigate("/login");
    chrome.tabs.create({ url: "/login.html" });
  }

  const [showLogin, setShowLogin] = React.useState(false);
  return {
    showMain,
    setShowMain,
    goLogin,
    showLogin,
    setShowLogin,
    activeProject,
    setActiveProject,
    detectStatus,
    setDetectStatus,
    checkPlatform,
    addRootClass,
    showSuccess,
    activeAccoidion,
    setActiveAccoidion,
    setAddRootClass,
    refreshActiveProject,
    activeTokenId,
    setActiveTokenId,
  };
}
export default useGlobal;
