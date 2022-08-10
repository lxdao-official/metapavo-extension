import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import createMetaMaskProvider from "metamask-extension-provider";

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
  async function signin() {
    const maskProvider = createMetaMaskProvider();
    const addresses = (await maskProvider.request({
      method: "eth_requestAccounts",
    })) as string[];
    const address = addresses[0];
    const data = await fetch("http://localhost:8080/users/nonce/" + address, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await data.json();
    const nonce = json.data.nonce;
    const message = json.data.signature_message;
    console.log(address, nonce, message);
    const signature = await maskProvider.request({
      method: "personal_sign",
      params: [address, message],
    });
    const data2 = await fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        address: address,
        signature: signature,
      }),
    });
    const json2 = await data2.json();
    console.log(json2);
    if (json2.success) {
      alert("signin success");
      const access_token = json2.data.access_token;
      localStorage.setItem("access_token", access_token);
      getUserInfo();
    }
  }

  function getUserInfo() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      fetch("http://localhost:8080/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
        .then((data) => data.json())
        .then((json) => {
          console.log(json);
        });
    }
  }
  useEffect(() => {}, []);
  return (
    <div style={{ padding: "10px", width: "450px", height: "450px" }}>
      <button
        onClick={() => {
          signin();
        }}
      >
        signin
      </button>
    </div>
  );
};

export default IndexPage;
