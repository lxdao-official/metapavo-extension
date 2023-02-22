import { ThemeProvider } from '@mui/material/styles';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import { ConfirmDialogProvider } from 'react-mui-confirm';
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import getTheme from '../common/theme';
import useWallet, { WalletContext } from '../common/useWallet';
import '../styles/globals.css';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [infuraProvider({ apiKey: process.env.INFURA_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'MetaPavo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const wallet = useWallet();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <WalletContext.Provider value={wallet}>
          <ThemeProvider theme={getTheme('light')}>
            <ConfirmDialogProvider>
              <Component {...pageProps} />
            </ConfirmDialogProvider>
          </ThemeProvider>
        </WalletContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
