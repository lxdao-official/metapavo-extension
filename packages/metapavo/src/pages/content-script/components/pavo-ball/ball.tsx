import React, { useContext, useEffect, useRef } from "react";

import { GlobalContext } from "../../context/global";
import DangerPopup from "./status/danger";
import SuccessPopup from "./status/success";
import Main from "../main/root";
import { WalletContext } from "../../context/useWallet";
import { GasBox, RootElement } from "./styles";

let inited = false;
function App() {
  const [hide, setHide] = React.useState(false);

  const rootRef = useRef<any>(null);
  const gasRef = useRef<HTMLDivElement>(null);
  const useG = useContext(GlobalContext);
  const wallet = useContext(WalletContext);

  function dragElement() {
    if (!gasRef.current) return;
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    let mousedownTimestamp: number = 0;
    // otherwise, move the DIV from anywhere inside the DIV:
    gasRef.current.onmousedown = dragMouseDown;
    gasRef.current.onmouseup = (e) => {
      e.stopPropagation();
      if (new Date().getTime() - mousedownTimestamp < 300) {
        if (!useG.addRootClass) {
          useG.setShowMain(!useG.showMain);
          closeDragElement();
        }
      }
    };

    function dragMouseDown(e: MouseEvent) {
      e.stopPropagation();
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
    useG.checkMarketPlace();
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
      if (request.cmd === "needlogin") {
        console.log("needlogin");
        useG.showLogin();
      }
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
        <GasBox
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
        </GasBox>
        <DangerPopup state={useG.addRootClass === "metapavo-main-box-danger" ? "show" : "hide"} />
        <SuccessPopup state={useG.addRootClass === "metapavo-main-box-success" ? "show" : "hide"} />
      </RootElement>
      {useG.showMain ? <Main /> : null}
    </>
  );
}

export default App;
