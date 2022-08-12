import { useEffect } from "react";
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
    <div style={{ padding: "10px", width: "450px", height: "450px" }}>
      <ConnectWallet />
    </div>
  );
};

export default IndexPage;
