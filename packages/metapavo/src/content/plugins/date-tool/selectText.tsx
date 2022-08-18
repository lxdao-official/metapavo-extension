import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { smartParseDate } from "./util";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
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
let binded = false;
export default function SelectText() {
  const [text, setText] = React.useState("");
  const [pos, setPos] = React.useState({
    x: -100,
    y: -100,
  });
  const { enqueueSnackbar } = useSnackbar();
  const bindEvents = () => {
    if (binded) return;
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
          setConvertResult(null);
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
    binded = true;
  };
  useEffect(() => {
    bindEvents();
  });

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
              {/* <option value="+8">Beijing</option> */}
            </select>{" "}
            timezone
          </ButtonElement>
          {text && convertResult ? (
            <ResultElement>Convert Result: {convertResult.toLocaleString()}</ResultElement>
          ) : null}
          {text && convertResult ? (
            <ButtonElement onClick={addAlarm}>⏰ Add to alarm clock</ButtonElement>
          ) : null}
          <ButtonElement>🔍 Search project in MetaPavo</ButtonElement>
          <PowerBy>Power by MetaPavo</PowerBy>
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
