import { Box } from '@mui/material';
import { Input } from '@nextui-org/react';
import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

import { colorfulButtonStyle } from '../../../styles/common-colorful-button';
import { WalletContext } from '../../content-script/context/useWallet';

//@ts-ignore
window.process = {};

const ButtonStyle = styled.button`
  padding: 0 20px;
  width: 276.57px;
  height: 48px;

  cursor: pointer;
  margin: 0 auto;

  ${colorfulButtonStyle}

  &:disabled {
    opacity: 0.6;
  }
  svg {
    vertical-align: -5px;
    margin-right: 10px;
  }
`;
const ButtonStyleSec = styled.button`
  padding: 0 20px;
  width: 276.57px;
  height: 48px;
  box-shadow: 0px 0px 0px #4216e7;
  border-radius: 4px;
  font-size: 14px !important;
  border: none !important;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 10px !important;
  background: none !important;
  color: #d1d0d6 !important;
  &:disabled {
    opacity: 0.6;
  }
  svg {
    vertical-align: -5px;
    margin-right: 10px;
  }
`;
export default function ConnectWallet(props: {
  loginSuccess?: (access_token: string) => void;
}) {
  const {
    signinWithMetamask,
    signinWithWalletConnect,
    showMint,
    setShowMint,
    submitMint,
  } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const [loadingWalletConnect, setLoadingWalletConnect] = useState(false);
  async function login() {
    try {
      setLoading(true);
      const access_token = (await signinWithMetamask()) as string;
      if (!access_token) {
        throw new Error('access_token is empty');
      }
      props.loginSuccess && props.loginSuccess(access_token);
      toast.success('login success, this window will close in 3 seconds', {});
    } catch (e: any) {
      console.error(e);
      toast.error('login fail: ' + (e.error?.message || e.message));
    }
    setLoading(false);
  }
  async function loginWithWalletConnect() {
    try {
      setLoadingWalletConnect(true);
      const access_token = (await signinWithWalletConnect()) as string;
      if (!access_token) {
        throw new Error('access_token is empty');
      }
      props.loginSuccess && props.loginSuccess(access_token);
      toast.success('login success, this window will close in 3 seconds', {});
    } catch (e: any) {
      toast.error('login fail: ' + (e.error?.message || e.message));
    }
    setLoadingWalletConnect(false);
  }
  const [minting, setMinting] = useState(false);
  const [did, setDid] = useState('');
  async function mint() {
    setMinting(true);
    const loading = toast.loading('minting, please wait...');
    try {
      await submitMint(did);

      toast.success('mint did success, please login again', {});
      setShowMint(false);
    } catch (e: any) {
      console.log(e);
      toast.error('mint fail: ' + (e.error?.message || e.message));
    }
    toast.dismiss(loading);
    setMinting(false);
  }
  return (
    <>
      {showMint ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              lineHeight: '20px',
              fontSize: '12px',
            }}
          >
            You should first mint a DID NFT to your wallet
          </div>
          <div
            style={{
              lineHeight: '20px',
              fontSize: '12px',
              marginBottom: '20px',
            }}
          >
            then login again
          </div>
          <Input
            labelRight=".pavo.cx"
            placeholder="Input did name"
            labelLeft="https://"
            onChange={(e) => setDid(e.target.value)}
          />
          <ButtonStyle
            onClick={mint}
            disabled={minting}
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            {minting ? 'Minting...' : 'Mint Pavo DID'}
          </ButtonStyle>
        </Box>
      ) : (
        <>
          <ButtonStyle
            onClick={() => {
              // openConnectModal();
              login();
            }}
            disabled={loading}
          >
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.06583 1L10.4925 7.25167L8.92749 3.56333L2.06583 1Z"
                fill="#E17726"
                stroke="#E17726"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.4992 1L13.1492 7.31083L14.6375 3.56333L21.4992 1Z"
                fill="#E27625"
                stroke="#E27625"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.095 15.4925L7.33667 18.9275L2.54 20.2467L1.16917 15.5683L5.095 15.4925Z"
                fill="#E27625"
                stroke="#E27625"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.3875 15.5683L21.025 20.2467L16.2283 18.9275L18.4617 15.4925L22.3875 15.5683Z"
                fill="#E27625"
                stroke="#E27625"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.4908 9.68834L17.8275 11.7108L13.0725 11.9225L13.2333 6.80334L16.4908 9.68834Z"
                fill="#E27625"
                stroke="#E27625"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.07416 9.68831L10.3825 6.74414L10.4925 11.9225L5.73749 11.7108L7.07416 9.68831Z"
                fill="#E27625"
                stroke="#E27625"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.2283 18.9275L13.36 17.5308L15.8308 15.6025L16.2283 18.9275Z"
                fill="#E27625"
                stroke="#E27625"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.205 17.5308L7.33665 18.9275L7.73415 15.6025L10.205 17.5308Z"
                fill="#E27625"
                stroke="#E27625"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.33665 18.9275L10.205 17.5308L9.97665 19.4008L10.0017 20.1875L7.33665 18.9275Z"
                fill="#D5BFB2"
                stroke="#D5BFB2"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.2283 18.9275L13.5633 20.1875L13.58 19.4008L13.36 17.5308L16.2283 18.9275Z"
                fill="#D5BFB2"
                stroke="#D5BFB2"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.5125 14.3667L15.8983 13.665L14.215 12.895L13.5125 14.3667Z"
                fill="#233447"
                stroke="#233447"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0525 14.3667L9.34999 12.895L7.65832 13.665L10.0525 14.3667Z"
                fill="#233447"
                stroke="#233447"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.2283 18.9275L15.8142 15.4925L18.4617 15.5683L16.2283 18.9275Z"
                fill="#CC6228"
                stroke="#CC6228"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.75082 15.4925L7.33666 18.9275L5.09499 15.5683L7.75082 15.4925Z"
                fill="#CC6228"
                stroke="#CC6228"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.73749 11.7108L10.4925 11.9225L10.0525 14.3666L9.34999 12.895L7.65833 13.665L5.73749 11.7108Z"
                fill="#CC6228"
                stroke="#CC6228"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8983 13.665L14.215 12.895L13.5125 14.3666L13.0725 11.9225L17.8275 11.7108L15.8983 13.665Z"
                fill="#CC6228"
                stroke="#CC6228"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.8275 11.7108L15.8308 15.6025L15.8983 13.665L17.8275 11.7108Z"
                fill="#E27525"
                stroke="#E27525"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.65833 13.665L7.73416 15.6025L5.7375 11.7108L7.65833 13.665Z"
                fill="#E27525"
                stroke="#E27525"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.0725 11.9225L13.5125 14.3667L12.9541 17.2517L12.8358 13.4533L13.0725 11.9225Z"
                fill="#E27525"
                stroke="#E27525"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.4925 11.9225L10.7208 13.445L10.6108 17.2517L10.0525 14.3667L10.4925 11.9225Z"
                fill="#E27525"
                stroke="#E27525"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0525 14.3666L10.6108 17.2516L10.205 17.5308L7.73417 15.6025L7.65834 13.665L10.0525 14.3666Z"
                fill="#F5841F"
                stroke="#F5841F"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8983 13.665L15.8308 15.6025L13.36 17.5308L12.9541 17.2516L13.5125 14.3666L15.8983 13.665Z"
                fill="#F5841F"
                stroke="#F5841F"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0017 20.1875L9.97666 19.4008L10.1875 19.215H13.3775L13.58 19.4008L13.5633 20.1875L16.2283 18.9275L15.2975 19.6883L13.4025 21H10.1625L8.2675 19.6883L7.33667 18.9275L10.0017 20.1875Z"
                fill="#C0AC9D"
                stroke="#C0AC9D"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.205 17.5308L10.6108 17.2516H12.9542L13.36 17.5308L13.58 19.4008L13.3775 19.215H10.1875L9.97665 19.4008L10.205 17.5308Z"
                fill="#161616"
                stroke="#161616"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.71082 7.65833L0.999985 4.20667L2.06582 1L10.205 7.04083L7.07415 9.68833L2.64999 10.9833L1.67665 9.84083L2.09999 9.53667L1.42332 8.91833L1.93915 8.5125L1.26248 7.99667L1.71082 7.65833Z"
                fill="#763E1A"
                stroke="#763E1A"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.565 4.20667L21.8458 7.65833L22.3025 7.99667L21.6258 8.5125L22.1417 8.91833L21.465 9.53667L21.8883 9.84083L20.915 10.9833L16.4908 9.68833L13.36 7.04083L21.4992 1L22.565 4.20667Z"
                fill="#763E1A"
                stroke="#763E1A"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.65 10.9834L7.07416 9.68835L5.7375 11.7109L7.73416 15.6025L5.095 15.5684H1.16916L2.65 10.9834Z"
                fill="#F5841F"
                stroke="#F5841F"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.4908 9.68835L20.915 10.9834L22.3875 15.5684H18.4617L15.8308 15.6025L17.8275 11.7109L16.4908 9.68835Z"
                fill="#F5841F"
                stroke="#F5841F"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.4925 11.9225L10.205 7.04085L8.92751 3.56335H14.6375L13.36 7.04085L13.0725 11.9225L12.9625 13.4617L12.9542 17.2517H10.6108L10.6025 13.4617L10.4925 11.9225Z"
                fill="#F5841F"
                stroke="#F5841F"
                strokeWidth="0.0833333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            {loading ? 'Connecting...' : 'Connect with MetaMask'}
          </ButtonStyle>
          <ButtonStyleSec
            onClick={() => {
              loginWithWalletConnect();
            }}
            disabled={loadingWalletConnect}
          >
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect y="0.5" width="24" height="15" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_903_3017"
                    transform="translate(-0.00675676) scale(0.00337838 0.00540541)"
                  />
                </pattern>
                <image
                  id="image0_903_3017"
                  width="300"
                  height="185"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>

            {loadingWalletConnect ? 'Connecting...' : 'With WalletConnect'}
          </ButtonStyleSec>
        </>
      )}
    </>
  );
}
