import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { reportScam, Detector, PostDetail, PageDetail, Project } from "../detector/src";
import {
  checkTwitterScam,
  checkTwitterUser,
  detectProjectByTwitterId,
  getPageMeta,
  getTwitterMeta,
} from "../recognizer/twitter";
import DangerPopup from "./status/danger";

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
const RootElement = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  color: #fff;
  z-index: 99999;
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
  --shades: inset 10px 0 40px #b721ff, inset -10px 0 20px #21d4fd, inset -40px 10px 100px #3551fd;
  --error-shades: inset 10px 0 40px #ff0000, inset -10px 0 20px #ff0000,
    inset -40px 10px 100px #ff0000;

  ::before {
    content: "";
    display: block;
    min-height: 50px;
    min-width: 50px;
    background-color: var(--blob);
    box-shadow: var(--shades), 0 0 5px rgba(0, 0, 0, 0.4);
    background-size: 1600% 1600%;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;

    perspective: 1000px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    -webkit-animation: ${transform} 10s ease-in-out infinite both alternate,
      ${movement} 10s ease-in-out infinite both;
    animation: ${transform} 10s ease-in-out infinite both alternate,
      ${movement} 10s ease-in-out infinite both;
    opacity: 0.6;
  }
  :hover::before {
    opacity: 1;
  }
  &.metapavo-main-status-danger::before {
    background-color: var(--blob);
    box-shadow: var(--error-shades), 0 0 5px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
  &.metapavo-main-status-success::before {
    background-color: var(--blob);
    box-shadow: var(--shades), 0 0 5px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
`;
async function getNowGas() {
  let nowGas = 0;
  const r3 = await fetch(
    "https://app.defisaver.com/api/gas-price/1559/current",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const json3 = await r3.json();
  if (json3.blockPrices && json3.blockPrices.length && json3.blockPrices[0].baseFeePerGas) {
    nowGas = Math.floor(json3.blockPrices[0].baseFeePerGas);
  }
  return nowGas;
}
type RecognizerStatus = "danger" | "warning" | "success" | "none";
function App() {
  const [gas, setGas] = React.useState(0);
  const [hide, setHide] = React.useState(false);
  const [status, setStatus] = React.useState<RecognizerStatus>("none");
  const [project, setProject] = React.useState<Project | null>(null);
  const rootRef = useRef<any>(null);

  function dragElement(elmnt: HTMLElement) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();

      // get the mouse cursor position at startup:
      pos3 = window.innerWidth - e.clientX;
      pos4 = window.innerHeight - e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
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
      elmnt.style.right = Number(elmnt.style.right.replace(/[^\d]/g, "")) - pos1 + "px";
      elmnt.style.bottom = Number(elmnt.style.bottom.replace(/[^\d]/g, "")) - pos2 + "px";
      localStorage.setItem("web3helper-pos", [elmnt.style.right, elmnt.style.bottom].join("-"));
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  function checkTwitter() {
    console.log("popstate");
    let lastCheckTwitterId: string | null = null;
    setInterval(async () => {
      const twitterPageDetail = await checkTwitterUser();
      if (twitterPageDetail && twitterPageDetail.userId) {
        if (lastCheckTwitterId !== twitterPageDetail.userId) {
          const projectInfo = await detectProjectByTwitterId(twitterPageDetail?.userId);
          if (projectInfo) {
            setStatus("success");
            setProject(projectInfo);
          } else {
            setStatus("none");
          }
          const twitterInfo = await checkTwitterScam(twitterPageDetail);
          if (twitterInfo?.detectResult) {
            setStatus("danger");
          }
        }
        lastCheckTwitterId = twitterPageDetail.userId;
      } else {
        setStatus("none");
      }
    }, 2000);
  }
  useEffect(() => {
    checkTwitter();

    (async function () {
      let gas = await getNowGas();
      setGas(gas);
    })();

    setInterval(async () => {
      let gas = await getNowGas();
      setGas(gas);
    }, 5000);
    rootRef.current.style.right = "50px";
    rootRef.current.style.bottom = "50px";
    if (localStorage.getItem("web3helper-pos")) {
      const pos = (localStorage.getItem("web3helper-pos") || "").split("-");
      if (pos.length == 2) {
        rootRef.current.style.right = pos[0];
        rootRef.current.style.bottom = pos[1];
      }
    }
    dragElement(rootRef.current);
  }, []);
  return (
    <>
      {!hide && (
        <RootElement
          id="web3helper-box"
          className={[
            "web3-spin",
            status === "danger" ? "metapavo-main-status-danger" : "",
            status === "success" ? "metapavo-main-status-success" : "",
          ].join(" ")}
          title="Drag to move"
          ref={rootRef}
          onDoubleClick={() => {
            setHide(true);
            setTimeout(() => {
              setHide(false);
            }, 10000);
          }}
        >
          <div id="web3helper-gas-text">{gas}</div>
          <div id="web3helper-box-layer2"></div>
        </RootElement>
      )}
      <DangerPopup state={status === "danger" ? "show" : "hide"} />
    </>
  );
}

export default App;
