import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import moment from "moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { CirclePicker } from 'react-color';
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");

export default function AlarmSetPage() {
    const [date, setDate] = React.useState(moment());
    const [time, setTime] = React.useState(moment());
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
    `


    useEffect(() => {
        // restoreAlarmsFromServer();
    }, []);

    const onBtnClick = () => {

    }


    const handleDateChange = (date: any) => {
        setDate(date);
    };
    const handleTimeChange = (time: any) => {
        setTime(time);
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AlarmSetFormWrap>
                <span className="form-title">Date</span>
                <DesktopDatePicker
                    inputFormat="MM/DD/YYYY"
                    value={date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} size="small" />}
                />
                <span className="form-title">Time</span>
                <TimePicker
                    value={time}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} size="small" />}
                />
                <span className="form-title">Description</span>
                <input
                    // onChange={onNameChange}
                    // value={name}
                    className="form-input"
                    type="text"
                    placeholder="Description"
                />
                <span className="form-title">URL</span>
                <input
                    className="form-input disable"
                    type="text"
                    disabled={true}
                    value={window.location.toString()}
                />
                <span className="form-title">Color</span>
                <CirclePicker colors={['#416AFC', '#E14942', '#00D502', '#FA00F0', '#252525']} />
                <button className="submit-btn" type="button" onClick={onBtnClick}>Create Reminder</button>

            </AlarmSetFormWrap>
        </LocalizationProvider>
    );
}
