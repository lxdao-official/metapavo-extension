import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./content/App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-root";
Object.assign(rootElement.style, {
  position: "absolute",
  width: 0,
  height: 0,
  right: 0,
  bottom: 0,
  zIndex: 100000,
});
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
