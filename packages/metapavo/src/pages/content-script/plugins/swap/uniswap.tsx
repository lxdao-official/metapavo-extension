import { Currency, Field, SwapWidget } from "uniswap-widgets-for-extension";
import "uniswap-widgets-for-extension/fonts.css";
import { useContext, useEffect, useState } from "react";
import { HeadReturn } from "../common/HeadReturn";
import { tokenList } from "./tokenList";
import { WalletContext } from "../../context/useWallet";
import { PageContainer as PageContainer } from "../styleCom";
import { getLang } from "../../../../utils/lang";

const Uniswap = () => {
  const wallet = useContext(WalletContext);
  const maskProvider = wallet.maskProvider;
  const init = async () => {
    try {
      const address = (await maskProvider?.request({
        method: "eth_requestAccounts",
      })) as string[];
      console.log("address", address);
    } catch (e: any) {
      console.error(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <PageContainer>
      <HeadReturn title={getLang("Swap")} />
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div style={{ transform: "scale(0.9)" }}>
          <SwapWidget
            provider={maskProvider}
            width="300"
            defaultChainId={1}
            tokenList={tokenList}
            jsonRpcUrlMap={{
              1: "https://mainnet.infura.io/v3/f4dd6db18a6f4ea98151892c0fa8e074",
            }}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Uniswap;
