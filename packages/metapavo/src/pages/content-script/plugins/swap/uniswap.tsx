import { Currency, Field, SwapWidget } from "uniswap-widgets-for-extension";
import "uniswap-widgets-for-extension/fonts.css";
import { useContext, useEffect, useState } from "react";
import { HeadReturn } from "../common/HeadReturn";
import { tokenList } from "./tokenList";
import { WalletContext } from "../../context/useWallet";

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
  console.log("Uniswap");
  useEffect(() => {
    init();
    console.log("uniswap init");
  }, []);
  const [defaultInputToken, setDefaultInputToken] = useState<Currency | undefined>(undefined);
  const [defaultOutputToken, setDefaultOutputToken] = useState<Currency | undefined>(undefined);
  const [defaultInputAmount, setDefaultInputAmount] = useState<string | undefined>("");
  const [defaultOutputAmount, setDefaultOutputAmount] = useState<string | undefined>("");
  return (
    <div className="uniswap" style={{ padding: "10px 20px" }}>
      <HeadReturn title="swap" />
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
            // defaultInputTokenAddress={defaultInputToken?.isToken ? defaultInputToken.address : ""}
            // defaultOutputTokenAddress={
            //   defaultOutputToken?.isToken ? defaultOutputToken.address : ""
            // }
            // defaultOutputAmount={defaultOutputAmount}
            // defaultInputAmount={defaultInputAmount}
            // onTokenChange={(field, token) => {
            //   if (token.isToken) {
            //     if (field === Field.INPUT) {
            //       setDefaultInputToken(token);
            //     } else {
            //       setDefaultOutputToken(token);
            //     }
            //   }
            // }}
            // onAmountChange={(field, amount) => {
            //   if (field === Field.INPUT) {
            //     setDefaultInputAmount(amount);
            //   } else {
            //     setDefaultOutputAmount(amount);
            //   }
            // }}
            // onSwitchTokens={() => {
            //   const token = defaultInputToken;
            //   setDefaultInputToken(defaultOutputToken);
            //   setDefaultOutputToken(token);
            // }}
            jsonRpcUrlMap={{
              1: "https://mainnet.infura.io/v3/f4dd6db18a6f4ea98151892c0fa8e074",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Uniswap;
