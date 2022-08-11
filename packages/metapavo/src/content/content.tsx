import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/circle";
import Main from "./components/main";
import SelectText from "./components/selectText";

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
    <App />
    <SelectText />
  </React.StrictMode>,
);