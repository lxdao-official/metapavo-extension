import styled, { keyframes } from "styled-components";

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
  transition: all 0.5s ease-in-out;
  --blob: #fdfbfd;
  // --shades: inset 10px 0 40px #b721ff, inset -10px 0 20px #21d4fd, inset -40px 10px 100px #3551fd;
  --shades: inset 10px 0 40px #b721ff, inset -10px 0 20px #7de2ac, inset -40px 10px 100px #9f50ff;
  --error-shades: inset 10px 0 40px #ff0000, inset -10px 0 20px #ff0000,
    inset -40px 10px 100px #ff0000;
  * {
    font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif !important;
  }
  :hover #metapavo-box-gas {
    opacity: 1;
  }
  &.metapavo-main-show {
    bottom: -10px !important;
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
    line-height: 50px;
    color: #fff !important;
  }
`;
