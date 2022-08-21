import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import useGlobal, { GlobalContext } from "../../../context/global";

const RootElement = styled.div`
  opacity: 0;
  transition: all 0.76s ease-in-out 0s;
  position: absolute;
  width: 307px;
  height: 167px;
  box-shadow: 0px 8px 24px -6px rgba(214, 214, 214, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  background: rgba(225, 73, 66, 0.97);
  transform-origin: 100% 100%;

  &.mp-success-show {
    opacity: 1;
  }
  &.mp-success-hide {
    opacity: 0;
    transform: scale(0);
    transition: none;
  }
  .mp-success-hd {
    display: flex;
    justify-content: flex-start;
    height: 50px;
    padding-left: 20px;
    align-items: center;

    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    img {
      width: 24px;
      height: 24px;

      border-radius: 5px;

      /* Inside auto layout */

      flex: none;
      order: 0;
      flex-grow: 0;
    }
    .mp-success-title {
      height: 19px;
      margin-left: 8px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;

      color: #fff;
    }
    .mp-success-verified {
      margin-left: 8px;
    }
  }
  .mp-success-close {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 15px;
    top: 12px;
    cursor: pointer;
    z-index: 100;
  }
  .mp-success-bd {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    text-align: left;
    padding: 20px;

    color: #dedede;
  }
  .mp-success-bd-price {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 25px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    color: #979797;
    width: 45%;
  }
  .mp-success-links {
    display: flex;
    justify-content: space-between;
    margin: 0px 20px;
    button {
      width: 72px;
      height: 25px;
      background: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
      border-radius: 4px;
      color: #fff;
      font-size: 12px;
      line-height: 25px;
      border: none;
    }
  }
  .mp-success-links-left {
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    a {
      margin-right: 6px;
      img {
        width: 20px;
        height: 20px;
        vertical-align: 5px;
      }
    }
  }
`;
export default function SuccessPopup({ state }: { state: "show" | "hide" }) {
  const useG = useContext(GlobalContext);
  const { activeProject, setAddRootClass } = useG;

  const linkImages = {
    etherscan: chrome.runtime.getURL("images/etherscan.png"),
    twitter: chrome.runtime.getURL("images/twitter.png"),
    opensea: chrome.runtime.getURL("images/opensea.png"),
    x2y2: chrome.runtime.getURL("images/x2y2.png"),
    website: chrome.runtime.getURL("images/website.png"),
    looksrare: chrome.runtime.getURL("images/looksrare.png"),
    github: chrome.runtime.getURL("images/github.png"),
  };
  return (
    <RootElement className={[state === "show" ? "mp-success-show" : "mp-success-hide"].join(" ")}>
      <div className="mp-success-hd">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.18372 4.53336L12.0043 1.95917L20.8164 4.53336V9.81241C20.8164 15.3611 17.2654 20.287 12.0013 22.041C6.73576 20.2871 3.18372 15.36 3.18372 9.80996V4.53336Z"
            fill="white"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="1.95918"
            strokeLinejoin="round"
          />
          <path
            d="M14.6939 9.01624L9.15247 14.5576"
            stroke="#E14942"
            strokeWidth="1.95918"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.15247 9.01624L14.6939 14.5576"
            stroke="#E14942"
            strokeWidth="1.95918"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="mp-success-title">Very risky</div>
      </div>
      <div className="mp-success-bd">
        There are certain risks in this project. It may be a copy of a well-known project, or other
        problems. Make sure you have a full understanding of the project!
      </div>
      <div className="mp-success-links"></div>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setAddRootClass("");
        }}
        className="mp-success-close"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 7L17 17"
            stroke="#D1D0D6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 17L17 7"
            stroke="#D1D0D6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </RootElement>
  );
}
