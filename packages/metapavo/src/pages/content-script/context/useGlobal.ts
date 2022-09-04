import React from "react";
import { useNavigate } from "react-router";
import { createVisitHistory, getNftById } from "../../../utils/apis/nft_api";
import { IProject } from "../../../utils/apis/types";
import { ScamResult } from "../../../utils/detector/src";
import { Checker } from "../../../utils/recognizer/checkers";
import { checkMarketPlace } from "../../../utils/recognizer/checkers/marketplace";
import { checkTwitter } from "../../../utils/recognizer/checkers/twitter";
import { checkTwitterScam } from "../../../utils/recognizer/checkers/twitterScam";
import { CheckResultStatus } from "../../../utils/recognizer/checkers/types";
import { checkWebsite } from "../../../utils/recognizer/checkers/website";
type RecognizerStatus = "danger" | "warning" | "success" | "none";
export const GlobalContext = React.createContext<{
  showMain: boolean;
  setShowMain: (showMain: boolean) => void;
  activeProject: IProject | null;
  activeTokenId: string | null;
  setActiveTokenId: (tokenId: string) => void;
  setActiveProject: (activeProject: IProject | null) => void;
  detectStatus: RecognizerStatus;
  setDetectStatus: (detectStatus: RecognizerStatus) => void;
  checkPlatform: () => void;
  addRootClass: string;
  showSuccess: () => void;
  gas: number;
  setGas: (gas: number) => void;
  activeAccoidion: number;
  setActiveAccoidion: (activeAccoidion: number) => void;
  setAddRootClass: (addRootClass: string) => void;
  refreshActiveProject: () => void;
  showLogin: () => void;
}>({} as any);
function useGlobal() {
  const [showMain, _setShowMain] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState<IProject | null>(null);
  const [activeTokenId, setActiveTokenId] = React.useState<string | null>(null);
  const [detectStatus, setDetectStatus] = React.useState<RecognizerStatus>("none");
  const [addRootClass, setAddRootClass] = React.useState("");
  const [gas, setGas] = React.useState(0);
  const [activeAccoidion, setActiveAccoidion] = React.useState(0);
  const checker = new Checker();
  checker.on("changed", (projectInfo: IProject | null) => {
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
        document.body.style.paddingRight = "303px";
        document.body.style.boxSizing = "border-box";
      }, 600);
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
    setInterval(async () => {
      let twitterScamInfo: ScamResult | undefined = undefined;
      twitterScamInfo = await checkTwitterScam();
      if (twitterScamInfo) {
        setDetectStatus("danger");
        setTimeout(() => {
          setAddRootClass("metapavo-main-box-danger");
        }, 1000);
      }
    }, 2000);
  }

  async function refreshActiveProject() {
    if (activeProject) {
      const res = await getNftById(activeProject.id);
      if (res) {
        setActiveProject(res);
      }
    }
  }
  let navigate = useNavigate();
  async function showLogin() {
    setShowMain(false);
    // navigate("/login");
    chrome.tabs.create({ url: "/login.html" });
  }
  return {
    showMain,
    setShowMain,
    showLogin,
    activeProject,
    setActiveProject,
    detectStatus,
    setDetectStatus,
    checkPlatform,
    addRootClass,
    showSuccess,
    gas,
    setGas,
    activeAccoidion,
    setActiveAccoidion,
    setAddRootClass,
    refreshActiveProject,
    activeTokenId,
    setActiveTokenId,
  };
}
export default useGlobal;
