import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/useGlobal";
import LoginPage from "./login";
import AccordionPage from "./home/AccordionPage";
import { WalletContext } from "../../context/useWallet";
import { MainRootElement } from "./styles";
import Bottom from "./home/Bottom";

function App() {
  const useG = useContext(GlobalContext);
  const wallet = useContext(WalletContext);

  useEffect(() => {
    (async function () {
      if (useG.showMain) {
        try {
          const address = await wallet.fetchLoginInfo();
          if (!address) {
            useG.setShowLogin(true);
          } else {
            // navigate("/index");
          }
        } catch (e) {
          useG.setShowLogin(true);
        }
      }
    })();
  }, []);

  return (
    <MainRootElement className={useG.showMain ? "metapavo-main-show" : "metapavo-main-hide"}>
      <div>
        {useG.showLogin ? <LoginPage /> : <AccordionPage />}
        <Bottom />
      </div>
      {useG.showMain ? (
        <div
          onClick={() => {
            useG.setShowMain(false);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: "-37px",
            cursor: "pointer",
            width: "36px",
            height: "36px",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" fill="#EFEFEF" fillOpacity="0.64" />
            <path
              d="M13 13L23 23"
              stroke="#D1D0D6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 23L23 13"
              stroke="#D1D0D6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : null}
    </MainRootElement>
  );
}

export default App;
