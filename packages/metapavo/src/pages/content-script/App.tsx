import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import Ball from "./components/pavo-ball/ball";
import SelectText from "./plugins/date-tool/selectText";
import useGlobal, { GlobalContext } from "./context/useGlobal";
import useWallet, { WalletContext } from "./context/useWallet";
import Main from "./components/side-panel";
import toast, { Toaster } from "react-hot-toast";
const rootElement = document.createElement("div");
rootElement.id = "metapavo-root";
Object.assign(rootElement.style, {
  position: "absolute",
  width: 0,
  height: 0,
  right: 0,
  bottom: 0,
  zIndex: 100000000000,
});
document.body.appendChild(rootElement);

function Root() {
  const useG = useGlobal();
  const wallet = useWallet();
  console.log("root");

  return (
    <GlobalContext.Provider value={useG}>
      <WalletContext.Provider value={wallet}>
        <Ball />
        {useG.showMain ? <Main /> : null}
        <SelectText />
      </WalletContext.Provider>
    </GlobalContext.Provider>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter initialEntries={["/index"]}>
      <Root />
    </MemoryRouter>

    <Toaster containerStyle={{ zIndex: 1000000000000 }} />
  </React.StrictMode>,
  rootElement,
);