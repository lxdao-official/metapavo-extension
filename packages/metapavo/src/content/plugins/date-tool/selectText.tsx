import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { smartParseDate } from "./util";
const RootElement = styled.div`
  position: absolute;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  line-height: 25px;
  * {
    font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif !important;
  }
`;

const ButtonElement = styled.div`
  border-bottom: 1px solid #eee;
  font-size: 14px;
  line-height: 30px;
  select {
    border: none;
    border-bottom: 1px dashed #aaa;
  }
`;

const ResultElement = styled.div`
  border-bottom: 1px solid #eee;
  font-size: 12px;
  line-height: 30px;
  color: #999;
`;

const PowerBy = styled.div`
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-align: right;
  margin-top: 10px;
  transform: scale(0.8);
  margin-right: -20px;
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
          // setText("");
          // setPos({
          //   x: -100,
          //   y: -100,
          // });
        }
      }, 500),
    );
    document.body.addEventListener("click", () => {
      setText("");
      setPos({
        x: -100,
        y: -100,
      });
    });
  });

  const [convertResult, setConvertResult] = React.useState<Date>();
  const convert = function (e: React.MouseEvent) {
    if (text) {
      const result = smartParseDate(text);
      if (result) {
        setConvertResult(result);
      }
    }
  };
  return (
    <>
      {text && (
        <RootElement style={{ left: pos.x + 10 + "px", top: pos.y + "px" }}>
          <ButtonElement
            onClick={(e) => {
              e.stopPropagation();
              convert(e);
            }}
          >
            🔃 Convert to{" "}
            <select value="+8">
              <option value="+8">local</option>
              <option value="+8">Beijing</option>
            </select>{" "}
            timezone
          </ButtonElement>
          {convertResult ? (
            <ResultElement>Convert Result: {convertResult.toLocaleString()}</ResultElement>
          ) : null}
          <ButtonElement>⏰ Add to alarm clock</ButtonElement>
          <ButtonElement>🔍 Search project in MetaPavo</ButtonElement>
          <PowerBy>Power by MetaPavo</PowerBy>
        </RootElement>
      )}
    </>
  );
}
