import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import moment from "moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { CirclePicker } from 'react-color';
import { suggestionCollector } from "cspell-trie-lib";
import { addAlarmForUser } from "../../../../utils/apis/nft_api";
import zIndex from "@mui/material/styles/zIndex";
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");

const AlarmSetFormWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    line-height: 30px;
    .form-title{
        text-align: left;
        width: 100%;
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        margin: 10px 0;
        color: #000000;
    }
    .form-input{
        height: 36px;
        line-height: 36px;
        border: 1px solid #E5E3E6;
        border-radius: 6px;
        padding: 12px 16px;
        margin-bottom: 10px;
    }
    .disable{
        background: #EFEEF1;
    }     
    .submit-btn{
        background: linear-gradient(91.75deg, rgba(125, 226, 172, 0.1) 0%, rgba(56, 157, 250, 0.1) 49.26%, rgba(159, 80, 255, 0.1) 97.76%);
        box-shadow: 0px 0px 0px #4216E7;
        border-radius: 4px;
        border-width: 3px;
        margin: 50px 0;
        border-image-slice: 1;
        border-image-source: linear-gradient(to left, #7DE2AC, #9F50FF);
    }
    legend{
        border-bottom: 1px solid rgba(0, 0, 0, 0.23);
        line-height: 0;
    }
`

export default function AlarmSetPage(props:any) {
    const [time, setTime] = React.useState(moment());
    const [desc, setDesc] = React.useState('');
    const [color,setColor] = React.useState('#416AFC')
    


    useEffect(() => {
        // restoreAlarmsFromServer();
    }, []);

    const onBtnClick = async () => {
      await addAlarmForUser(time.toDate(), desc, window.location.toString(), color);
      chrome.runtime.sendMessage(
        {
          cmd: "add_time_alarm",
          value: {
            alarm_at: time,
            desc: desc,
            url: window.location.toString(),
            color: color,
          },
        },
        () => {},
      );
      props.restoreAlarmsFromServer()
      props.toogleSetPage()
    }

    const handleTimeChange = (time: any) => {
        setTime(time);
    };
    const handleDescChange = (e: any) => {
        setDesc(e.target.value)
    }
    const handleColorChange = (color: any) => {
        setColor(color.hex)
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AlarmSetFormWrap>
                <span className="form-title">Time</span>
                <DateTimePicker
                    PopperProps={{
                        style: {zIndex: 100000000001}                    
                    }}
                    value={time}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} size="small" />}
                />
                <span className="form-title">Description</span>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Description"
                    onChange={handleDescChange}
                    value={desc}
                />
                <span className="form-title">URL</span>
                <input
                    className="form-input disable"
                    type="text"
                    disabled={true}
                    value={window.location.toString()}
                />
                <span className="form-title">Color</span>
                <CirclePicker colors={['#416AFC', '#E14942', '#00D502', '#FA00F0', '#252525']} onChange={handleColorChange}/>
                <button className="submit-btn" type="button" onClick={onBtnClick}>Create Reminder</button>
            </AlarmSetFormWrap>
        </LocalizationProvider>
    );
}
