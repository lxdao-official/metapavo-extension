import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/global";
import IndexPage from "./login";
import AccordionPage from "../home/accordion";
import ClearIcon from "@mui/icons-material/Clear";

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
    &.leftIcon {
      position: absolute;
      width: 36px;
      height: 36px;
      left: 1101px;
      top: 80px;
      background: rgba(239, 239, 239, 0.34);
    }
  }
`;
function App() {
  return (
    <>
      <GlobalContext.Consumer>
        {(context) => {
          return (
            <RootElement className={[context.showMain ? "metapavo-main-show" : ""].join(" ")}>
              {/* <div className="leftIcon">
                <ClearIcon />
              </div> */}
              <div>
                {/* <IndexPage></IndexPage> */}
                <AccordionPage />
              </div>
            </RootElement>
          );
        }}
      </GlobalContext.Consumer>
    </>
  );
}

export default App;
