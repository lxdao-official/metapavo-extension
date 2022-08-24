import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import createMetaMaskProvider from "metamask-extension-provider";
import ConnectWallet from "./ConnectWallet";

const { chains, provider } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC" }), publicProvider()],
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      wallet.rainbow({ chains }),
      wallet.walletConnect({ chains }),
      wallet.metaMask({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const rootElement = document.createElement("div");
// Object.assign(rootElement.style, {
//   position: "absolute",
//   width: 0,
//   height: 0,
//   right: 0,
//   bottom: 0,
//   zIndex: 100000,
// });
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);

function Root() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectWallet />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Root />
    </SnackbarProvider>
  </React.StrictMode>,
);
