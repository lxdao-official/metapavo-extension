import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { smartParseDate } from "./util";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
const RootElement = styled.div`
  position: fixed;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  line-height: 25px;
  /* Light / Depth - 8 */

  filter: drop-shadow(0px 0.6px 1.8px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 3.2px 7.2px rgba(0, 0, 0, 0.13));
  z-index: 10000000;
  * {
    font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif !important;
    color: #c4c4c4;
    font-size: 12px;
  }
  &::before {
    border-width: 1em 1em 0px;
    border-color: rgb(255, 255, 255) transparent transparent;
  }

  &::before {
    content: "";
    margin: auto;
    display: block;
    width: 0px;
    height: 0px;
    border-style: solid;
    position: absolute;
    bottom: -10px;
  }
`;

const ButtonElement = styled.div`
  font-size: 14px;
  line-height: 30px;
  color: #000;
  select {
    border: none;
    border-bottom: 1px dashed #aaa;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid #e8e8e8;
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
let binded = false;
export default function SelectText() {
  const [text, setText] = React.useState("");
  const [pos, setPos] = React.useState({
    x: -100,
    y: -100,
  });
  const [isInPopup, setIsInPopup] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const bindEvents = () => {
    if (binded) return;
    let lastTarget: any = document.body;
    // document.addEventListener(
    //   "mousemove",
    //   _.debounce((e) => {
    //     if (isInPopup) {
    //       return;
    //     }
    //     const target = e.target;
    //     if (
    //       target instanceof HTMLElement &&
    //       target.childElementCount === 0 &&
    //       lastTarget !== target
    //     ) {
    //       lastTarget = target;
    //       const text = target.innerText;
    //       if (text && text.length > 10 && text.length < 100) {
    //         const result = smartParseDate(text);
    //         if (result) {
    //           console.log(text, result);
    //           setText(text);
    //           setConvertResult(result);
    //           const rect = target.getBoundingClientRect();
    //           setPos({
    //             x: rect.left,
    //             y: rect.top - rect.height - 10,
    //           });
    //           return;
    //         }
    //       }
    //     }
    //     setText("");
    //     setConvertResult(null);
    //     lastTarget = target;
    //   }, 200),
    // );
    document.addEventListener(
      "selectionchange",
      _.debounce(function () {
        const selection = document.getSelection();
        if (selection && selection.type === "Range") {
          const selectionText = selection.toString();
          if (selectionText.length >= 10) {
            setText(selectionText);
            const oRange = selection.getRangeAt(0); //get the text range
            const oRect = oRange.getBoundingClientRect();
            const absolutePos = {
              x: oRect.left,
              y: oRect.top - 100 - 10,
            };
            setPos(absolutePos);
            setConvertResult(null);
          }
        } else {
          console.log("no selection");
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
    binded = true;
  };
  useEffect(() => {
    bindEvents();
  }, []);

  const [convertResult, setConvertResult] = React.useState<Date | null>();
  const [addAlarmConfirmShow, setAddAlarmConfirmShow] = React.useState(false);
  const [addAlarmConfirmContent, setAddAlarmConfirmContent] = React.useState("");
  const convert = function (e: React.MouseEvent) {
    if (text) {
      const result = smartParseDate(text);
      if (result) {
        setConvertResult(result);
      }
    }
  };
  const addAlarm = function (e: any) {
    e.stopPropagation();
    setAddAlarmConfirmShow(true);
    setAddAlarmConfirmContent("");
  };
  const handleClose = function () {
    setAddAlarmConfirmShow(false);
  };

  const submit = function (e: any) {
    if (convertResult) {
      const timestramp = convertResult.getTime();

      chrome.runtime.sendMessage({
        cmd: "add_time_alarm",
        value: {
          timestamp: timestramp,
          content: addAlarmConfirmContent,
        },
      });

      enqueueSnackbar("add success", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setAddAlarmConfirmShow(false);
    }
  };
  return (
    <>
      {text && (
        <RootElement
          style={{ left: pos.x + 10 + "px", top: pos.y + "px" }}
          onMouseEnter={() => {
            setIsInPopup(true);
          }}
          onMouseLeave={() => {
            setIsInPopup(false);
          }}
          ref={rootRef}
        >
          <ButtonElement
            onClick={(e) => {
              e.stopPropagation();
              convert(e);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ verticalAlign: "-3px", marginRight: "5px" }}
            >
              <rect x="0.5" y="0.5" width="15" height="15" fill="url(#pattern0)" />
              <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_1128_2569" transform="scale(0.00195312)" />
                </pattern>
                <image
                  id="image0_1128_2569"
                  width="512"
                  height="512"
                  xlinkHref="data:image/png;base64,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CocUAOgDo2Ue5/lPOxkvB0rYTrkOUC0HiwnkJqDrY6oNEC367K0a7UTP7GsbcaXqjEXPujZ7d4YUAKgmtKI7S1oCyqalrFqRonrtv410wLYHR+AZwNXBvXZ1wDwDoFTBm+RRXZbWoQQAuuuvO/+W9AQ2As5Ir3Ysje8voFDLWA774c4T2Bk4KrgX+ux9N9iHvprXd4YOWvZahhAALFot/T+p1yMZ0zml09SWyt9jzD9s1df/ggdggOZLuA64YHXz5dED5J+7y4PYChhCAHBKVfkp94QZov4Lq9KakX339b9I+sO1/a/qHv69wQiUy37tYB/6al4Hxjfua+fUr74HACqb2ftlnMAJeiCgtKSR8prqZkekD7Y9TAIlXAfUZ3CvYeJvpddvBr7WiqUAI30OAJQl6zeAl/7zTaz1gXPyqR9Js/M6jITJD2UgUMJ1QH0Gz87QN6ucRqDXWwF9DgBU5GFTz+JsBP4NqDSp0mhGyjXAspEO2PZgCejqafTcUzrzu5wBM+scVIKx12W1EKS8rwHAZsDXg5gOxazK7qqedqToKtbg8ndHArft2QiUcB3wPOAlHpusBLSd3LvvlL4GAFlngpWbgAmYgAmYQNcJOADo+gjafxMwARMwAROoQcABQA1obmICJmACJmACXSfgAKDrI2j/TcAETMAETKAGAQcANaC5iQmYgAmYgAl0nYADgK6PoP03ARMwARMwgRoEHADUgOYmJmACJmACJtB1Ag4Auj6C9t8ETMAETMAEahBwAFADmpuYgAmYgAmYQNcJOADo+gjafxMwARMwAROoQcABQA1obmICJmACJmACXSfgAKDrI2j/TcAETMAETKAGAQcANaC5iQmYgAmYgAl0nYADgK6PoP03ARMwARMwgRoEHADUgOYmJmACJmACJtB1Ag4Auj6C9t8ETMAETMAEahBwAFADmpuYgAmYgAmYQNcJOADo+gjafxMwARMwAROoQcABQA1obmICJmACJmACXSfgAKDrI2j/TcAETMAETKAGAQcANaC5iQmYgAmYgAl0nYADgK6PoP03ARMwARMwgRoEHADUgOYmJmACJmACJtB1Ag4Auj6C9t8ETMAETMAEahBwAFADmpuYgAmYgAmYQNcJOADo+gjafxMwARMwAROoQcABQA1obmICJmACJmACXSfgAKDrI2j/TcAETMAETKAGAQcA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"
                />
              </defs>
            </svg>
            Convert Timezone
          </ButtonElement>
          <Line></Line>
          {text && convertResult ? (
            <ResultElement>Convert Result: {convertResult.toLocaleString()}</ResultElement>
          ) : null}
          {/* {text && convertResult ? ( */}
          <ButtonElement onClick={addAlarm}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ verticalAlign: "-3px", marginRight: "5px" }}
            >
              <path
                d="M7.99979 14.7778C11.3749 14.7778 14.1109 12.0417 14.1109 8.66667C14.1109 5.29157 11.3749 2.55554 7.99979 2.55554C4.6247 2.55554 1.88867 5.29157 1.88867 8.66667C1.88867 12.0417 4.6247 14.7778 7.99979 14.7778Z"
                fill="black"
                stroke="black"
                stroke-width="1.33333"
                stroke-linejoin="round"
              />
              <path
                d="M7.91935 5.1178L7.91895 8.7874L10.5097 11.3782"
                stroke="white"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.33301 2.99992L3.66634 1.33325"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.6663 2.99992L12.333 1.33325"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Add to Reminder
          </ButtonElement>
          {/* ) : null} */}
          {/* <ButtonElement>🔍 Search project in MetaPavo</ButtonElement>
          <PowerBy>Power by MetaPavo</PowerBy> */}
        </RootElement>
      )}
      <Dialog open={addAlarmConfirmShow} onClose={handleClose}>
        <DialogTitle>Add to Alarm List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            When time is arrive, MetaPavo will remind you by system notifition.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={addAlarmConfirmContent}
            onChange={(e) => {
              setAddAlarmConfirmContent(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
