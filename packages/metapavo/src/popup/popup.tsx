import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-popop";

document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <div>popup</div>
  </React.StrictMode>,
);
