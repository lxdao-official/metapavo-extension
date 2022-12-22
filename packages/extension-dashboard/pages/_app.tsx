// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
// 1. Import `createTheme`
import { Text, createTheme } from '@nextui-org/react';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import useUser, { UserContext } from '../context/useUser';
import '../styles/globals.css';

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

// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      secondary: '#9f50ff',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      5: '500',
      10: '1000',
      max: '1000000000000',
    },
    space: {},
    fonts: {},
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const userinfo = useUser();
  return (
    <NextUIProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} initialChain={chain.polygon}>
          <UserContext.Provider value={userinfo}>
            <>
              <Component {...pageProps} />{' '}
              <Toaster containerStyle={{ zIndex: 1000000000000 }} />
            </>
          </UserContext.Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </NextUIProvider>
  );
}

export default MyApp;
