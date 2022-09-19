import styled from "styled-components";

export const css = `
    .MuiTabs-indicator{
        background:linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%) !important;
    }
    
    .metapavo-tabInner{
      text-align:left;
      border-left: 1px solid #F5F5F5;
    }
    .metapavo-tabInner * {
      box-sizing: border-box;
    }
    .metapavo-message{
        width: 275px;
        height: 52px;
        box-sizing: border-box;
        margin:16px 14px 0 14px;
        background: rgba(248, 247, 249, 0.5);
        border: 0.8px solid #E14942;
        border-radius: 6.35659px;
        color:#E14942;
        font-size: 11px;
        line-height: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .metaPavo-mr8{
      margin-right:8px;
      width:14px;
      height:14px;
    }
    .metapavo-icon{
      margin-right:15px;
      margin-left:12px;
      width:20px;
      height:20px;
    }
    .metapavo-boxText{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 4px;
      width: 50px;
      height: 19px;
      background: #F5F5F5;
      border-radius: 4px;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      color: #353536;
      
    }
    .metapavo-addwatch{
      
    }
    .metapavo-ellipsis{
      width:16px;
      height:8px;
      background: #24292E;
      color:#fff;
      margin-left:8px;
    }
    .metapavo-roundT{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3.17829px 6.35659px;
      width: 30.71px;
      height: 17.36px;
      background: #EFEEF1;
      border-radius: 20.6589px;
      color: #353536;
      margin-right:5px;
    }
    .metapavo-selectClass{
      color:#5B28EB;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      display: flex;
      border: none;
      outline: none;
      // appearance: none;
      // -webkit-appearance: none;
      // -moz-appearance: none;
    }
    .metapavo-topSelect{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid #E5E3E6;
      border-radius: 6px;
      margin:15px 11px 25px 12px;
      width:calc(100% - 23px);
      color: #D7D7D7;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      position:relative;
    }
    .metapavo-topSelect:after{
      content:"v",
      position:"absolute";
      right:17.5px;
      top:10.5px;
    }
    .metapavo-option{
      margin-top:5px;
      padding: 8px 16px;
      color:#000;
    }
    
    .metapavo-option:hover{
        backgroundColor:#F5F5F5;
    }
`;
export const AddWatchButton = styled.button`
  height: 35px !important;
  background: linear-gradient(
    91.75deg,
    rgba(125, 226, 172, 0.1) 0%,
    rgba(56, 157, 250, 0.1) 49.26%,
    rgba(159, 80, 255, 0.1) 97.76%
  );
  box-shadow: 0px 0px 0px #4216e7;
  border-radius: 4px;
  border-width: 3px;
  border-image-slice: 1;
  padding-right: 20px !important;
  padding-left: 10px !important;
  font-size: 12px !important;
  cursor: pointer;
  border-image-source: linear-gradient(to left, #7de2ac, #9f50ff);

  box-shadow: 0px 0px 0px #4216e7;
  border-radius: 5px;
  color: #1c1b1d !important;
  cursor: pointer;

  border: 3px solid transparent;
  background-image: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
  background-origin: border-box;
  box-shadow: inset 0 1000px 1px #f5f6f7;
`;
export const LinkButton = styled.a`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  display: flex;
  text-decoration: none;
  align-items: center;

  color: #000000 !important;
  cursor: pointer;
`;