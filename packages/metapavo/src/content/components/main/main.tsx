import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/global";
import IndexPage from "./login";
const RootElement = styled.div`
  width: 303px;
  height: 100vh;
  position: fixed;
  right: -303px;
  z-index: 1000000;
  top: 0;
  background: #fff;
  transition: all 0.3s ease-in-out;
  &.metapavo-main-show {
    right: 0;
  }
`;
function App() {
  return (
    <>
      <GlobalContext.Consumer>
        {(context) => {
          return (
            <RootElement className={[context.showMain ? "metapavo-main-show" : ""].join(" ")}>
              <div>
                <IndexPage></IndexPage>
              </div>
            </RootElement>
          );
        }}
      </GlobalContext.Consumer>
    </>
  );
}

export default App;
