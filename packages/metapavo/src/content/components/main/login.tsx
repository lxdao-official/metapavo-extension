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
  const mainImage = chrome.runtime.getURL("images/main.jpg");
  return (
    <WalletContext.Consumer>
      {(context) => {
        return (
          <div style={{}}>
            <img src={mainImage} alt="" style={{ width: "100%", height: "444px" }} />
            <div style={{ marginTop: "100px", width: "100%", textAlign: "center" }}>
              {/* {context.loginedAddress ? <div>{context.loginedAddress}</div> : <ConnectWallet />} */}
              <ConnectWallet />
            </div>
          </div>
        );
      }}
    </WalletContext.Consumer>
  );
};

export default IndexPage;
