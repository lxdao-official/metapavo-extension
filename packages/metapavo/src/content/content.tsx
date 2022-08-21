import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./components/circle/circle";
import Main from "./components/main/main";
import SelectText from "./plugins/date-tool/selectText";
import { SnackbarProvider } from "notistack";
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
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MemoryRouter initialEntries={["/index"]}>
        <App />
        <SelectText />
      </MemoryRouter>
    </SnackbarProvider>
  </React.StrictMode>,
);
