import { Menu, MenuItem } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getLang } from "../../../../utils/lang";

import { GlobalContext } from "../../context/useGlobal";
import DangerPopup from "./status/danger";
import SuccessPopup from "./status/success";

import { GasBox, RootElement } from "./styles";

let inited = false;
function Ball() {
  const [hide, setHide] = React.useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const gasRef = useRef<HTMLDivElement>(null);
  const useG = useContext(GlobalContext);
  const [gas, setGas] = useState(0);
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
      if (e.button !== 0) return;
      if (new Date().getTime() - mousedownTimestamp < 300) {
        if (!useG.addRootClass) {
          useG.setShowMain(!useG.showMain);
        }
      }
      closeDragElement();
      rootRef.current?.classList.remove("notransition");
    };

    function dragMouseDown(e: MouseEvent) {
      e.stopPropagation();
      if (e.button !== 0) return;
      e = e || window.event;
      // e.preventDefault();
      mousedownTimestamp = Date.now();
      rootRef.current?.classList.add("notransition");
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
      if (rootRef.current) {
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
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
  }

  function init() {
    useG.checkPlatform();
    if (rootRef.current) {
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
    }

    chrome?.runtime?.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.cmd === "gasUpdate") setGas(request.value);
      sendResponse("ok");
    });
    chrome.runtime.sendMessage(
      {
        cmd: "getGas",
      },
      function (response) {
        if (!chrome.runtime.lastError) {
          setGas(response);
        } else {
        }
      },
    );
  }
  function noDisplay7() {
    setHide(true);
    setMenuOpen(false);
    localStorage.setItem(
      "metapavo-hide-until",
      String(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    );
  }
  useEffect(() => {
    if (!inited) init();
    inited = true;
    const hideUntil = localStorage.getItem("metapavo-hide-until");
    if (hideUntil && Number(hideUntil) > new Date().getTime()) {
      setHide(true);
    }
    document.addEventListener("click", () => {
      setMenuOpen(false);
    });
  }, []);

  return (
    <>
      <RootElement
        id="metapavo-box"
        className={[
          "web3-spin",
          useG.detectStatus === "danger" ? "metapavo-main-status-danger" : "",
          useG.detectStatus === "success" ? "metapavo-main-status-success" : "",
          useG.addRootClass,
          useG.showMain ? "metapavo-main-show" : "",
        ].join(" ")}
        ref={rootRef}
        style={{
          display: !hide ? "block" : "none",
        }}
      >
        <GasBox
          id="metapavo-box-gas"
          title="click to open, drag to move, right click to show menu"
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
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen(true);
          }}
        >
          <div id="metapavo-gas-text">
            {gas}
            <br />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                opacity: "0.8",
                transform: "scale(0.7)",
                display: "block",
                marginTop: "4px",
              }}
            >
              GAS
            </span>
          </div>
        </GasBox>
        <DangerPopup state={useG.addRootClass === "metapavo-main-box-danger" ? "show" : "hide"} />
        <SuccessPopup state={useG.addRootClass === "metapavo-main-box-success" ? "show" : "hide"} />
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={gasRef.current}
          open={menuOpen}
          // onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          style={{ zIndex: 100000000000000000 }}
        >
          <MenuItem onClick={noDisplay7}>{getLang("nodisplay7")}</MenuItem>
        </Menu>
      </RootElement>
    </>
  );
}

export default Ball;
