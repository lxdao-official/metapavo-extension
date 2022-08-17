import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
`
export const HeadSelect = styled.div`
    display: flex;
    width: 96px;
    height: 14px;
    margin-left: auto;
    margin-right: 4.9px;
    margin-top: 12px;
    line-height: 14px;
    text-align: right;
    cursor: pointer;

    span {
        font-weight: 700;
        font-size: 11px;
        background: linear-gradient(91.75deg, #7DE2AC 0%, #389DFA 49.26%, #9F50FF 97.76%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
    }

    img {
        width: 14px;
        hieght: 14px;
    }
`
export const HeadLogo = styled.div`
    display: flex;
    width: 168px;
    height: 40.95px;
    margin: 35.5px auto 24.8px auto;
    align-items: center;


    .logo {
        Width: 51px;
        Height: 40.52px;
    }

    .logo-name {
        Width: 102.22px;
        Height: 18.66px;
        line-height: 40.95px;
    }
`

export const SearchField = styled.div`
    box-sizing: border-box;
    width: 272px;
    min-height: 45px;
    margin: 0 auto;
    padding: 12px 16px;
    border: 1px solid #E5E3E6;
    border-radius: 6px;
    color: #D7D7D7;

    .search {
        display: flex;
        width: 100%;

        input {
            width: 215px;
            height: 17px;
            line-height: 17px;
            border: 0;
            outline: 0;
        }
    
        div {
            box-sizing: border-box;
            width: 25px;
            height: 21px;
            padding: 2px 10px;
            background: #FFFFFF;
            border: 0.5px solid #D7D7D7;
            box-shadow: 0px 1.5px 0px rgba(215, 215, 215, 0.6);
            border-radius: 3px;
            color: #1C1B1D;
        }
    }

    .search-data {
        display: flex;
        flex-direction: column;
        width: 100%;
        
        .prompt {
            box-sizing: border-box;
            display: flex;
            width: 272px;
            margin-left: -17px;
            margin-bottom: -13px;
            margin-top: 9px;
            padding: 9px 14px;
            background: #F8F7F9;
            border: 1px solid #E5E3E6;
            border-radius: 0 0 6px 6px;
            color: #A9A8AF;
            font-weight: 400;
            font-size: 11px;
            line-height: 21px;
            white-space: nowrap;

            .up {
                // width: 13px;
                // height: 13x;
            }

            .down {
                // width: 13px;
                // height: 13x;
            }

            .text-chose {
                font-weight: 400;
                font-size: 11px;
                margin-left: 7px;
                margin-right: 19px;
                line-height: 21px;
            }

            .esc {
                
            }

            .text-close {
                margin-left: 7px;
                margin-right: 19px;
            }
            
            .enter-btn {

            }

            .text-check {
                margin-left: 7px;
                margin-right: 13px;
            }

        }
    }
`

export const SearchItemContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 272px;
    padding: 4px 18px;
    margin-top: 8px;
    margin-left: -16px;
    font-weight: 500;
    font-size: 14px;
    color: #353536;
    white-space: nowrap;
    text-align: right;

    .user-icon {
        margin-right: 11px;
    }

    .user-name {
        margin-right: 4px;
    }

    .eth {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 54px;
        height: 33px;
        // margin-left: 28px;
        margin-left: 23px;
        font-weight: 500;
        font-size: 12px;
        color: #A9A8AF;

        .num {
            font-weight: 600;
            font-size: 12px;
            color: #000000;
        }
    }

    .enter {
        margin-left: 19px;
    }

`

export const Head = styled.div`
    width: 100%;
`

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
`

export const HotTitle = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 29px;
    padding: 6px 10px;
    font-weight: 500;

    .title {
        color: #000000;
        line-height: 17px;
        font-size: 14px;
    }

    .op {
        color: #5B28EB;
        line-height: 13px;
        font-size: 11px;
        cursor: pointer;
    }
`

export const ToolsItemContainer = styled.div`
    width: 70px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 18px;

    img {
        width: 70px;
        height: 70px;
    }

    span {
        width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        color: #1C1B1D;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
    }
`

export const TrendsHotContainer = styled.div`
    width: 272px;
    height: 164px;
    margin: 17px auto 0 auto;

    .hot-trend-list {
        width: 100%;
        height: 123px;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        overflow: hidden;
    }

    .trend-list {
        width: 100%;
        height: 123px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`

export const TrendsItemContainer = styled.div`
    width: 127px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 12px;

    img {
        width: 127px;
        height: 80px;
    }

    .des-title {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 32px;
        text-align: left;

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
            color: #A9A8AF;
        }
    }
`

export const HistoryHotContainer = styled.div`
    width: 272px;
    height: 164px;
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
`

export const HistoryHotItemContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;

    .user-icon {
        width: 40px;
        height: 40px;
        margin-right: 19px;
        border-radius: 50%;
    }

    .user-des {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 95px;
        height: 32px;
        padding: 0px 8px;
        font-size: 12px;

        .user-name {
            font-weight: 700;
            color: #353536;
        }
        .user-eth {
            font-weight: 500;
            color: #A9A8AF;
        }
    }

    .imgs-container {
        display: flex;
        justify-content: center;
        width: calc(272px - 53px - 40px - 95px);

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
        width: 53px;
        flex-direction: column;
        font-weight: 500;
        font-size: 12px;
        color: #A9A8AF;
        text-align: right;
        .day-time {

        }
        .hour-time {

        }
    }
`

export const HeadReturnContainer = styled.div`
    display: flex;
    width: 303px;
    height: 20px;
    margin-top: 52px;

    img {
        height: 14.166666984558105px;
        width: 16.666667938232422px;
        margin: 0 11.67px 0 11.57px;
        cursor: pointer;
    }

    span {
        font-weight: 500;
        font-size: 14px;
        color: #353536;
    }
`

export const ModalContainer = styled.div`
    position: absolute;
    top: 35px;
    left: 13px;
    display: flex;
    flex-direction: column;
    width: 275px;
    height: 160px;
    background: #FFFFFF;
    box-shadow: 0px 8px 24px -6px rgba(214, 214, 214, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4);
    border-radius: 9px;

    
`
