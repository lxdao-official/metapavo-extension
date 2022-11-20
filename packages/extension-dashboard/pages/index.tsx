import { NoSsr } from '@mui/material';
import { colorfulTextStyle } from 'extension-common/src/common-colorful-button';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { useEnsName } from 'wagmi';

import { UserContext } from '../context/useUser';
import styles from '../styles/Home.module.css';

const IndexComponent = dynamic(() => import('../components/pages/Index'), {
  ssr: false,
});

const AddressButton = styled.span`
  ${colorfulTextStyle}
  margin-right:20px;
  font-weight: 600;
`;
function AddressSPAN(props: { address: string }) {
  const { data, isError, isLoading } = useEnsName({
    address: props.address as `0x${string}`,
  });

  if (isLoading) return <AddressButton>{props.address}</AddressButton>;
  if (isError) return <AddressButton>{props.address}</AddressButton>;
  return <AddressButton>{data || props.address}</AddressButton>;
}

const Home: NextPage = () => {
  const { user, logout, fetchLoginInfo } = useContext(UserContext);

  async function _logout() {
    logout();
    window.location.reload();
  }
  async function gotoLogin() {
    chrome.tabs.create({
      url: chrome.runtime.getURL('login.html'),
    });
  }
  const [logoURL, setLogoURL] = useState<string>();
  const [indexLogoURL, setIndexLogoURL] = useState<string>();
  useEffect(() => {
    fetchLoginInfo();
    const _logoURL = chrome?.runtime?.getURL('images/logo-128.png');
    setLogoURL(_logoURL);
    const _indexLogoURL = chrome?.runtime?.getURL('images/index-logo-2.png');
    setIndexLogoURL(_indexLogoURL);

    chrome?.runtime?.onMessage.addListener(function (
      request,
      sender,
      sendResponse,
    ) {
      if (request.cmd === 'login_success') {
        window.location.reload();
      }
    });
  }, []);

  return (
    <NoSsr>
      <div className={styles.container}>
        <Head>
          <title>MetaPavo Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href={logoURL} />
        </Head>
        <header className={styles.head}>
          <div className={styles.headInner}>
            <img src={indexLogoURL} style={{ height: '25px' }} />
            {user?.address ? (
              <span>
                <AddressSPAN address={user.address} />
                <a
                  onClick={() => {
                    _logout();
                  }}
                >
                  Logout
                </a>
              </span>
            ) : (
              <a
                onClick={() => {
                  gotoLogin();
                }}
              >
                Login
              </a>
            )}
          </div>
        </header>
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <IndexComponent />
          </DndProvider>
        </main>
      </div>
    </NoSsr>
  );
};

export default Home;
