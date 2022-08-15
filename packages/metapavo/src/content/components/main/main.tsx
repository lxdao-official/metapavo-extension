import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import useGlobal, { GlobalContext } from "../../context/global";
import LoginPage from "./login";
import AccordionPage from "./../home/accordion";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import useWallet from "../../context/useWallet";
const RootElement = styled.div`
  width: 303px;
  height: 100vh;
  position: fixed;
  right: -303px;
  z-index: 1000000;
  top: 0;
  background: #fff;
  transition: all 0.5s ease-in-out 1s;
  &.metapavo-main-show {
    right: 0;
    transition: all 0.5s ease-in-out 1s;
  }
`;
function App() {
  const useG = useContext(GlobalContext);
  let navigate = useNavigate();
  const wallet = useWallet();
  useEffect(() => {
    (async function () {
      try {
        const address = await wallet.fetchLoginInfo();
        if (!address) {
          navigate("/login");
        }
      } catch (e) {
        navigate("/login");
      }
    })();
  }, [useG.showMain]);
  return (
    <RootElement className={[useG.showMain ? "metapavo-main-show" : ""].join(" ")}>
      <Box
        sx={{
          position: "absolute",
          width: "36px",
          height: "36px",
          left: "-35px",
          top: "0",
          background: "rgba(239, 239, 239, 0.34)",
          display: useG.showMain ? "flex" : "none",
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
        {/* <AccordionPage /> */}

        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/index" element={<AccordionPage />} />
        </Routes>
      </div>
      {useG.showMain ? (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: "-36px", cursor: "pointer" }}
          onClick={() => {
            useG.setShowMain(false);
          }}
        >
          <rect width="36" height="36" fill="#EFEFEF" fill-opacity="0.64" />
          <path
            d="M13 13L23 23"
            stroke="#D1D0D6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13 23L23 13"
            stroke="#D1D0D6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : null}
    </RootElement>
  );
}

export default App;
