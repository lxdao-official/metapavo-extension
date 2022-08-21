import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { reportScam, Detector, PostDetail, PageDetail, Project } from "../../../detector/src";

import {
  checkTwitterScam,
  checkTwitterUser,
  detectProjectByTwitterId,
  getPageMeta,
  getTwitterMeta,
} from "../../../recognizer/twitter";
import useGlobal, { GlobalContext } from "../../context/global";
import DangerPopup from "./status/danger";
import SuccessPopup from "./status/success";
import Main from "../main/main";
import useWallet, { WalletContext } from "../../context/useWallet";
import { initial } from "lodash";

const transform = keyframes`
  0%,
  100% {
    border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  }
  14% {
    border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
  }
  28% {
    border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
  }
  42% {
    border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
  }
  56% {
    border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
  }
  70% {
    border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
  }
  84% {
    border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
  }
 `;
const movement = keyframes`
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: translateY(5%) rotateY(10deg);
  }
  `;

const boom = keyframes`
  0% {
    border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
    background-color: #b721ff;
  }
  100% {
    border-radius: 16px;
    background-color: #fff;
  }
  `;
const dangerboom = keyframes`
  0% {
    border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
    background-color: #ff0000;
  }
  100% {
    border-radius: 16px;
    background-color: #fff;
  }
  `;
const RootElement = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  color: #fff !important;
  z-index: 1000001;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  width: 50px;
  justify-content: center;
  height: 50px;
  cursor: pointer;
  --background: rgb(96, 93, 236);
  --blob: #fdfbfd;
  // --shades: inset 10px 0 40px #b721ff, inset -10px 0 20px #21d4fd, inset -40px 10px 100px #3551fd;
  --shades: inset 10px 0 40px #b721ff, inset -10px 0 20px #7de2ac, inset -40px 10px 100px #9f50ff;
  --error-shades: inset 10px 0 40px #ff0000, inset -10px 0 20px #ff0000,
    inset -40px 10px 100px #ff0000;
  * {
    font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif !important;
  }
  #metapavo-box-gas {
    content: "";
    display: block;
    height: 50px;
    width: 50px;
    background-color: var(--blob);
    box-shadow: var(--shades), 0 0 5px rgba(0, 0, 0, 0.4);
    background-size: 1600% 1600%;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    transition: all 1s ease;
    perspective: 1000px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
    -webkit-animation: ${transform} 10s ease-in-out infinite both alternate,
      ${movement} 10s ease-in-out infinite both;
    animation: ${transform} 10s ease-in-out infinite both alternate,
      ${movement} 10s ease-in-out infinite both;
    opacity: 0.6;
  }
  :hover #metapavo-box-gas {
    opacity: 1;
  }
  &.metapavo-main-status-danger #metapavo-box-gas {
    background-color: var(--blob);
    box-shadow: var(--error-shades), 0 0 5px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
  &.metapavo-main-status-success #metapavo-box-gas {
    background-color: var(--blob);
    box-shadow: var(--shades), 0 0 5px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
  &.metapavo-main-box-success {
    width: 307px;
    height: 167px;
  }
  &.metapavo-main-box-success #metapavo-box-gas {
    width: 307px;
    height: 167px;
    animation: ${boom} 1s ease-in-out both alternate;
    overflow: hidden;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: none;
  }
  &.metapavo-main-box-danger {
    width: 307px;
    height: 167px;
  }
  &.metapavo-main-box-danger #metapavo-box-gas {
    width: 307px;
    height: 167px;
    animation: ${dangerboom} 1s ease-in-out both alternate;
    overflow: hidden;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: none;
  }
  #metapavo-gas-text {
    line-height: 50px;
    color: #fff !important;
  }
