import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from '../common/theme';
import { ConfirmDialogProvider } from 'react-mui-confirm';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import useWallet, { WalletContext } from '../common/useWallet';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Card3',
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
      <RainbowKitProvider chains={chains} initialChain={chain.polygon}>
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
