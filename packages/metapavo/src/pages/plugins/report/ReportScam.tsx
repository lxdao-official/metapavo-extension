import styled from "styled-components";
import { useEffect, useState } from "react";
import { reportCreate } from "../../../utils/apis/nft_api";
import { HeadReturnContainer, PageContainer } from "../styleCom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getLang } from "../../../utils/lang";
import { colorfulButtonStyle } from "../../../styles/common-colorful-button";
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");
const NoFoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-title {
    text-align: center;
    width: 100%;
    margin: 30px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #000000;
  }

  .form-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    line-height: 30px;
  }

  .form-title {
    text-align: left;
    width: 100%;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 10px;
    color: #000000;
  }

  .form-input {
    height: 36px;
    line-height: 36px;
    border: 1px solid #e5e3e6;
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 20px;
  }
  textarea {
    height: 100px !important;
    line-height: 20px !important;
  }
  .disable {
    background: #efeef1;
  }
  .form-select {
    height: 45px;
    border: 1px solid #e5e3e6;
    border-radius: 6px;
    padding: 0 16px;
    margin-bottom: 20px;
  }

  button {
    height: 45px;
    margin-bottom: 20px;
    ${colorfulButtonStyle}
  }
`;

export function ReportScam() {
  const [type, setType] = useState<string>("NFT");
  const [name, setName] = useState<string>("");

  const onBtnClick = async () => {
    const reportResult = await reportCreate(url, type, name, true);
    if (reportResult) {
      clear();
      toast.success("submit success. thank you.", {});
    } else {
      toast.error("Error", {});
    }
  };
  const onTypeChange = (e: any) => {
    setType(e.target.value);
  };
  const onNameChange = (e: any) => {
    setName(e.target.value);
  };
  const clear = () => {
    setType("NFT");
    setName("");
  };
  const [url, seturl] = useState("");
  useEffect(() => {
    chrome.tabs?.query({ active: true, lastFocusedWindow: true }, function (tabs) {
      console.log(tabs);

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].url && tabs[i].url?.startsWith("http")) {
          seturl(tabs[i].url || "");
        }
      }
    });
  }, []);
  const navigate = useNavigate();
  const HeadReturn = (props: any) => {
    const title = props.title;

    return (
      <HeadReturnContainer>
        <img
          onClick={() => {
            navigate("/index");
          }}
          src={returnImg}
          alt=""
        />
        <span>{title}</span>
      </HeadReturnContainer>
    );
  };
  return (
    <PageContainer>
      <HeadReturn title={getLang("Report_Scam")} />
      <NoFoundWrap>
        <div className="form-wrap">
          <span className="form-title">URL</span>
          <input
            className="form-input disable"
            type="text"
            // disabled={true}
            onChange={(e) => {
              seturl(e.target.value);
            }}
            value={url}
          />
          <span className="form-title">Type</span>
          <select className="form-select" onChange={onTypeChange} value={type}>
            <option value="NFT">NFT</option>
            <option value="TOKEN">TOKEN</option>
            <option value="TWITTER">TWITTER</option>
            <option value="DAO">DAO</option>
            <option value="OTHERS">OTHERS</option>
          </select>
          <span className="form-title">Desc</span>
          <textarea
            onChange={onNameChange}
            value={name}
            className="form-input"
            placeholder="Desc"
          />
          <button type="button" onClick={onBtnClick}>
            Submit
          </button>
        </div>
      </NoFoundWrap>
    </PageContainer>
  );
}
