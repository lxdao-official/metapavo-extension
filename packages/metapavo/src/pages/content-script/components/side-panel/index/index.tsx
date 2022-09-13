import { useState, useContext, useEffect } from "react";
import { getNftById } from "../../../../../utils/apis/nft_api";
import { GlobalContext } from "../../../context/useGlobal";
import { IconButton } from "@mui/material";
import toast from "react-hot-toast";
import { Container, HeadSelect, HeadLogo, Head, ModalContainer, ModalBG } from "./styleCom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import ClearIcon from "@mui/icons-material/Clear";
import { WalletContext } from "../../../context/useWallet";
import { SearchCom } from "./search";
import { HistoryHot } from "./comps/HistoryHot";
import { ToolsHot } from "./comps/ToolsHot";
const arrow_down = chrome.runtime.getURL("images/svgs/arrow_down.svg");
const index_logo = chrome.runtime.getURL("images/index-logo.png");

const Pavo = () => {
  const [selectMenu, setSelectMenu] = useState<boolean>(false);

  const { setShowLogin, setActiveProject } = useContext(GlobalContext);
  const { loginedAddress, logout } = useContext(WalletContext);

  const goDetail = async (project_id: string) => {
    const project = await getNftById(project_id);
    if (project) {
      setActiveProject(project);
    }
  };
  function formatAddress(address: string) {
    // ens
    if (address.includes(".")) {
      return address;
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  // 头部组件
  const HeadCom = (props: any) => {
    return (
      <Head>
        <HeadSelect onClick={() => setSelectMenu(!selectMenu)}>
          <span>{formatAddress(loginedAddress)}</span>
          <img src={arrow_down} alt="" />
        </HeadSelect>

        <HeadLogo>
          <img className="logo" src={index_logo} alt="" />
        </HeadLogo>
      </Head>
    );
  };

  const copyContractAddress = () => {
    copy(loginedAddress);
    toast.success("Copied");
  };
  const LoginModal = (props: any) => {
    return (
      <>
        <ModalBG
          onClick={() => {
            setSelectMenu(false);
          }}
        ></ModalBG>
        <ModalContainer>
          <div className="user-des">
            <div className="user-topLine">
              <div className="user-name">
                <span className="user-code">{formatAddress(loginedAddress)}</span>
                <IconButton
                  onClick={() => {
                    copyContractAddress();
                  }}
                  sx={{ ml: 0.5, height: "17px", width: "17px" }}
                >
                  <ContentCopyIcon sx={{ ml: 0.5, height: "17px", width: "17px" }} />
                </IconButton>
              </div>
              {/* <div className="user-eth">Value: 1213.22 USDC</div> */}
            </div>
            <ClearIcon
              sx={{ height: "24px", width: "24px", color: "#D1D0D6", cursor: "pointer" }}
              onClick={() => setSelectMenu(!selectMenu)}
            />
          </div>
          <div className="op-list">
            {/* <div className="metaPavo-pp">系统设置</div> */}
            <div
              className="metaPavo-pp"
              onClick={async () => {
                await logout();
                setShowLogin(true);
              }}
            >
              Logout
            </div>
          </div>
          <div className="mask" />
        </ModalContainer>
      </>
    );
  };

  return (
    <Container>
      <HeadCom />

      <SearchCom goDetail={goDetail} />

      <ToolsHot title={"TOOLS"} />

      <HistoryHot title={"HISTORY"} goDetail={goDetail} />

      {selectMenu && <LoginModal />}
    </Container>
  );
};

export default Pavo;
