import { Tooltip } from '@nextui-org/react';
import { tokens } from 'extension-common/src/apis';
import { linkImages } from 'extension-common/src/linkImages';
import React from 'react';
import { useEffect } from 'react';

import Pick from './Pick';
import { TokenCardRoot } from './styles';

export default function CoinNormalCard(props: {
  token: tokens;
  showPick?: boolean;
}) {
  const blankImage = chrome.runtime.getURL('images/placeholder.png');
  const [links, setLinks] = React.useState<any[]>([]);
  useEffect(() => {
    const activeProject = props.token;

    setLinks([
      {
        link: `https://app.uniswap.org/#/tokens/ethereum/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48${props.token.slug}/`,
        label: 'Uniswap',
        img: linkImages.uniswap,
      },
      {
        link: `https://coinmarketcap.com/zh/currencies/${props.token.slug}/`,
        label: 'CoinMarketCap',
        img: linkImages.coinmarketcap,
      },
      // {
      //   link: activeProject?.links?.twitter,
      //   label: 'Twitter',
      //   img: linkImages.twitter,
      // },
      // {
      //   link: activeProject?.links?.website,
      //   label: 'Website',
      //   img: linkImages.website,
      // },
      // {
      //   link: activeProject?.links?.gem,
      //   label: 'Gem',
      //   img: linkImages.gem,
      // },
    ]);
  }, [props.token]);

  return (
    <TokenCardRoot>
      <div className="mp-success-hd">
        <img
          src={
            `https://s2.coinmarketcap.com/static/img/coins/64x64/${props.token.id}.png` ||
            blankImage
          }
          onError={(e) => {
            (e.target as HTMLImageElement).src = blankImage;
          }}
        />
        <a
          className="mp-success-title"
          href={`https://coinmarketcap.com/zh/currencies/${props.token.slug}/`}
          style={{
            fontSize: '13px',
          }}
        >
          {props.token.symbol}
        </a>
        {props.token.isAudited ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mp-success-verified"
          >
            <path
              d="M6.41493 0.51936C7.3582 -0.17312 8.64181 -0.17312 9.58507 0.51936L10.5126 1.2003C10.6657 1.31269 10.8437 1.38642 11.0314 1.4152L12.1688 1.58958C13.3254 1.76691 14.2331 2.67456 14.4104 3.8312L14.5848 4.96858C14.6136 5.1563 14.6873 5.33429 14.7997 5.48738L15.4806 6.41493C16.1731 7.3582 16.1731 8.6418 15.4806 9.58507L14.7997 10.5126C14.6873 10.6657 14.6136 10.8437 14.5848 11.0314L14.4104 12.1688C14.2331 13.3254 13.3254 14.2331 12.1688 14.4104L11.0314 14.5848C10.8437 14.6136 10.6657 14.6873 10.5126 14.7997L9.58507 15.4806C8.6418 16.1731 7.3582 16.1731 6.41493 15.4806L5.48738 14.7997C5.33429 14.6873 5.1563 14.6136 4.96858 14.5848L3.8312 14.4104C2.67456 14.2331 1.76691 13.3254 1.58958 12.1688L1.4152 11.0314C1.38642 10.8437 1.31269 10.6657 1.2003 10.5126L0.51936 9.58507C-0.17312 8.6418 -0.17312 7.3582 0.51936 6.41493L1.2003 5.48738C1.31269 5.33429 1.38642 5.1563 1.4152 4.96858L1.58958 3.8312C1.76691 2.67456 2.67456 1.76691 3.8312 1.58958L4.96858 1.4152C5.1563 1.38642 5.33429 1.31269 5.48738 1.2003L6.41493 0.51936Z"
              fill="#5B28EB"
            />
            <path
              d="M11.2803 5.71967C11.5732 6.01256 11.5732 6.48744 11.2803 6.78033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.71967 8.78033C4.42678 8.48744 4.42678 8.01256 4.71967 7.71967C5.01256 7.42678 5.48744 7.42678 5.78033 7.71967L7 8.93934L10.2197 5.71967C10.5126 5.42678 10.9874 5.42678 11.2803 5.71967Z"
              fill="white"
            />
          </svg>
        ) : null}
        <span className="mp-success-price-item">
          {props.token.price ? (
            <span
              style={{
                color:
                  props.token.percentChange24h &&
                  props.token.percentChange24h > 0
                    ? '#3EAF3F'
                    : '#E14942',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              {`$${props.token.price.toFixed(3)}`}
            </span>
          ) : (
            '-'
          )}{' '}
          <br />
          {props.token.percentChange24h ? (
            <span
              style={{
                color: props.token.percentChange24h > 0 ? '#3EAF3F' : '#E14942',
                paddingLeft: '5px',
                fontWeight: 500,
                fontSize: '12px',
              }}
            >
              {props.token.percentChange24h > 0 ? (
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.96 3.81C10.9092 3.68783 10.8121 3.59074 10.69 3.54C10.6299 3.51438 10.5653 3.50079 10.5 3.5H7.99997C7.86736 3.5 7.74018 3.55268 7.64642 3.64645C7.55265 3.74021 7.49997 3.86739 7.49997 4C7.49997 4.13261 7.55265 4.25979 7.64642 4.35355C7.74018 4.44732 7.86736 4.5 7.99997 4.5H9.29497L6.49997 7.295L4.85497 5.645C4.80849 5.59814 4.75319 5.56094 4.69226 5.53555C4.63133 5.51017 4.56598 5.4971 4.49997 5.4971C4.43396 5.4971 4.36861 5.51017 4.30768 5.53555C4.24675 5.56094 4.19145 5.59814 4.14497 5.645L1.14497 8.645C1.09811 8.69148 1.06091 8.74678 1.03552 8.80771C1.01014 8.86864 0.99707 8.93399 0.99707 9C0.99707 9.06601 1.01014 9.13136 1.03552 9.19229C1.06091 9.25322 1.09811 9.30852 1.14497 9.355C1.19145 9.40186 1.24675 9.43906 1.30768 9.46445C1.36861 9.48983 1.43396 9.5029 1.49997 9.5029C1.56598 9.5029 1.63133 9.48983 1.69226 9.46445C1.75319 9.43906 1.80849 9.40186 1.85497 9.355L4.49997 6.705L6.14497 8.355C6.19145 8.40186 6.24675 8.43906 6.30768 8.46445C6.36861 8.48983 6.43396 8.5029 6.49997 8.5029C6.56598 8.5029 6.63133 8.48983 6.69226 8.46445C6.75319 8.43906 6.80849 8.40186 6.85497 8.355L9.99997 5.205V6.5C9.99997 6.63261 10.0526 6.75979 10.1464 6.85355C10.2402 6.94732 10.3674 7 10.5 7C10.6326 7 10.7598 6.94732 10.8535 6.85355C10.9473 6.75979 11 6.63261 11 6.5V4C10.9992 3.93466 10.9856 3.87011 10.96 3.81Z"
                    fill="#3EAF3F"
                  />
                </svg>
              ) : (
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.96 9.19C10.9092 9.31217 10.8121 9.40926 10.69 9.46C10.6299 9.48562 10.5653 9.49921 10.5 9.5H7.99997C7.86736 9.5 7.74018 9.44732 7.64642 9.35355C7.55265 9.25979 7.49997 9.13261 7.49997 9C7.49997 8.86739 7.55265 8.74021 7.64642 8.64645C7.74018 8.55268 7.86736 8.5 7.99997 8.5H9.29497L6.49997 5.705L4.85497 7.355C4.80849 7.40186 4.75319 7.43906 4.69226 7.46445C4.63133 7.48983 4.56598 7.5029 4.49997 7.5029C4.43396 7.5029 4.36861 7.48983 4.30768 7.46445C4.24675 7.43906 4.19145 7.40186 4.14497 7.355L1.14497 4.355C1.09811 4.30852 1.06091 4.25322 1.03552 4.19229C1.01014 4.13136 0.99707 4.06601 0.99707 4C0.99707 3.93399 1.01014 3.86864 1.03552 3.80771C1.06091 3.74678 1.09811 3.69148 1.14497 3.645C1.19145 3.59814 1.24675 3.56094 1.30768 3.53555C1.36861 3.51017 1.43396 3.4971 1.49997 3.4971C1.56598 3.4971 1.63133 3.51017 1.69226 3.53555C1.75319 3.56094 1.80849 3.59814 1.85497 3.645L4.49997 6.295L6.14497 4.645C6.19145 4.59814 6.24675 4.56094 6.30768 4.53555C6.36861 4.51017 6.43396 4.4971 6.49997 4.4971C6.56598 4.4971 6.63133 4.51017 6.69226 4.53555C6.75319 4.56094 6.80849 4.59814 6.85497 4.645L9.99997 7.795V6.5C9.99997 6.36739 10.0526 6.24021 10.1464 6.14645C10.2402 6.05268 10.3674 6 10.5 6C10.6326 6 10.7598 6.05268 10.8535 6.14645C10.9473 6.24021 11 6.36739 11 6.5V9C10.9992 9.06534 10.9856 9.12989 10.96 9.19Z"
                    fill="#E14942"
                  />
                </svg>
              )}
              {Number(props.token.percentChange24h).toFixed(2)}%
            </span>
          ) : (
            ''
          )}
        </span>
      </div>
      <div className="mp-success-links">
        <div className="mp-success-links-left">
          {links.map((link, index) => (
            <Tooltip content={link.label} placement="top">
              <a href={link.link} target="_blank" rel="noreferrer">
                <img src={link.img} alt="" />
              </a>
            </Tooltip>
          ))}
        </div>
      </div>
      {/* {props.showPick ? (
        <Pick
          style={{
            position: "absolute",
            bottom: "5px",
            right: "9px",
            cursor: "pointer",
          }}
          onPick={async function (e: string) {
            // globalEvent.emit("add_token", props.token.symbol);
          }}
        />
      ) : null} */}
    </TokenCardRoot>
  );
}
