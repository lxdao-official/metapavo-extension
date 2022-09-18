import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;
export const HeadSelect = styled.div`
  display: flex;
  width: 96px;
  height: 14px;
  margin-left: auto;
  margin-right: 4.9px;
  margin-top: 12px;
  line-height: 14px;
  justify-content: flex-end;
  cursor: pointer;

  span {
    font-weight: 700;
    font-size: 11px;
    background: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }

  img {
    width: 14px;
    hieght: 14px;
  }
`;
export const HeadLogo = styled.div`
  display: flex;
  width: 168px;
  height: 40.95px;
  margin: 35.5px auto 24.8px auto;
  align-items: center;

  .logo {
    width: 168px;
    height: 40.52px;
  }
`;

export const SearchField = styled.div`
  box-sizing: border-box;
  width: 272px;
  min-height: 45px;
  margin: 0 auto;
  padding: 12px 16px;
  border: 1px solid #e5e3e6;
  border-radius: 6px;
  color: #d7d7d7;

  .metapavo-search {
    display: flex;
    width: 100%;

    input {
      width: 215px !important;
      height: 17px !important;
      line-height: 17px !important;
      border: 0 !important;
      outline: 0 !important;
      background: none !important;
      color: #d7d7d7 !important;
    }
    input::placeholder {
      color: #d7d7d7 !important;
    }
    div {
      box-sizing: border-box;
      width: 25px;
      height: 21px;
      padding: 2px 10px;
      background: #ffffff;
      border: 0.5px solid #d7d7d7;
      box-shadow: 0px 1.5px 0px rgba(215, 215, 215, 0.6);
      border-radius: 3px;
      color: #1c1b1d;
    }
  }

  .metapavo-search-data {
    display: flex;
    flex-direction: column;
    width: 100%;

    .metapavo-prompt {
      box-sizing: border-box;
      display: flex;
      width: 272px;
      margin-left: -17px;
      margin-bottom: -13px;
      margin-top: 9px;
      padding: 9px 14px;
      background: #f8f7f9;
      border: 1px solid #e5e3e6;
      border-radius: 0 0 6px 6px;
      color: #a9a8af;
      font-weight: 400;
      font-size: 11px;
      line-height: 21px;
      white-space: nowrap;

      .metapavo-up {
        // width: 13px;
        // height: 13x;
      }

      .metapavo-down {
        // width: 13px;
        // height: 13x;
      }

      .metapavo-text-chose {
        font-weight: 400;
        font-size: 11px;
        margin-left: 7px;
        margin-right: 19px;
        line-height: 21px;
      }

      .metapavo-esc {
      }

      .metapavo-text-close {
        margin-left: 7px;
        margin-right: 19px;
      }

      .metapavo-enter-btn {
      }

      .metapavo-text-check {
        margin-left: 7px;
        margin-right: 13px;
      }
    }
  }
`;

