import { Button } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useEnsName } from 'wagmi';

import styles from '../styles/Home.module.css';
import { users } from '../utils/apis';
import { fetchWrapped } from '../utils/apis/fetch';

function AddressSPAN(props: { address: string }) {
  const { data, isError, isLoading } = useEnsName({
    address: props.address as `0x${string}`,
  });

  if (isLoading) return <span>{props.address}</span>;
  if (isError) return <span>{props.address}</span>;
  return <span>{data}</span>;
}
const Home: NextPage = () => {
  const [userInfo, setUserInfo] = useState<users>();

  async function fetchLoginInfo() {
    return new Promise((resolve, reject) => {
      fetchWrapped(process.env.NEXT_PUBLIC_APIBASE + '/users/me', {
        method: 'GET',
      })
        .then((json) => {
          if (json?.data?.address) {
            setUserInfo(json.data);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }
  async function logout() {
    chrome.storage.local.set({ access_token: '' }, function () {});
    gotoLogin();
  }
  async function gotoLogin() {
    chrome.tabs.create({
      url: chrome.runtime.getURL('login.html'),
    });
  }
  useEffect(() => {
    fetchLoginInfo();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <head className={styles.head}>
        {userInfo?.address ? (
          <>
            <AddressSPAN address={userInfo.address} />
            <Button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              gotoLogin();
            }}
          >
            Login
          </Button>
        )}
      </head>
      <main className={styles.main}>
        <div>dashboard</div>
      </main>
    </div>
  );
};

export default Home;
