import { Tooltip } from '@mui/material';
import { getLang } from 'extension-common/src/lang';
import { useEffect } from 'react';
import styled from 'styled-components';

import ConnectWallet from './ConnectWallet';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
`;
const index_logo = chrome.runtime.getURL('images/index-logo.png');
const Banner = styled.img``;
const MainBody = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 379px;
  margin: 0 auto;
`;
const DescText = styled.div`
  width: 379px;
  margin: 10px auto;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  /* or 142% */

  display: flex;
  align-items: flex-end;
  text-align: center;

  color: #9e9aaf;
`;
const TitleText = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  width: 379px;
  text-align: center;
  margin: 20px auto;
  display: flex;
  width: 263px;
  margin: 35.5px auto 34.8px auto;
  align-items: center;
`;
const ButtonContainer = styled.div`
      display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:110px;
}
`;

const SecurityLink = styled.a`
  diplsay: block;
  text-align: center;
  text-decoration: underline;

  font-weight: 400;
  font-size: 14px;
  color: #000000;
  margin-top: 70px;
`;

const SingleLoginPage = () => {
  useEffect(() => {}, []);
  const mainImage = chrome.runtime.getURL('images/login-banner-2.jpg');
  return (
    <Page>
      <div
        style={{
          flex: 1,
          height: '100vh',
          background: `url(${mainImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
        }}
      />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          position: 'relative',
          zIndex: 100,
          height: '100vh',
          width: '479px',
          // background: 'rgba(255, 255, 255, 0.8)',
          // backdropFilter: 'blur(2px)',
        }}
      >
        <MainBody>
          <TitleText>
            <img src={index_logo} alt="" style={{ width: '263px' }} />
          </TitleText>
          <DescText>{getLang('LoginDesc')}</DescText>
          <ButtonContainer>
            <ConnectWallet
              loginSuccess={() => {
                setTimeout(() => window.close(), 2000);
                chrome.runtime.sendMessage({
                  cmd: 'login_success',
                });
              }}
            />
          </ButtonContainer>
          <Tooltip title={getLang('security_desc')}>
            <SecurityLink
              href="https://www.notion.so/lxdao/User-Security-Manual-fda56105aa4a4960932f854a7f907f9f"
              target={'_blank'}
            >
              {getLang('User_Security_Manual')}
            </SecurityLink>
          </Tooltip>
        </MainBody>
      </div>
    </Page>
  );
};

export default SingleLoginPage;
