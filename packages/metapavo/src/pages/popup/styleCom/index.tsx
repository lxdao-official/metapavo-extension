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
  margin-top: 8px;
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
  .logo {
    height: 28px;
    width: auto;
    display: block;
  }
`;

export const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 53px;
  background: #f2f2f5;
  border-bottom: 1px solid #e9eaf3;
  padding: 13px 15px 0 15px;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 35px;
  left: 13px;
  display: flex;
  flex-direction: column;
  width: 275px;
  background: #ffffff;
  z-index: 1000;
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

export const ModalBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const MenuListStyle = styled.div``;
export const MenuItemStyle = styled.div`
  height: 57px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 0.5px solid #f5f5f5;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .menu-left {
  }
  .menu-right {
    display: flex;
    justify-content: flex-end;
  }
`;

export const Badge = styled.div`
  text-align: center;
  padding: 0 8px;
  color: #fff;
  font-size: 12px;
  line-height: 17px;
  height: 17px;
  background: #e14942;
  border-radius: 19px;
  margin-right: 8px;
`;

export const Version = styled.div`
  text-align: center;
  font-size: 12px;
  color: #999;
  line-height: 17px;
  margin-top: 20px;
`;
