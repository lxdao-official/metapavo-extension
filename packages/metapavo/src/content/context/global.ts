import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createVisitHistory, findNftByURL, getNftById } from "../../apis/nft_api";
import { IProject } from "../../apis/types";
import { recognizerOpenSea } from "../../recognizer/opensea";
import {
  checkTwitterScam,
  checkTwitterUser,
  detectProjectByContractAddress,
  detectProjectById,
  detectProjectByTwitterId,
} from "../../recognizer/twitter";
import { recognizerWebsite } from "../../recognizer/website";
type RecognizerStatus = "danger" | "warning" | "success" | "none";
export const GlobalContext = React.createContext<{
  showMain: boolean;
  setShowMain: (showMain: boolean) => void;
  activeProject: IProject | null;
  setActiveProject: (activeProject: IProject | null) => void;
  detectStatus: RecognizerStatus;
  setDetectStatus: (detectStatus: RecognizerStatus) => void;
  checkTwitter: () => void;
  checkOpenSea: () => void;
  checkWebsite: () => void;
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
      document.body.style.paddingRight = "303px";
    } else {
      document.body.style.paddingRight = "0";
    }
    _setShowMain(_show);
  }

  async function checkWebsite() {
    if (window.location.host.indexOf("opensea.io") !== -1) return;
    if (window.location.host.indexOf("twitter.com") !== -1) return;
    const matchedURL = await recognizerWebsite();
    if (matchedURL && matchedURL[1]) {
      const projectInfo = await findNftByURL(matchedURL);
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
        setTimeout(() => {
          setAddRootClass("");
        }, 1000);
      }
    }
    return matchedURL;
  }
  async function checkOpenSea() {
    if (window.location.host.indexOf("opensea.io") == -1) return;
    let lastCheckOpenseaId: string | undefined = undefined;
    setInterval(async () => {
      const result = await recognizerOpenSea();
      if (result && (result.contract || result.id)) {
        if ((result.contract || result.id) !== lastCheckOpenseaId) {
          const projectInfo = result.id
            ? await detectProjectById(result.id)
            : await detectProjectByContractAddress(result.contract!);
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
            setTimeout(() => {
              setAddRootClass("");
            }, 1000);
          }
        }
        lastCheckOpenseaId = result.contract || result.id;
      } else {
        setDetectStatus("none");
        setActiveProject(null);
        setTimeout(() => {
          setAddRootClass("");
        }, 1000);
      }
    }, 2000);
  }
  function checkTwitter() {
    if (window.location.host.indexOf("twitter.com") == -1) return;
    let lastCheckTwitterId: string | null = null;
    setInterval(async () => {
      const twitterPageDetail = await checkTwitterUser();
      if (twitterPageDetail && twitterPageDetail.userId) {
        if (lastCheckTwitterId !== twitterPageDetail.userId) {
          const projectInfo = await detectProjectByTwitterId(twitterPageDetail?.userId);
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
            setTimeout(() => {
              setAddRootClass("");
            }, 1000);
          }
          const twitterInfo = await checkTwitterScam(twitterPageDetail);
          if (twitterInfo?.detectResult) {
            setDetectStatus("danger");
            setTimeout(() => {
              setAddRootClass("metapavo-main-box-danger");
            }, 1000);
          }
        }
        lastCheckTwitterId = twitterPageDetail.userId;
      } else {
        setDetectStatus("none");
        setActiveProject(null);
        setTimeout(() => {
          setAddRootClass("");
        }, 1000);
      }
    }, 3000);
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
    checkTwitter,
    checkOpenSea,
    checkWebsite,
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
