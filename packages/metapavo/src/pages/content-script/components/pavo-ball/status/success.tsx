import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../context/useGlobal";

const RootElement = styled.div`
  opacity: 0;
  transition: all 0.75s ease-in-out 0s;
  position: absolute;
  width: 307px;
  height: 167px;
  box-shadow: 0px 8px 24px -6px rgba(214, 214, 214, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  transform-origin: 100% 100%;
  right: -11px;
  bottom: 55px;
  background: #fff;
  &.mp-success-show {
    opacity: 1;
  }
  &.mp-success-hide {
    opacity: 0;
    transform: scale(0);
  }
  .mp-success-hd {
    display: flex;
    justify-content: flex-start;
    height: 50px;
    padding-left: 20px;
    align-items: center;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    padding-right: 40px;
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

      text-align: left;
      color: #252525;
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
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    padding-left: 20px;
  }
  .mp-success-bd-price {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 25px;

    display: flex;
    align-items: center;
    color: #979797;
    width: 45%;
    height: 25px;
    overflow: hidden;
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
        <img src={activeProject?.image_url as string} alt={activeProject?.name} />
        <div className="mp-success-title">{activeProject?.name}</div>
        {activeProject?.contract_is_verified ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mp-success-verified"
          >
            <path
              d="M6.41493 0.51936C7.3582 -0.17312 8.64181 -0.17312 9.58507 0.51936L10.5126 1.2003C10.6657 1.31269 10.8437 1.38642 11.0314 1.4152L12.1688 1.58958C13.3254 1.76691 14.2331 2.67456 14.4104 3.8312L14.5848 4.96858C14.6136 5.1563 14.6873 5.33429 14.7997 5.48738L15.4806 6.41493C16.1731 7.3582 16.1731 8.6418 15.4806 9.58507L14.7997 10.5126C14.6873 10.6657 14.6136 10.8437 14.5848 11.0314L14.4104 12.1688C14.2331 13.3254 13.3254 14.2331 12.1688 14.4104L11.0314 14.5848C10.8437 14.6136 10.6657 14.6873 10.5126 14.7997L9.58507 15.4806C8.6418 16.1731 7.3582 16.1731 6.41493 15.4806L5.48738 14.7997C5.33429 14.6873 5.1563 14.6136 4.96858 14.5848L3.8312 14.4104C2.67456 14.2331 1.76691 13.3254 1.58958 12.1688L1.4152 11.0314C1.38642 10.8437 1.31269 10.6657 1.2003 10.5126L0.51936 9.58507C-0.17312 8.6418 -0.17312 7.3582 0.51936 6.41493L1.2003 5.48738C1.31269 5.33429 1.38642 5.1563 1.4152 4.96858L1.58958 3.8312C1.76691 2.67456 2.67456 1.76691 3.8312 1.58958L4.96858 1.4152C5.1563 1.38642 5.33429 1.31269 5.48738 1.2003L6.41493 0.51936Z"
              fill="#5B28EB"
            />
            <path
              d="M11.2803 5.71967C11.5732 6.01256 11.5732 6.48744 11.2803 6.78033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.71967 8.78033C4.42678 8.48744 4.42678 8.01256 4.71967 7.71967C5.01256 7.42678 5.48744 7.42678 5.78033 7.71967L7 8.93934L10.2197 5.71967C10.5126 5.42678 10.9874 5.42678 11.2803 5.71967Z"
              fill="white"
            />
          </svg>
        ) : null}
      </div>
      <div className="mp-success-bd">
        <div className="mp-success-bd-price">
          Floor: {activeProject?.floor_price ? Number(activeProject.floor_price).toFixed(2) : "-"}Ξ
        </div>
        <div className="mp-success-bd-price">
          Volume(24h):{" "}
          {activeProject?.one_day_volume ? Number(activeProject.one_day_volume).toFixed(2) : "-"}Ξ
        </div>
        <div className="mp-success-bd-price">
          Supply: {activeProject?.one_day_volume ? activeProject.total_supply : "-"}
        </div>
        <div className="mp-success-bd-price">
          Holders: {activeProject?.one_day_volume ? activeProject.num_owners : "-"}
        </div>
      </div>
      <div className="mp-success-links">
        <div className="mp-success-links-left">
          {activeProject?.contract_address ? (
            <a
              href={"https://etherscan.io/address/" + activeProject.contract_address}
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkImages.etherscan} alt="" />{" "}
            </a>
          ) : null}
          {activeProject?.twitter_username ? (
            <a
              href={"https://twitter.com/" + activeProject.twitter_username}
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkImages.twitter} alt="" />{" "}
            </a>
          ) : null}
          {activeProject?.external_url ? (
            <a href={activeProject.external_url} target="_blank" rel="noreferrer">
              <img src={linkImages.website} alt="" />{" "}
            </a>
          ) : null}
          {activeProject?.id ? (
            <a
              href={"https://opensea.io/collection/" + activeProject.id}
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkImages.opensea} alt="" />{" "}
            </a>
          ) : null}{" "}
          {activeProject?.id ? (
            <a
              href={`https://looksrare.org/collections/${activeProject?.contract_address}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkImages.looksrare} alt="" />{" "}
            </a>
          ) : null}
          {activeProject?.contract_address ? (
            <a
              href={`https://x2y2.io/collection/${activeProject?.id}/items`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkImages.x2y2} alt="" />{" "}
            </a>
          ) : null}
          {activeProject?.github ? (
            <a href={`${activeProject?.github}`} target="_blank" rel="noreferrer">
              <img src={linkImages.github} alt="" />{" "}
            </a>
          ) : null}
        </div>
        <button
          className=""
          style={{ cursor: "pointer" }}
          onClick={() => {
            useG.setShowMain(!useG.showMain);
          }}
        >
          More
        </button>
      </div>
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
