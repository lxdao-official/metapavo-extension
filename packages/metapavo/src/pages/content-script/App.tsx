import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';

import Ball from './components/pavo-ball/ball';
import SearchWrapper from './components/search/SearchWrapper';
import useGlobal, { GlobalContext } from './context/useGlobal';
import useWallet, { WalletContext } from './context/useWallet';
// import './scripts/tag';

const rootElement = document.createElement('div');
rootElement.id = 'metapavo-root';
Object.assign(rootElement.style, {
  position: 'absolute',
  width: 0,
  height: 0,
  right: 0,
  bottom: 0,
  zIndex: 100000000000,
});
document.body.appendChild(rootElement);
rootElement.addEventListener('click', (e) => {
  e.stopPropagation();
});
const style = document.createElement('style');
style.innerText = `
@import url('https://rsms.me/inter/inter.css');
#metapavo-root *{
  box-sizing: border-box;
  font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
}
#metapavo-root svg{
  margin-bottom:auto;
  margin-top:auto;
}
.metapavo-label{
  font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
  font-size: 12px !important;
  color: #fff !important;
  background-image: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%) !important;
  padding: 0px 4px !important;
  border-radius: 3px !important;
  transform-origin: left bottom !important;
  transform: scale(0.9) translate(0px, 1px) !important;
  max-width: 100px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display:inline-block !important;
  margin-left: 4px !important;
  line-height: 1.2 !important;
}
`;

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          // overrides tooltip
        },
        popper: {
          // overrides the popper
          zIndex: 7000000000000000 + '!important',
        },
      },
    },
  },
});
document.body.appendChild(style);

function Root() {
  const useG = useGlobal();
  const wallet = useWallet();

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={useG}>
        <WalletContext.Provider value={wallet}>
          <Ball />
          <SearchWrapper />
        </WalletContext.Provider>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
    <Toaster containerStyle={{ zIndex: 1000000000000 }} />
  </React.StrictMode>,
  rootElement,
);
