import "tailwindcss/tailwind.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { CustomAppProps } from "next/app";
import { memo } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [chain.goerli, chain.kovan] : []),
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
const App = memo((props: CustomAppProps) => {
  const getLayout =
    props.Component.getLayout ||
    ((page) => {
      return page;
    });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <>{getLayout(<props.Component {...props.pageProps} />)}</>
      </RainbowKitProvider>
    </WagmiConfig>
  );
});

export default App;

App.displayName = "App";
