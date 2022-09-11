import styled from "styled-components";
import { useEffect, useState } from "react";
import { reportCreate } from "../../../../utils/apis/nft_api";
import { HeadReturnContainer, PageContainer } from "../styleCom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
    background: linear-gradient(
      91.75deg,
      rgba(125, 226, 172, 0.1) 0%,
      rgba(56, 157, 250, 0.1) 49.26%,
      rgba(159, 80, 255, 0.1) 97.76%
    );
    box-shadow: 0px 0px 0px #4216e7;
    border-radius: 4px;
    border-width: 3px;
    height: 45px;
    margin-bottom: 20px;
    border-image-slice: 1;
    cursor: pointer;
    border-image-source: linear-gradient(to left, #7de2ac, #9f50ff);
  }
`;

export function Report() {
  const [type, setType] = useState<string>("NFT");
  const [name, setName] = useState<string>("");

  const onBtnClick = async () => {
    const reportResult = await reportCreate(url, type, name);
    console.log("heisan-->", reportResult);
    if (reportResult) {
      // return {
      //   projectInfo,
      //   status: CheckResultStatus.SUCCESS,
      // };
      clear();
      toast.success("submit success. thank you.", {});
    } else {
      // return {
      //   status: CheckResultStatus.NOTINSERVER,
      // };
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
  const [url, seturl] = useState<string>("");
  useEffect(() => {
    seturl(window.location.toString().startsWith("http") ? window.location.toString() : "");
  }, []);
  return (
    <PageContainer>
      <HeadReturn title={"submit a project"} />
      <NoFoundWrap>
        <div className="form-wrap">
          <span className="form-title">URL</span>
          <input
            className="form-input disable"
            type="text"
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
          <span className="form-title">Name</span>
          <input
            onChange={onNameChange}
            value={name}
            className="form-input"
            type="text"
            placeholder="Name"
          />
          <button type="button" onClick={onBtnClick}>
            Submit
          </button>
        </div>
      </NoFoundWrap>
    </PageContainer>
  );
}
