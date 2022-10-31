import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    right:-303px;
    opacity:0;
  }
  100% {
    right:0;
    opacity:1;
  }
  `;
const hide = keyframes`
 0% {
    right:0;
    opacity:1;
  }
  100% {
    right:-303px;
    opacity:0;
  }
 
  `;
export const MainRootElement = styled.div`
  width: 343px;
  height: 100vh;
  position: fixed;
  right: -343px;
  z-index: 100000000002;
  top: 0;
  background: #fcfcfc;
  border-left: 1px solid #e8e8e8;
  &.metapavo-main-show {
    right: -343px;
    animation: ${show} 0.6s ease-in-out 0.3s;
    animation-fill-mode: forwards;
  }

  &.metapavo-main-hide {
    animation: ${hide} 0.6s ease-in-out 0.3s;
    animation-fill-mode: forwards;
  }
`;
