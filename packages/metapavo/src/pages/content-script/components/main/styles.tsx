import styled from "styled-components";

export const MainRootElement = styled.div`
  width: 303px;
  height: 100vh;
  position: fixed;
  right: -303px;
  z-index: 100000000002;
  top: 0;
  background: #fff;

  // transition: all 0.5s ease-in-out 1s;
  &.metapavo-main-show {
    right: 0;

    // transition: all 0.5s ease-in-out 1s;
  }
`;
