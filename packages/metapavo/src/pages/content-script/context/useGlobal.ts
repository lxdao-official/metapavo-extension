import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createVisitHistory, findNftByURL, getNftById } from "../../../utils/apis/nft_api";
import { IProject } from "../../../utils/apis/types";
import { ScamResult } from "../../../utils/detector/src";
import { checkMarketPlace } from "../../../utils/recognizer/checkers/marketplace";
import { checkTwitter } from "../../../utils/recognizer/checkers/twitter";
import { checkTwitterScam } from "../../../utils/recognizer/checkers/twitterScam";
import { CheckResultStatus } from "../../../utils/recognizer/checkers/types";
import { checkWebsite } from "../../../utils/recognizer/checkers/website";
import { recognizerGEM } from "../../../utils/recognizer/gem";
import { recognizerOpenSea } from "../../../utils/recognizer/opensea";
import {
  checkTwitterUser,
  detectProjectByContractAddress,
  detectProjectById,
  detectProjectByTwitterId,
} from "../../../utils/recognizer/twitter";
import { recognizerWebsite } from "../../../utils/recognizer/website";
import { recognizerX2Y2 } from "../../../utils/recognizer/x2y2";
type RecognizerStatus = "danger" | "warning" | "success" | "none";
export const GlobalContext = React.createContext<{
  showMain: boolean;
  setShowMain: (showMain: boolean) => void;
  activeProject: IProject | null;
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
  const [detectStatus, setDetectStatus] = React.useState<RecognizerStatus>("none");
  const [addRootClass, setAddRootClass] = React.useState("");
  const [gas, setGas] = React.useState(0);
  const [activeAccoidion, setActiveAccoidion] = React.useState(0);

  function showSuccess() {
    setAddRootClass("metapavo-main-box-success");
  }

  function setShowMain(_show: boolean) {
    if (_show) {
      setTimeout(() => {
        document.body.style.paddingRight = "303px";
      }, 600);
    } else {
      // setTimeout(() => {
      document.body.style.paddingRight = "0";
      // }, 800);
    }
    _setShowMain(_show);
  }
  async function checkPlatform() {
    setInterval(async () => {
      let checkEntryResult: {
        projectInfo?: IProject;
        status: CheckResultStatus;
      };
      let twitterScamInfo: ScamResult | undefined = undefined;
      twitterScamInfo = await checkTwitterScam();
      if (twitterScamInfo) {
        setDetectStatus("danger");
        setTimeout(() => {
          setAddRootClass("metapavo-main-box-danger");
        }, 1000);
      }

      checkEntryResult = await checkTwitter();

      if (!checkEntryResult.projectInfo) checkEntryResult = await checkMarketPlace();

      if (!checkEntryResult.projectInfo) checkEntryResult = await checkWebsite();

      if (checkEntryResult.status === CheckResultStatus.SUCCESS && checkEntryResult.projectInfo) {
        setDetectStatus("success");
        setTimeout(() => {
          showSuccess();
        }, 1000);
        setActiveProject(checkEntryResult.projectInfo);
        createVisitHistory(checkEntryResult.projectInfo.id);
      }
      if (checkEntryResult.status == CheckResultStatus.NOTINSERVER) {
        setDetectStatus("none");
        setActiveProject(null);
        setTimeout(() => {
          setAddRootClass("");
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
    setShowMain(true);
    navigate("/login");
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
  };
}
export default useGlobal;
