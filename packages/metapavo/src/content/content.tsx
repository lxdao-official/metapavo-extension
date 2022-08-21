import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./components/circle/circle";
import Main from "./components/main/main";
import SelectText from "./plugins/date-tool/selectText";
import { SnackbarProvider } from "notistack";
import useGlobal, { GlobalContext } from "./context/global";
import useWallet, { WalletContext } from "./context/useWallet";
const rootElement = document.createElement("div");
rootElement.id = "metapavo-root";
// Object.assign(rootElement.style, {
//   position: "absolute",
//   width: 0,
//   height: 0,
//   right: 0,
//   bottom: 0,
//   zIndex: 100000,
// });
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);

function Root() {
  const useG = useGlobal();
  const wallet = useWallet();

  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MemoryRouter initialEntries={["/index"]}>
        <GlobalContext.Provider value={useG}>
          <WalletContext.Provider value={wallet}>
            <App />
          </WalletContext.Provider>
        </GlobalContext.Provider>
      </MemoryRouter>
    </SnackbarProvider>
  );
}
root.render(
  <React.StrictMode>
    <Root />
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <SelectText />
    </SnackbarProvider>
  </React.StrictMode>,
);
