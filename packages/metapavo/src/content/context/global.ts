import React from "react";
import { IProject } from "../../apis/types";
import {
  checkTwitterScam,
  checkTwitterUser,
  detectProjectByTwitterId,
} from "../../recognizer/twitter";
type RecognizerStatus = "danger" | "warning" | "success" | "none";
export const GlobalContext = React.createContext<{
  showMain: boolean;
  setShowMain: (showMain: boolean) => void;
}>({
  showMain: false,
  setShowMain: () => {},
});
function useGlobal() {
  const [showMain, setShowMain] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState<IProject | null>(null);
  const [circleStatus, setCircleStatus] = React.useState<RecognizerStatus>("none");
  const [addRootClass, setAddRootClass] = React.useState("");
  const [gas, setGas] = React.useState(0);
  function showSuccess() {
    setAddRootClass("metapavo-main-box-success");
    setTimeout(() => {
      setAddRootClass("");
    }, 5000);
  }
  function checkTwitter() {
    let lastCheckTwitterId: string | null = null;
    setInterval(async () => {
      const twitterPageDetail = await checkTwitterUser();
      if (twitterPageDetail && twitterPageDetail.userId) {
        if (lastCheckTwitterId !== twitterPageDetail.userId) {
          const projectInfo = await detectProjectByTwitterId(twitterPageDetail?.userId);
          if (projectInfo) {
            setCircleStatus("success");
            setTimeout(() => {
              showSuccess();
            }, 1000);
            setActiveProject(projectInfo);
          } else {
            setCircleStatus("none");
            setActiveProject(null);
            setTimeout(() => {
              setAddRootClass("");
            }, 1000);
          }
          const twitterInfo = await checkTwitterScam(twitterPageDetail);
          if (twitterInfo?.detectResult) {
            setCircleStatus("danger");
            setTimeout(() => {
              setAddRootClass("metapavo-main-box-danger");
            }, 1000);
          }
        }
        lastCheckTwitterId = twitterPageDetail.userId;
      } else {
        setCircleStatus("none");
        setActiveProject(null);
        setTimeout(() => {
          setAddRootClass("");
        }, 1000);
      }
    }, 2000);
  }

  return {
    showMain,
    setShowMain,
    activeProject,
    setActiveProject,
    circleStatus,
    setCircleStatus,
    checkTwitter,
    addRootClass,
    showSuccess,
    gas,
    setGas,
  };
}
export default useGlobal;
