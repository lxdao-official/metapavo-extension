import { useEffect } from "react";
import { WalletContext } from "../../context/useWallet";
import ConnectWallet from "../wallet/ConnectWallet";
// import createMetaMaskProvider from "metamask-extension-provider";

// chrome APIを使用するためdynamic importし、browser側でのみ読み込まれるようにする
// const Button = dynamic(
//   async () => {
//     const module = await import("src/components/Button");
//     return module.Button;
//   },
//   {
//     ssr: false,
//     loading: () => {
//       return <div className="w-10 h-4 bg-gray-100 rounded border animate-pulse"></div>;
//     },
//   },
// );

const IndexPage = () => {
  useEffect(() => {}, []);
  return (
    <WalletContext.Consumer>
      {(context) => {
        return (
          <div style={{ display: "flex", alignContent: "center" }}>
            <div style={{ padding: "10px", width: "450px", height: "450px", textAlign: "center" }}>
              {context.loginedAddress ? <div>{context.loginedAddress}</div> : <ConnectWallet />}
            </div>
          </div>
        );
      }}
    </WalletContext.Consumer>
  );
};

export default IndexPage;
