import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
const RootElement = styled.div`
  position: absolute;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  line-height: 25px;
`;
export default function SelectText() {
  const [text, setText] = React.useState("");
  const [pos, setPos] = React.useState({
    x: -100,
    y: -100,
  });
  useEffect(() => {
    document.addEventListener(
      "selectionchange",
      _.debounce(function () {
        const selection = document.getSelection();
        if (selection && selection.type === "Range") {
          const selectionText = selection.toString();
          setText(selectionText);
          const oRange = selection.getRangeAt(0); //get the text range
          const oRect = oRange.getBoundingClientRect();
          const absolutePos = {
            x: oRect.left + window.scrollX + oRect.width,
            y: oRect.top + window.scrollY,
          };
          setPos(absolutePos);
        } else {
          console.log("no selection");
          setText("");
          setPos({
            x: -100,
            y: -100,
          });
        }
      }, 500),
    );
  });
  return (
    <>
      {text && (
        <RootElement style={{ left: pos.x + 10 + "px", top: pos.y + "px" }}>
          <div>
            convert to{" "}
            <select value="+8">
              <option value="+8">Beijing</option>
            </select>{" "}
            Timezone
          </div>
          <div>add to alarm clock</div>
          <div>search project</div>
          <div>Power by </div>
        </RootElement>
      )}
    </>
  );
}
