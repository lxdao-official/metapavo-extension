import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import useGlobal, { GlobalContext } from "../../context/global";
import IndexPage from "./login";
import AccordionPage from "./../home/accordion";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";

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
  const useG = useGlobal();
  return (
    <>
      <GlobalContext.Consumer>
        {(context) => {
          return (
            <RootElement className={[context.showMain ? "metapavo-main-show" : ""].join(" ")}>
              <Box
                sx={{
                  position: "absolute",
                  width: "36px",
                  height: "36px",
                  left: "-35px",
                  top: "0",
                  background: "rgba(239, 239, 239, 0.34)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  useG.setShowMain(!useG.showMain);
                }}
              >
                <ClearIcon />
              </Box>
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
