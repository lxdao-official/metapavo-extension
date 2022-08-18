import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import AlarmList from "./alarmList";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-popop";

document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const RootElement = styled.div`
  width: 400px;
  height: 400px;
  padding: 10px;
`;
root.render(
  <React.StrictMode>
    <RootElement>
      <AlarmList />
    </RootElement>
  </React.StrictMode>,
);
