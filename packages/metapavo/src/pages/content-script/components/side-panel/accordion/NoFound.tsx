import styled from "styled-components";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { reportCreate } from "../../../../../utils/apis/nft_api";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getLang } from "../../../../../utils/lang";
import { colorfulButtonStyle } from "../../../../../styles/common-colorful-button";
const NoFoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-title {
    text-align: center;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 10px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #000000;
  }

  .sub-title {
    text-align: center;
    width: 100%;
    margin-bottom: 30px;
    font-family: "Inter";
    font-style: normal;
    font-size: 12px;
    line-height: 17px;
    color: #000000;
    cursor: pointer;
  }

  .form-wrap {
    display: flex;
    flex-direction: column;
    width: 90%;
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
    width: 100%;
  }
  textarea {
    height: 100px !important;
    line-height: 20px !important;
    width: 100%;
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

export function NoFound() {
  const [type, setType] = useState<string>("NFT");
  const [name, setName] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);

  const onBtnClick = async () => {
    const reportResult = await reportCreate(window.location.toString(), type, name);
    if (reportResult) {
      clear();
      toast.success("Succeed");
    } else {
      toast.error("Error");
    }
  };

  const onTypeChange = (e: any) => {
    setType(e.target.value);
  };
  const onNameChange = (e: any) => {
    setName(e.target.value);
  };
  const ToggleForm = () => {
    setShow(!show);
  };
  const clear = () => {
    setType("NFT");
    setName("");
  };

  return (
    <NoFoundWrap>
      <svg
        width="103"
        height="80"
        viewBox="0 0 103 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginTop: "50px" }}
      >
        <path
          d="M47.9632 80C70.1921 80 88.2121 62.0914 88.2121 40C88.2121 17.9086 70.1921 0 47.9632 0C25.7344 0 7.71436 17.9086 7.71436 40C7.71436 62.0914 25.7344 80 47.9632 80Z"
          fill="url(#paint0_linear_530_2607)"
        />
        <g filter="url(#filter0_d_530_2607)">
          <rect
            x="27.5034"
            y="11.5188"
            width="41.7707"
            height="51.6763"
            rx="5.36652"
            fill="url(#paint1_linear_530_2607)"
          />
        </g>
        <rect x="31.1929" y="18.1855" width="16.7704" height="3.2368" rx="1.6184" fill="black" />
        <rect x="31.1929" y="27.4597" width="33.5407" height="3.2368" rx="1.6184" fill="#D5D5D5" />
        <rect x="31.1929" y="36.7339" width="33.5407" height="3.2368" rx="1.6184" fill="#D5D5D5" />
        <rect x="31.1929" y="46.0081" width="33.5407" height="3.2368" rx="1.6184" fill="#D5D5D5" />
        <rect x="31.1929" y="55.282" width="33.5407" height="3.2368" rx="1.6184" fill="#D5D5D5" />
        <g filter="url(#filter1_d_530_2607)">
          <path
            d="M94.2997 5.80811H74.1483C73.2092 5.80811 72.448 6.60427 72.448 7.5864V17.4928C72.448 18.4749 73.2092 19.2711 74.1483 19.2711H94.2997C95.2387 19.2711 96 18.4749 96 17.4928V7.5864C96 6.60427 95.2387 5.80811 94.2997 5.80811Z"
            fill="white"
          />
        </g>
        <path
          d="M77.479 14.6667C78.5904 14.6667 79.4914 13.7713 79.4914 12.6667C79.4914 11.5622 78.5904 10.6667 77.479 10.6667C76.3676 10.6667 75.4666 11.5622 75.4666 12.6667C75.4666 13.7713 76.3676 14.6667 77.479 14.6667Z"
          fill="#CCC6D9"
        />
        <rect x="82.1748" y="10.6667" width="10.733" height="4" rx="2" fill="#D5D5D5" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M59.7393 65.5212C64.0594 65.5212 68.0743 64.2225 71.4102 61.9965L85.0609 74.9468L90.0116 69.2384L76.8391 56.7418C79.2719 53.3394 80.7023 49.1796 80.7023 44.6878C80.7023 33.1819 71.3168 23.8545 59.7393 23.8545C48.1618 23.8545 38.7764 33.1819 38.7764 44.6878C38.7764 56.1938 48.1618 65.5212 59.7393 65.5212ZM77.6195 44.6877C77.6195 54.4288 69.6737 62.3254 59.872 62.3254C50.0703 62.3254 42.1245 54.4288 42.1245 44.6877C42.1245 34.9466 50.0703 27.05 59.872 27.05C69.6737 27.05 77.6195 34.9466 77.6195 44.6877Z"
          fill="#CCC6D9"
        />
        <g filter="url(#filter2_b_530_2607)">
          <path
            d="M59.8703 62.6665C69.9659 62.6665 78.15 54.6076 78.15 44.6665C78.15 34.7254 69.9659 26.6665 59.8703 26.6665C49.7747 26.6665 41.5906 34.7254 41.5906 44.6665C41.5906 54.6076 49.7747 62.6665 59.8703 62.6665Z"
            fill="white"
            fill-opacity="0.3"
          />
        </g>
        <path
          d="M63.0309 44.6666L67.4546 40.2873C67.869 39.854 68.0961 39.2783 68.0875 38.6823C68.079 38.0863 67.8355 37.5171 67.4088 37.0956C66.9821 36.6742 66.4059 36.4337 65.8025 36.4252C65.1991 36.4168 64.6162 36.6411 64.1776 37.0504L59.7441 41.4297L55.3204 37.0504C55.1075 36.8279 54.8516 36.6498 54.5679 36.5266C54.2841 36.4035 53.9782 36.3378 53.6683 36.3335C53.3584 36.3291 53.0508 36.3862 52.7636 36.5014C52.4764 36.6165 52.2155 36.7874 51.9963 37.0039C51.7772 37.2204 51.6042 37.4781 51.4876 37.7617C51.371 38.0454 51.3132 38.3493 51.3176 38.6554C51.322 38.9615 51.3885 39.2637 51.5132 39.544C51.6378 39.8243 51.8181 40.077 52.0434 40.2873L56.4745 44.6666L52.0434 49.0459C51.8181 49.2561 51.6378 49.5089 51.5132 49.7892C51.3885 50.0695 51.322 50.3716 51.3176 50.6777C51.3132 50.9839 51.371 51.2878 51.4876 51.5714C51.6042 51.8551 51.7772 52.1128 51.9963 52.3293C52.2155 52.5458 52.4764 52.7166 52.7636 52.8318C53.0508 52.9469 53.3584 53.004 53.6683 52.9997C53.9782 52.9954 54.2841 52.9297 54.5679 52.8065C54.8516 52.6834 55.1075 52.5053 55.3204 52.2828L59.7539 47.9035L64.1875 52.2828C64.6302 52.668 65.2051 52.8719 65.7948 52.853C66.3845 52.8342 66.9447 52.5939 67.3613 52.1811C67.7779 51.7684 68.0194 51.2143 68.0368 50.6318C68.0541 50.0492 67.8459 49.4821 67.4546 49.0459L63.0309 44.6666Z"
          fill="black"
        />
        <path
          d="M85.0598 74.9475L90.0105 69.2391L90.7562 69.9465C91.4797 70.6329 91.9128 71.5917 91.9604 72.6121C92.0079 73.6325 91.666 74.6309 91.0097 75.3876C90.3534 76.1443 89.4367 76.5973 88.461 76.6471C87.4854 76.6968 86.5309 76.3391 85.8074 75.6528L85.0617 74.9453L85.0598 74.9475Z"
          fill="#E1DCEB"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5404 20.7241C16.5341 20.2487 16.4741 19.7693 16.3541 19.2865C15.9333 17.5925 14.0557 16.505 12.0574 16.2493C10.0598 15.9936 7.98246 16.5754 7.18185 18.049C6.72391 18.8915 6.66075 19.6177 6.84787 20.2299C7.03421 20.8388 7.47632 21.3436 8.07638 21.737C9.74945 22.8328 12.6795 23.0565 14.0162 22.5984C14.6345 22.3861 15.2384 22.1304 15.8267 21.8378C15.4903 23.7531 14.2373 25.5676 12.565 27.2027C8.93069 30.7563 3.29091 33.4534 0.219545 34.4451C0.0545281 34.4984 -0.037068 34.6803 0.0142531 34.8516C0.0655741 35.0229 0.240852 35.1188 0.405869 35.0655C3.53803 34.0542 9.28758 31.2996 12.9938 27.6755C14.9084 25.8037 16.2728 23.6966 16.5057 21.4813C20.834 19.0808 24.3886 14.7257 27.4276 11.0607C27.5405 10.9254 27.5255 10.7197 27.3944 10.6025C27.2634 10.4861 27.066 10.5009 26.9531 10.6369C24.038 14.152 20.6548 18.3334 16.5404 20.7241ZM15.9112 21.0724C15.9349 20.538 15.8843 19.9955 15.7477 19.448C15.3837 17.9818 13.7107 17.1147 11.9807 16.8934C10.9204 16.7582 9.83001 16.8697 8.97493 17.2663C8.43724 17.5155 7.99428 17.8769 7.72741 18.3686C7.37684 19.0136 7.30104 19.5652 7.44474 20.0332C7.58844 20.5044 7.94535 20.883 8.4104 21.1871C9.93503 22.1861 12.6029 22.3984 13.8196 21.9813C14.5373 21.7354 15.2337 21.4289 15.9112 21.0724Z"
          fill="black"
        />
        <ellipse cx="93.2432" cy="51.6665" rx="2.01244" ry="2" fill="#E3E3E3" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.2347 65.4645C17.5938 65.3307 17.9717 65.1528 18.2632 64.8953C18.6093 64.5894 18.7501 64.1954 18.8446 63.7807C18.966 63.2479 19.0145 62.6804 19.1617 62.1467C19.2161 61.9485 19.321 61.8736 19.366 61.8404C19.4797 61.7564 19.5947 61.734 19.7029 61.7424C19.831 61.7521 20.0071 61.8028 20.1229 62.0275C20.1394 62.0597 20.1609 62.1087 20.1753 62.1759C20.1858 62.2251 20.1927 62.379 20.2038 62.4425C20.2317 62.5988 20.255 62.7551 20.2769 62.9122C20.3497 63.4353 20.3916 63.8796 20.6218 64.3601C20.9341 65.0125 21.247 65.4116 21.6713 65.5884C22.0817 65.7594 22.5723 65.7273 23.1991 65.5932C23.2588 65.5781 23.3178 65.5651 23.3762 65.5545C23.6526 65.504 23.9168 65.6938 23.9711 65.9818C24.0254 66.2695 23.8497 66.55 23.5758 66.6132C23.5187 66.6264 23.4623 66.6389 23.4066 66.6503C22.5595 66.8697 21.5789 67.6524 21.009 68.3379C20.8333 68.5492 20.5762 69.1401 20.3138 69.517C20.1202 69.795 19.9027 69.9783 19.72 70.0431C19.5976 70.0867 19.4944 70.08 19.4091 70.058C19.2853 70.026 19.1825 69.9558 19.1037 69.8442C19.0607 69.7831 19.0209 69.7013 19.0019 69.5968C18.9928 69.5465 18.9918 69.4188 18.992 69.3609C18.9385 69.1686 18.8731 68.9807 18.8254 68.7867C18.7117 68.3236 18.4886 68.0304 18.2236 67.6432C17.9757 67.2807 17.7094 67.053 17.3191 66.8712C17.2683 66.8582 16.8586 66.7533 16.7139 66.6931C16.5026 66.6048 16.4018 66.4569 16.3653 66.3773C16.3032 66.2421 16.2968 66.124 16.3092 66.0256C16.3275 65.8803 16.3899 65.756 16.5005 65.6556C16.569 65.5932 16.6714 65.5325 16.8085 65.503C16.9143 65.4799 17.1952 65.4665 17.2347 65.4645ZM19.6382 64.7098C19.6572 64.7541 19.6775 64.7985 19.6989 64.8434C20.1563 65.7989 20.6678 66.3324 21.2895 66.5912L21.3103 66.5996C20.8944 66.9226 20.5179 67.2835 20.2302 67.6296C20.1117 67.772 19.9549 68.068 19.7854 68.3715C19.6314 67.848 19.3796 67.478 19.063 67.015C18.8211 66.6616 18.5676 66.3956 18.2562 66.1789C18.4979 66.0491 18.7284 65.8972 18.9293 65.7197C19.2636 65.4242 19.4847 65.0818 19.6382 64.7098Z"
          fill="#CCC6D9"
        />
        <defs>
          <filter
            id="filter0_d_530_2607"
            x="17.4412"
            y="8.16472"
            width="61.8952"
            height="71.8007"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="6.70815" />
            <feGaussianBlur stdDeviation="5.03111" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.570833 0 0 0 0 0.570833 0 0 0 0 0.570833 0 0 0 0.19 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_530_2607" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_530_2607"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_d_530_2607"
            x="70.1001"
            y="2.78944"
            width="32.2726"
            height="22.1835"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="2.01244" dy="1.34163" />
            <feGaussianBlur stdDeviation="2.18015" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.104618 0 0 0 0 0.465612 0 0 0 0 0.545833 0 0 0 0.09 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_530_2607" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_530_2607"
              result="shape"
            />
          </filter>
          <filter
            id="filter2_b_530_2607"
            x="38.9073"
            y="23.9832"
            width="41.9258"
            height="41.3665"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="1.34163" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_530_2607" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_530_2607"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_530_2607"
            x1="47.653"
            y1="-13.025"
            x2="48.4673"
            y2="127.449"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F2F2F2" />
            <stop offset="1" stopColor="#EFEFEF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_530_2607"
            x1="48.3887"
            y1="11.5188"
            x2="48.3887"
            y2="63.1951"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="0.71875" stopColor="#FAFAFA" />
          </linearGradient>
        </defs>
      </svg>
      <div className="main-title">{getLang("nofound_desc")}</div>
      <div className="sub-title" onClick={ToggleForm}>
        {getLang("nofound_desc2")}{" "}
        {show ? (
          <KeyboardArrowUpIcon sx={{ fontSize: "14px" }} />
        ) : (
          <KeyboardArrowDownIcon sx={{ fontSize: "14px" }} />
        )}
      </div>
      {show ? (
        <div className="form-wrap">
          <span className="form-title">URL</span>
          <input
            className="form-input disable"
            type="text"
            disabled={true}
            value={window.location.toString()}
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
            placeholder="desc"
          />
          <button type="button" onClick={onBtnClick}>
            Submit
          </button>
        </div>
      ) : null}
    </NoFoundWrap>
  );
}
