import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { reportScam, Detector, PostDetail, PageDetail } from "../detector/src";

let detector: Detector | null = null;

function initDetector() {
  if (detector === null) {
    detector = new Detector({
      onlyBuiltIn: false,
    });
    detector.update();
  }
}

initDetector();
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

function App() {
  const [gas, setGas] = React.useState(0);

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

  function getTwitterMeta() {
    if (!window.location.host.includes("twitter.com")) return null;

    const title = document.title;

    const titleMatched = title.match(/^(\([0-9]+\) |)(.*?) \(\@(.*?)\) \/ Twitter/);
    console.log(titleMatched);
    if (titleMatched) {
      const [, messagecount, name, username] = titleMatched;
      const meta = {
        title: document.title,
        name,
        username,
      };
      return meta;
    } else {
      return null;
    }
  }
  function getPageMeta() {
    if (!window.location.host.includes("twitter.com")) throw new Error("no twitter page");
    const metaHeads = Array.from(document.querySelectorAll("meta")).reduce(
      (all: any, item: any) => {
        const metaName = item.name || item.getAttribute("property");
        if (metaName) all[metaName] = item.content;
        return all;
      },
      {},
    );

    const canonicalEl = document.querySelectorAll("link[rel=canonical]")[0];
    const canonicalLink = canonicalEl ? (canonicalEl as any).href : null;
    const topSourceDomains = Array.from(document.querySelectorAll("img"))
      .map((img: any) => {
        const a = document.createElement("a");
        a.href = img.src;
        return a.hostname;
      })
      .filter((_) => _)
      .reduce((all: any, domain: string) => {
        all[domain] = all[domain] || 0;
        all[domain]++;
        return all;
      }, {});

    return {
      title: document.title,
      metaHeads,
      canonicalLink,
      topSourceDomains: Object.keys(topSourceDomains)
        .map((domain) => {
          return {
            domain,
            count: topSourceDomains[domain],
          };
        })
        .sort((b, a) => a.count - b.count),
    };
  }
  const getPageDescription = () => {
    const description = document.querySelector("meta[name=description]");
    if (description) {
      return description.getAttribute("description");
    }
    return "";
  };

  const checkTwitterUser = async () => {
    if (detector?.fetching) {
      setTimeout(checkTwitterUser, 1000);
      return;
    }
    try {
      const pageDetails: PageDetail = getPageMeta();
      if (pageDetails.metaHeads["og:type"] === "profile") {
        const postDetail: PostDetail = {
          links: [window.location.href],
          userId: "",
          nickname: "",
          content: "",
          pageDetails,
        };

        const description = getPageDescription();
        if (description) {
          const result = description.match(
            /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g,
          );
          if (result) {
            postDetail.links = postDetail.links.concat(result);
          }
          postDetail.content = description;
        }

        const twitterMeta = getTwitterMeta();
        if (twitterMeta) {
          postDetail.userId = twitterMeta.username;
          postDetail.nickname = twitterMeta.name;
        }
        console.log("postDetail", postDetail);
        console.log(detector?.database);
        const result = await detector?.detectScam(postDetail, {
          checkBySim: true,
          checkUserId: true,
          checkContent: true,
          checkPage: true,
          checkName: true,
        });
        console.log("detect result", result);
        return result;
      }
    } catch (e) {}
  };
  useEffect(() => {
    window.addEventListener(
      "hashchange",
      function () {
        setTimeout(() => {
          checkTwitterUser();
        }, 2000);
      },
      false,
    );
    setTimeout(() => {
      checkTwitterUser();
    }, 2000);
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
    <RootElement id="web3helper-box" className="web3-spin" title="Drag to move" ref={rootRef}>
      <div id="web3helper-gas-text">{gas}</div>
      <div id="web3helper-box-layer2"></div>
    </RootElement>
  );
}

export default App;
