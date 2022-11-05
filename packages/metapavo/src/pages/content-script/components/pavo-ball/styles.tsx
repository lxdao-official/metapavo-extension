import styled, { keyframes } from 'styled-components';

import { colorfulButtonStyle } from '../../../../styles/common-colorful-button';

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
export const GasBox = styled.div`
  content: '';
  display: block;
  height: 50px;
  width: 50px;
  background: var(--blob);
  // box-shadow: var(--shades), 0 0 5px rgba(0, 0, 0, 0.4);
  // background-size: 1600% 1600%;
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
  opacity: 0.75;
`;
export const RootElement = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  color: #fff !important;
  z-index: 100000000001;
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
  --blob: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
  transition: all 0.6s ease-in;
  //background: linear-gradient(91.75deg, #7DE2AC 0%, #389DFA 49.26%, #9F50FF 97.76%);
  // --shades: inset 10px 0 40px #b721ff, inset -10px 0 20px #21d4fd, inset -40px 10px 100px #3551fd;
  --shades: inset 10px 0 40px #b721ff, inset -10px 0 20px #7de2ac,
    inset -40px 10px 100px #9f50ff;
  --error-shades: inset 10px 0 40px #ff0000, inset -10px 0 20px #ff0000,
    inset -40px 10px 100px #ff0000;
  * {
    font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif !important;
  }
  :hover #metapavo-box-gas {
    opacity: 1;
  }
  &.notransition {
    transition: none;
  }
  &.metapavo-main-show {
    bottom: -230px !important;
  }
  &.metapavo-main-status-danger #metapavo-box-gas {
    background: var(--blob);
    box-shadow: var(--error-shades), 0 0 5px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
  &.metapavo-main-status-success #metapavo-box-gas {
    background: var(--blob);
    // box-shadow: var(--shades), 0 0 5px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
  // &.metapavo-main-box-success {
  //   width: 307px;
  //   height: 167px;
  // }
  // &.metapavo-main-box-success #metapavo-box-gas {
  //   width: 307px;
  //   height: 167px;
  //   animation: ${boom} 1s ease-in-out both alternate;
  //   overflow: hidden;
  //   background-color: #fff;
  //   border-radius: 16px;
  //   box-shadow: none;
  // }
  // &.metapavo-main-box-danger {
  //   width: 307px;
  //   height: 167px;
  // }
  // &.metapavo-main-box-danger #metapavo-box-gas {
  //   width: 307px;
  //   height: 167px;
  //   animation: ${dangerboom} 1s ease-in-out both alternate;
  //   overflow: hidden;
  //   background-color: #fff;
  //   border-radius: 16px;
  //   box-shadow: none;
  // }
  #metapavo-gas-text {
    line-height: 13px;
    margin-top: 13px;
    color: #fff !important;
    float: none !important;
  }
`;

export const SuccessRootElement = styled.div`
  opacity: 0;
  transition: all 0.75s ease-in-out 0s;
  position: absolute;
  width: 327px;
  height: 167px;
  box-shadow: 0px 8px 24px -6px rgba(214, 214, 214, 0.16),
    0px 0px 1px rgba(0, 0, 0, 0.4);
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
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      display: flex;

      text-align: left;
      color: #252525;
      overflow: hidden;
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
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 25px;

    display: flex;
    align-items: center;
    color: #979797;
    width: 100%;
    height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mp-success-price-item {
    padding-right: 10px;
    svg {
      vertical-align: -2px;
      margin-right: 3px;
    }
  }
  .mp-success-links {
    display: flex;
    position: relative;
    justify-content: space-between;
    margin: 0px 20px;
    button {
      width: 72px;
      height: 25px;
      background: linear-gradient(
        91.75deg,
        #7de2ac 0%,
        #389dfa 49.26%,
        #9f50ff 97.76%
      );
      border-radius: 4px;
      color: #fff;
      font-size: 12px;
      line-height: 25px;
      border: none;
      cursor: pointer;
    }
  }
  .mp-success-links-left {
    width: 255px;
    overflow-x: auto;
    position: relative;
    bahavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .mp-success-links-left-inner {
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    height: 25px;
    align-items: center;
    gap: 6px 6px;
    a {
      width: 20px;
      height: 20px;
      box-sizing: content-box;
      display: block;
      img {
        width: 20px;
        height: 20px;
        max-width: 20px;
        min-width: 20px;
        vertical-align: 5px;
        display: block;
      }
    }
    .dividor {
      border: 0.5px solid #979797;
      margin-top: 0px;
      height: 10px;
      width: 0px;
    }
  }
`;
export const AddWatchButton = styled.button`
  height: 35px !important;
  padding-right: 20px !important;
  padding-left: 10px !important;
  font-size: 12px !important;

  ${colorfulButtonStyle}
`;