export const SearchItemContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 272px;
  padding: 4px 18px;
  padding-right: 8px;
  margin-top: 8px;
  margin-left: -16px;
  font-weight: 500;
  font-size: 14px;
  color: #353536;
  white-space: nowrap;
  text-align: right;
  cursor: pointer;

  .front {
    display: flex;
    align-items: center;

    .user-icon {
      width: 30px;
      height: 30px;
      margin-right: 11px;
      border-radius: 15px;
    }

    .user-name {
      max-width: 100px;
      height: 16px;
      line-height: 16px;
      margin-right: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .end {
    display: flex;
    align-items: center;

    .eth {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 54px;
      height: 33px;
      // margin-left: 23px;
      font-weight: 500;
      font-size: 12px;
      color: #a9a8af;

      .num {
        font-weight: 600;
        font-size: 12px;
        color: #000000;
      }
    }

    .enter {
      margin-left: 11.3px;
    }
  }
`;

export const Head = styled.div`
  width: 100%;
`;

export const ToolsHotContainer = styled.div`
  width: 272px;
  height: 137px;
  margin: 28px auto 0 auto;

  .hot-tool-list {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .tool-list {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export const HotTitle = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 29px;
  padding: 6px 10px 18px 10px;
  font-weight: 500;

  .title {
    color: #000000;
    line-height: 17px;
    font-size: 14px;
  }

  .op {
    color: #5b28eb;
    line-height: 13px;
    font-size: 11px;
    cursor: pointer;
  }
`;

export const ToolsItemContainer = styled.div`
  width: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 18px;
  align-items: center;

  img {
    width: 70px;
    height: 70px;
  }

  span {
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    color: #1c1b1d;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;

export const PageContainer = styled.div`
  margin: 10px auto 0 auto;
  padding: 10px 20px;
  .hot-trend-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
  }

  .trend-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export const TrendsItemContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 12px;
  cursor: pointer;
  .des-cover {
    width: 127px;
    height: 127px;
    border-radius: 6px;
    background-size: cover;
    background-position: center;
  }

  .des-title {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 32px;
    text-align: left;
    margin-top: 8px;

    .name {
      width: 100%;
      display: block;
      font-weight: 700;
      font-size: 12px;
      color: #353536;
    }

    .eth-own {
      font-weight: 500;
      font-size: 12px;
      color: #a9a8af;
    }
  }
`;

export const HistoryHotContainer = styled.div`
  margin: 24px auto 0 auto;

  .hot-history-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }

  .history-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }
`;
const placeholderImg = chrome.runtime.getURL("images/placeholder.png");
export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  cursor: pointer;
  .user-icon {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid #f3f3f3;
    box-sizing: border-box;
    background: url(${placeholderImg}) no-repeat center center / cover;
  }

  .user-des {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 105px;
    height: 36px;
    padding: 0px 0px;
    font-size: 12px;

    .user-name {
      font-weight: 700;
      color: #353536;
      overflow: hidden;
      height: 18px;
      line-height: 18px;
      text-overflow: ellipsis;
    }
    .user-eth {
      font-weight: 500;
      color: #a9a8af;
    }
  }

  .imgs-container {
    display: flex;
    justify-content: center;
    width: calc(272px - 80px - 40px - 105px);

    .link-container {
      width: 12px;
      height: 18px;

      .link-icon {
        width: 18px;
        cursor: pointer;
      }
    }
  }

  .times {
    display: flex;
    width: 60px;
    flex-direction: column;
    font-weight: 500;
    font-size: 12px;
    color: #a9a8af;
    text-align: right;
    .day-time {
      color: #a9a8af;
    }
    .hour-time {
      color: #a9a8af;
    }
  }
`;

export const HeadReturnContainer = styled.div`
  display: flex;
  height: 20px;
  margin-top: 0px;
  margin-bottom: 15px;

  img {
    height: 14.166666984558105px;
    width: 16.666667938232422px;
    margin: 0 11.67px 0 0px;
    cursor: pointer;
  }

  span {
    font-weight: 500;
    font-size: 14px;
    color: #353536;
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 35px;
  left: 13px;
  display: flex;
  flex-direction: column;
  width: 275px;
  background: #ffffff;
  box-shadow: 0px 8px 24px -6px rgba(214, 214, 214, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4);
  border-radius: 9px;
  .user-des {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 13px 19px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);

    .user-name {
      font-weight: 700;
      font-size: 14px;
      .user-code {
        background: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
      }
    }
    .user-eth {
      font-weight: 500;
      color: #d1d0d6;
    }
  }
  .op-list {
    padding: 20px;
    .metaPavo-pp {
      cursor: pointer;
      padding-top: 8px;
      padding-bottom: 8px;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      color: #7f7e85;
    }
  }
`;

export const AddNewAlarm = styled.div`
  position: absolute;
  right: 50px;
  background: linear-gradient(
    91.75deg,
    rgba(125, 226, 172, 0.1) 0%,
    rgba(56, 157, 250, 0.1) 49.26%,
    rgba(159, 80, 255, 0.1) 97.76%
  );
  box-shadow: 0px 0px 0px #4216e7;
  border-radius: 4px;
  border-width: 2px;
  margin-bottom: 50px;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #7de2ac, #9f50ff);
  font-size: 12px;
  cursor: pointer;
  border-style: solid;
  height: 24px;
  line-height: 15px;
  padding: 4px; 
`;
