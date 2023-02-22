import { NextUIProvider, createTheme } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

import useWallet, { WalletContext } from '../content-script/context/useWallet';
import SingleLoginPage from './comps/SingleLoginPage';

const rootElement = document.createElement('div');
rootElement.id = 'metapavo-login';

document.body.appendChild(rootElement);
document.body.style.margin = '0';

const style = document.createElement('style');
style.innerText = `
@import url('https://rsms.me/inter/inter.css');
#metapavo-login *{
  font-family:'Montserrat', "Inter", Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
}
`;
document.body.appendChild(style);
const RootElement = styled.div`
  width: 100%;
`;

// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      secondary: '#9f50ff',
    },
    space: {},
    fonts: {},
  },
});
function Root() {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      <SingleLoginPage />
    </WalletContext.Provider>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <NextUIProvider theme={theme}>
      <RootElement>
        <Root />
        <Toaster />
      </RootElement>
    </NextUIProvider>
  </React.StrictMode>,
  rootElement,
);