`;

function App() {
  const [hide, setHide] = React.useState(false);

  const rootRef = useRef<any>(null);
  const gasRef = useRef<HTMLDivElement>(null);
  const useG = useGlobal();
  const wallet = useWallet();

  function dragElement() {
    if (!gasRef.current) return;
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    let mousedownTimestamp: number = 0;
    // otherwise, move the DIV from anywhere inside the DIV:
    gasRef.current.onmousedown = dragMouseDown;
    gasRef.current.onmouseup = () => {
      if (new Date().getTime() - mousedownTimestamp < 300) {
        if (!useG.addRootClass) {
          useG.setShowMain(!useG.showMain);
          closeDragElement();
        }
      }
    };

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      // e.preventDefault();
      mousedownTimestamp = Date.now();

      // get the mouse cursor position at startup:
      pos3 = window.innerWidth - e.clientX;
      pos4 = window.innerHeight - e.clientY;
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      const nowPosX = window.innerWidth - e.clientX;
      const nowPosY = window.innerHeight - e.clientY;
      // calculate the new cursor position:
      pos1 = pos3 - nowPosX;
      pos2 = pos4 - nowPosY;
      pos3 = nowPosX;
      pos4 = nowPosY;
      // set the element's new position:
      rootRef.current.style.right =
        Number(rootRef.current.style.right.replace(/[^\d]/g, "")) - pos1 + "px";
      rootRef.current.style.bottom =
        Number(rootRef.current.style.bottom.replace(/[^\d]/g, "")) - pos2 + "px";
      localStorage.setItem(
        "metapavo-pos",
        [rootRef.current.style.right, rootRef.current.style.bottom].join("-"),
      );
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
  }

  function init() {
    useG.checkTwitter();
    useG.checkOpenSea();
    useG.checkWebsite();

    rootRef.current.style.right = "50px";
    rootRef.current.style.bottom = "50px";
    if (localStorage.getItem("metapavo-pos")) {
      const pos = (localStorage.getItem("metapavo-pos") || "").split("-");
      if (pos.length === 2) {
        rootRef.current.style.right = pos[0];
        rootRef.current.style.bottom = pos[1];
      }
    }
    rootRef.current && dragElement();

    chrome?.runtime?.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.cmd === "gasUpdate") useG.setGas(request.value);
      sendResponse("ok");
    });
    chrome.runtime.sendMessage(
      {
        cmd: "getGas",
      },
      function (response) {
        if (!chrome.runtime.lastError) {
          useG.setGas(response);
        } else {
        }
      },
    );
  }

  let inited = false;
  useEffect(() => {
    if (!inited) init();
    inited = true;
  }, []);

  useEffect(() => {
    if (!!useG.addRootClass && useG.detectStatus === "success") {
      setTimeout(() => {
        if (rootRef.current.getAttribute("mouseIsOver") !== "1") {
          useG.setAddRootClass("");
        }
      }, 5000);
    }
  }, [useG.addRootClass]);

  return (
    <>
      <GlobalContext.Provider value={useG}>
        <WalletContext.Provider value={wallet}>
          <RootElement
            id="metapavo-box"
            className={[
              "web3-spin",
              useG.detectStatus === "danger" ? "metapavo-main-status-danger" : "",
              useG.detectStatus === "success" ? "metapavo-main-status-success" : "",
              useG.addRootClass,
            ].join(" ")}
            ref={rootRef}
            style={{
              display: !hide && !useG.showMain ? "block" : "none",
            }}
            onMouseEnter={() => {
              if (useG.detectStatus === "success") {
                useG.showSuccess();
              }
              rootRef.current.setAttribute("mouseIsOver", "1");
            }}
            onMouseLeave={() => {
              rootRef.current.setAttribute("mouseIsOver", "0");
              if (useG.detectStatus === "success") {
                useG.setAddRootClass("");
              }
            }}
          >
            <div
              id="metapavo-box-gas"
              title="Drag to move"
              ref={gasRef}
              style={{ userSelect: "none" }}
              onDoubleClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setHide(true);
                setTimeout(() => {
                  setHide(false);
                }, 10000);
              }}
            >
              <div id="metapavo-gas-text">{useG.gas}</div>
            </div>
            <DangerPopup
              state={useG.addRootClass === "metapavo-main-box-danger" ? "show" : "hide"}
            />
            <SuccessPopup
              state={useG.addRootClass === "metapavo-main-box-success" ? "show" : "hide"}
            />
          </RootElement>
          {useG.showMain ? <Main /> : null}
        </WalletContext.Provider>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
