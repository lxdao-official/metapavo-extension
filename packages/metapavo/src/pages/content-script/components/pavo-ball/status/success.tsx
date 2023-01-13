import { Tooltip } from '@mui/material';
import {
  addFavByProjectId,
  isFaved,
  removeFavByProjectId,
} from 'extension-common/src/apis/nft_api';
import { AutoDecimal } from 'extension-common/src/decimals';
import { getLang } from 'extension-common/src/lang';
import { linkImages } from 'extension-common/src/linkImages';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import config from '../../../../../config';
import { GlobalContext } from '../../../context/useGlobal';
import { SuccessRootElement } from '../styles';

export default function SuccessPopup({ state }: { state: 'show' | 'hide' }) {
  const useG = useContext(GlobalContext);
  const { activeProject, setAddRootClass, activeTokenId } = useG;
  const mainLinks = [
    {
      link: activeProject?.links?.twitter,
      label: 'Twitter',
      img: linkImages.twitter,
    },
    {
      link: activeProject?.links?.website,
      label: 'Website',
      img: linkImages.website,
    },
    {
      link: activeProject?.links?.etherscan,
      label: 'Etherscan',
      img: linkImages.etherscan,
    },
  ].filter((i) => {
    return i.link;
  });
  const links = [
    {
      link: activeProject?.links?.opensea,
      label: 'OpenSea',
      img: linkImages.opensea,
    },
    {
      link: activeProject?.links?.blur,
      label: 'Blur',
      img: linkImages.blur,
    },
    {
      link: activeProject?.links?.gem,
      label: 'Gem',
      img: linkImages.gem,
    },
    {
      link: activeProject?.links?.looksrare,
      label: 'LooksRare',
      img: linkImages.looksrare,
    },
    {
      link: activeProject?.links?.x2y2,
      label: 'X2Y2',
      img: linkImages.x2y2,
    },

    // {
    //   link: activeProject?.links?.sudoswap,
    //   label: 'SudoSwap',
    //   img: linkImages.sudoswap,
    // },
    {
      link: activeProject?.links?.tenderly,
      label: 'Tenderly',
      img: linkImages.tenderly,
    },
  ].filter((i) => {
    return i.link;
  });

  async function addFav() {
    if (activeProject) {
      try {
        await addFavByProjectId(activeProject.id);
        toast.success('Add to watchlist successfully');
        refreshFavedStatus();
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error('Please select a project first');
    }
  }
  const [faved, setFaved] = React.useState(false);
  const refreshFavedStatus = async () => {
    if (activeProject?.id) {
      const _isFaved = await isFaved(activeProject?.id);
      setFaved(_isFaved);
    }
  };

  async function removeFav() {
    if (activeProject) {
      try {
        await removeFavByProjectId(activeProject.id);
        toast.success('Remove from watchlist successfully');
        refreshFavedStatus();
      } catch (e: any) {
        toast.error(e.message);
      }
    } else {
      toast.error('Please select a project first');
    }
  }
  useEffect(() => {
    refreshFavedStatus();
  }, [activeProject?.id]);
  return (
    <SuccessRootElement
      className={[
        state === 'show' ? 'mp-success-show' : 'mp-success-hide',
      ].join(' ')}
    >
      {state === 'show' ? (
        <>
          <div className="mp-success-hd">
            <img
              src={activeProject?.imageUrl as string}
              alt={activeProject?.name}
            />
            <div className="mp-success-title">{activeProject?.name}</div>
            {activeProject?.contractData?.isVerified ? (
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
          </div>
          <div className="mp-success-bd">
            <div className="mp-success-bd-price">
              {' '}
              <span className="mp-success-price-item">
                {' '}
                {getLang('Floor')}:{' '}
                {activeProject?.nftProjectInfo?.stats[0]?.floorPrice
                  ? AutoDecimal(
                      activeProject.nftProjectInfo.stats[0].floorPrice,
                    )
                  : '-'}
                Ξ
              </span>
              <span className="mp-success-price-item">
                {getLang('Volume')}(24h):{' '}
                {activeProject?.nftProjectInfo?.stats[0]?.oneDayVolume
                  ? AutoDecimal(
                      activeProject.nftProjectInfo.stats[0]?.oneDayVolume,
                    )
                  : '-'}
                Ξ
                {activeProject?.nftProjectInfo?.stats[0]?.oneDayChange ? (
                  <span
                    style={{
                      color:
                        activeProject.nftProjectInfo.stats[0].oneDayChange > 0
                          ? '#3EAF3F'
                          : '#E14942',
                      paddingLeft: '5px',
                      fontWeight: 500,
                    }}
                  >
                    {activeProject.nftProjectInfo.stats[0].oneDayChange > 0 ? (
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
                    {Number(
                      activeProject.nftProjectInfo.stats[0].oneDayChange * 100,
                    ).toFixed(0)}
                    %
                  </span>
                ) : (
                  ''
                )}
              </span>
            </div>
            <div className="mp-success-bd-price">
              <span className="mp-success-price-item">
                {getLang('Sales')}(24h):{' '}
                {activeProject?.nftProjectInfo?.stats[0]?.oneDaySales
                  ? activeProject.nftProjectInfo.stats[0].oneDaySales
                  : '-'}
                {/* {activeProject?.nftProjectInfo?.stats[0]?.oneDayDifference && (
              <span
                style={{
                  color:
                    activeProject.nftProjectInfo.stats[0].oneDayDifference > 0
                      ? "#3EAF3F"
                      : "#E14942",
                  paddingLeft: "5px",
                  fontWeight: 500,
                }}
              >
                {activeProject.nftProjectInfo.stats[0].oneDayDifference > 0 ? (
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

                {activeProject.nftProjectInfo.stats[0].oneDayDifference}
              </span>
            )} */}
              </span>
              <span className="mp-success-price-item">
                {getLang('Volume')}(All):{' '}
                {activeProject?.nftProjectInfo?.stats[0]?.totalVolume
                  ? AutoDecimal(
                      activeProject.nftProjectInfo.stats[0].totalVolume,
                    )
                  : '-'}
                Ξ
              </span>
            </div>
          </div>
          <div className="mp-success-links">
            <div className="mp-links-shape"> </div>
            <div className="mp-success-links-left">
              <div className="mp-success-links-left-inner">
                {mainLinks.map((link, index) => (
                  <Tooltip title={link.label} placement="top" arrow>
                    <a
                      href={`${config.baseURL}/jump/nft?id=${
                        activeProject?.id
                      }&url=${encodeURIComponent(link.link || '')}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={link.img} alt="" />
                    </a>
                  </Tooltip>
                ))}
                <a className="dividor"></a>
                {links.map((link, index) => (
                  <Tooltip title={link.label} placement="top" arrow>
                    <a
                      href={`${config.baseURL}/jump/nft?id=${
                        activeProject?.id
                      }&url=${encodeURIComponent(link.link || '')}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={link.img} alt="" />
                    </a>
                  </Tooltip>
                ))}
                <a>
                  <img src="" alt="" style={{ opacity: 0 }} />{' '}
                </a>
              </div>
            </div>
            {faved ? (
              <Tooltip title="Remove from Watchlist" placement="top" arrow>
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'inline-block', marginTop: '-1px' }}
                  onClick={() => {
                    removeFav();
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.39556 0.687639C7.15706 0.437454 4.84294 0.437454 2.60444 0.687639C1.35524 0.827256 0.347427 1.81147 0.200744 3.06561C-0.0669147 5.35409 -0.0669147 7.66597 0.200744 9.95445C0.347427 11.2086 1.35524 12.1928 2.60444 12.3324C4.84294 12.5826 7.15705 12.5826 9.39556 12.3324C10.6448 12.1928 11.6526 11.2086 11.7993 9.95445C12.0669 7.66597 12.0669 5.35409 11.7993 3.06561C11.6526 1.81147 10.6448 0.827256 9.39556 0.687639ZM10.1814 4.2992C10.1814 4.16679 10.1288 4.03979 10.0353 3.94611C9.94163 3.85254 9.81459 3.79999 9.68221 3.79999C9.54977 3.79999 9.4228 3.85254 9.32913 3.94611L4.85228 8.42296L3.04022 6.6109C2.9455 6.52264 2.82023 6.47459 2.69079 6.47688C2.56135 6.47916 2.43784 6.5316 2.3463 6.62314C2.25475 6.71469 2.20231 6.83819 2.20003 6.96763C2.19775 7.09708 2.2458 7.22235 2.33405 7.31707L4.4992 9.48221C4.59288 9.57575 4.71987 9.62831 4.85228 9.62831C4.98469 9.62831 5.11168 9.57575 5.20537 9.48221L10.0353 4.65228C10.1288 4.55859 10.1814 4.4316 10.1814 4.2992Z"
                    fill="#D1D0D6"
                  />
                </svg>
              </Tooltip>
            ) : (
              <Tooltip title="Add to Watchlist" placement="top" arrow>
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'inline-block', marginTop: '-1px' }}
                  onClick={() => {
                    addFav();
                  }}
                >
                  <defs>
                    <linearGradient
                      id="linear"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stop-color="#7de2ac" />{' '}
                      <stop offset="50%" stop-color="#389dfa" />{' '}
                      <stop offset="100%" stop-color="#9f50ff" />{' '}
                    </linearGradient>
                  </defs>

                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.60444 0.687639C4.84294 0.437454 7.15706 0.437454 9.39556 0.687639C10.6448 0.827256 11.6526 1.81147 11.7993 3.06561C12.0669 5.35409 12.0669 7.66597 11.7993 9.95445C11.6526 11.2086 10.6448 12.1928 9.39556 12.3324C7.15705 12.5826 4.84294 12.5826 2.60444 12.3324C1.35524 12.1928 0.347427 11.2086 0.200744 9.95445C-0.0669147 7.66597 -0.0669147 5.35409 0.200744 3.06561C0.347427 1.81147 1.35524 0.827256 2.60444 0.687639ZM6.00001 2.86855C6.30212 2.86855 6.54704 3.11347 6.54704 3.41558V5.963H9.09448C9.39659 5.963 9.6415 6.20791 9.6415 6.51003C9.6415 6.81214 9.39659 7.05705 9.09448 7.05705H6.54704V9.60447C6.54704 9.90658 6.30212 10.1515 6.00001 10.1515C5.6979 10.1515 5.45298 9.90658 5.45298 9.60447V7.05705H2.90558C2.60347 7.05705 2.35856 6.81214 2.35856 6.51003C2.35856 6.20791 2.60347 5.963 2.90558 5.963H5.45299V3.41558C5.45299 3.11347 5.6979 2.86855 6.00001 2.86855Z"
                    fill="url(#linear)"
                  />
                </svg>
              </Tooltip>
            )}

            {/* <Tooltip title="Open Project Detail" placement="top" arrow>
          <button
            style={{ width: "45px", marginLeft: "5px" }}
            onClick={() => {
              useG.setShowMain(!useG.showMain);
            }}
          >
            {getLang("More")}
          </button>
        </Tooltip> */}
          </div>
        </>
      ) : null}

      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setAddRootClass('');
        }}
        className="mp-success-close"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 7L17 17"
            stroke="#D1D0D6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 17L17 7"
            stroke="#D1D0D6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </SuccessRootElement>
  );
}
