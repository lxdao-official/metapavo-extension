import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
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
  async function signin() {
    const maskProvider = window.ethereum as any;
    const addresses = (await maskProvider?.request({
      method: "eth_requestAccounts",
    })) as string[];
    const address = addresses[0];
    const data = await fetch("https://web3helper.herokuapp.com/users/nonce/" + address, {
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

    const signature = (await maskProvider?.request({
      method: "personal_sign",
      params: [address, message],
    })) as string;
    const data2 = await fetch("https://web3helper.herokuapp.com/auth/signin", {
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
      fetch("https://web3helper.herokuapp.com/users/me", {
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
        <svg
          width="202"
          height="37"
          viewBox="0 0 202 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_416_2558)">
            <rect
              width="202"
              height="37"
              rx="4"
              fill="url(#paint0_linear_416_2558)"
              shape-rendering="crispEdges"
            />
            <path
              d="M46.6667 15.1667H46V14.5C46 13.9696 45.7893 13.4609 45.4142 13.0858C45.0391 12.7107 44.5304 12.5 44 12.5H37.3333C36.8029 12.5 36.2942 12.7107 35.9191 13.0858C35.544 13.4609 35.3333 13.9696 35.3333 14.5V22.5C35.3333 23.0304 35.544 23.5391 35.9191 23.9142C36.2942 24.2893 36.8029 24.5 37.3333 24.5H46.6667C47.1971 24.5 47.7058 24.2893 48.0809 23.9142C48.456 23.5391 48.6667 23.0304 48.6667 22.5V17.1667C48.6667 16.6362 48.456 16.1275 48.0809 15.7525C47.7058 15.3774 47.1971 15.1667 46.6667 15.1667ZM37.3333 13.8333H44C44.1768 13.8333 44.3464 13.9036 44.4714 14.0286C44.5964 14.1536 44.6667 14.3232 44.6667 14.5V15.1667H37.3333C37.1565 15.1667 36.987 15.0964 36.8619 14.9714C36.7369 14.8464 36.6667 14.6768 36.6667 14.5C36.6667 14.3232 36.7369 14.1536 36.8619 14.0286C36.987 13.9036 37.1565 13.8333 37.3333 13.8333ZM47.3333 20.5H46.6667C46.4899 20.5 46.3203 20.4298 46.1953 20.3047C46.0702 20.1797 46 20.0101 46 19.8333C46 19.6565 46.0702 19.487 46.1953 19.3619C46.3203 19.2369 46.4899 19.1667 46.6667 19.1667H47.3333V20.5ZM47.3333 17.8333H46.6667C46.1362 17.8333 45.6275 18.044 45.2525 18.4191C44.8774 18.7942 44.6667 19.3029 44.6667 19.8333C44.6667 20.3638 44.8774 20.8725 45.2525 21.2475C45.6275 21.6226 46.1362 21.8333 46.6667 21.8333H47.3333V22.5C47.3333 22.6768 47.2631 22.8464 47.1381 22.9714C47.013 23.0964 46.8435 23.1667 46.6667 23.1667H37.3333C37.1565 23.1667 36.987 23.0964 36.8619 22.9714C36.7369 22.8464 36.6667 22.6768 36.6667 22.5V16.3867C36.8808 16.462 37.1063 16.5003 37.3333 16.5H46.6667C46.8435 16.5 47.013 16.5702 47.1381 16.6953C47.2631 16.8203 47.3333 16.9899 47.3333 17.1667V17.8333Z"
              fill="white"
            />
            <path
              d="M66.8686 17.3828H64.6911C64.6513 17.1011 64.5701 16.8509 64.4474 16.6321C64.3248 16.41 64.1674 16.2211 63.9751 16.0653C63.7829 15.9096 63.5608 15.7902 63.3089 15.7074C63.0604 15.6245 62.7902 15.5831 62.4986 15.5831C61.9716 15.5831 61.5125 15.714 61.1214 15.9759C60.7304 16.2344 60.4271 16.6122 60.2116 17.1094C59.9962 17.6032 59.8885 18.2031 59.8885 18.9091C59.8885 19.6349 59.9962 20.2448 60.2116 20.7386C60.4304 21.2325 60.7353 21.6054 61.1264 21.8572C61.5175 22.1091 61.9699 22.2351 62.4837 22.2351C62.772 22.2351 63.0388 22.197 63.2841 22.1207C63.5327 22.0445 63.7531 21.9335 63.9453 21.7876C64.1375 21.6385 64.2966 21.4579 64.4226 21.2457C64.5518 21.0336 64.6413 20.7917 64.6911 20.5199L66.8686 20.5298C66.8123 20.9972 66.6714 21.4479 66.446 21.8821C66.224 22.313 65.924 22.6991 65.5462 23.0405C65.1716 23.3786 64.7242 23.647 64.2038 23.8459C63.6868 24.0414 63.1018 24.1392 62.4489 24.1392C61.5407 24.1392 60.7287 23.9337 60.0128 23.5227C59.3002 23.1117 58.7367 22.5168 58.3224 21.7379C57.9115 20.959 57.706 20.0161 57.706 18.9091C57.706 17.7988 57.9148 16.8542 58.3324 16.0753C58.75 15.2964 59.3168 14.7031 60.0327 14.2955C60.7486 13.8845 61.554 13.679 62.4489 13.679C63.0388 13.679 63.5857 13.7618 64.0895 13.9276C64.5966 14.0933 65.0457 14.3352 65.4368 14.6534C65.8279 14.9683 66.1461 15.3544 66.3913 15.8118C66.6399 16.2692 66.799 16.7929 66.8686 17.3828ZM71.8228 24.1491C71.0505 24.1491 70.3827 23.9851 69.8192 23.657C69.2591 23.3255 68.8266 22.8648 68.5217 22.2749C68.2167 21.6816 68.0643 20.9938 68.0643 20.2116C68.0643 19.4228 68.2167 18.7334 68.5217 18.1435C68.8266 17.5502 69.2591 17.0895 69.8192 16.7614C70.3827 16.4299 71.0505 16.2642 71.8228 16.2642C72.5951 16.2642 73.2612 16.4299 73.8214 16.7614C74.3848 17.0895 74.819 17.5502 75.1239 18.1435C75.4289 18.7334 75.5813 19.4228 75.5813 20.2116C75.5813 20.9938 75.4289 21.6816 75.1239 22.2749C74.819 22.8648 74.3848 23.3255 73.8214 23.657C73.2612 23.9851 72.5951 24.1491 71.8228 24.1491ZM71.8327 22.5085C72.1841 22.5085 72.4774 22.4091 72.7127 22.2102C72.948 22.008 73.1254 21.733 73.2447 21.3849C73.3673 21.0369 73.4286 20.6409 73.4286 20.1967C73.4286 19.7526 73.3673 19.3565 73.2447 19.0085C73.1254 18.6605 72.948 18.3854 72.7127 18.1832C72.4774 17.9811 72.1841 17.88 71.8327 17.88C71.4781 17.88 71.1798 17.9811 70.9379 18.1832C70.6992 18.3854 70.5186 18.6605 70.396 19.0085C70.2766 19.3565 70.217 19.7526 70.217 20.1967C70.217 20.6409 70.2766 21.0369 70.396 21.3849C70.5186 21.733 70.6992 22.008 70.9379 22.2102C71.1798 22.4091 71.4781 22.5085 71.8327 22.5085ZM79.0763 19.5852V24H76.9585V16.3636H78.9769V17.7109H79.0664C79.2354 17.2668 79.5188 16.9155 79.9165 16.657C80.3143 16.3951 80.7965 16.2642 81.3633 16.2642C81.8936 16.2642 82.3559 16.3802 82.7504 16.6122C83.1448 16.8442 83.4513 17.1757 83.6701 17.6065C83.8888 18.0341 83.9982 18.5445 83.9982 19.1378V24H81.8803V19.5156C81.8836 19.0483 81.7643 18.6837 81.5224 18.4219C81.2804 18.1567 80.9473 18.0241 80.5231 18.0241C80.238 18.0241 79.9862 18.0855 79.7674 18.2081C79.552 18.3307 79.3829 18.5097 79.2603 18.745C79.141 18.977 79.0797 19.2571 79.0763 19.5852ZM87.7853 19.5852V24H85.6674V16.3636H87.6859V17.7109H87.7754C87.9444 17.2668 88.2278 16.9155 88.6255 16.657C89.0233 16.3951 89.5055 16.2642 90.0723 16.2642C90.6026 16.2642 91.0649 16.3802 91.4593 16.6122C91.8538 16.8442 92.1603 17.1757 92.3791 17.6065C92.5978 18.0341 92.7072 18.5445 92.7072 19.1378V24H90.5893V19.5156C90.5926 19.0483 90.4733 18.6837 90.2314 18.4219C89.9894 18.1567 89.6563 18.0241 89.2321 18.0241C88.947 18.0241 88.6951 18.0855 88.4764 18.2081C88.2609 18.3307 88.0919 18.5097 87.9693 18.745C87.85 18.977 87.7886 19.2571 87.7853 19.5852ZM97.8565 24.1491C97.071 24.1491 96.3949 23.9901 95.8281 23.6719C95.2647 23.3504 94.8305 22.8963 94.5256 22.3097C94.2206 21.7197 94.0682 21.022 94.0682 20.2166C94.0682 19.4311 94.2206 18.7417 94.5256 18.1484C94.8305 17.5552 95.2597 17.0928 95.8132 16.7614C96.37 16.4299 97.023 16.2642 97.772 16.2642C98.2758 16.2642 98.7448 16.3454 99.179 16.5078C99.6165 16.6669 99.9976 16.9072 100.322 17.2287C100.651 17.5502 100.906 17.9545 101.088 18.4418C101.27 18.9257 101.362 19.4924 101.362 20.142V20.7237H94.9134V19.4112H99.3679C99.3679 19.1063 99.3016 18.8362 99.169 18.6009C99.0365 18.3655 98.8525 18.1816 98.6172 18.049C98.3852 17.9131 98.1151 17.8452 97.8068 17.8452C97.4853 17.8452 97.2003 17.9197 96.9517 18.0689C96.7064 18.2147 96.5142 18.4119 96.375 18.6605C96.2358 18.9058 96.1645 19.1792 96.1612 19.4808V20.7287C96.1612 21.1065 96.2308 21.433 96.37 21.7081C96.5125 21.9832 96.7131 22.1953 96.9716 22.3445C97.2301 22.4936 97.5367 22.5682 97.8913 22.5682C98.1267 22.5682 98.3421 22.535 98.5376 22.4688C98.7332 22.4025 98.9006 22.303 99.0398 22.1705C99.179 22.0379 99.285 21.8755 99.358 21.6832L101.317 21.8125C101.217 22.2831 101.013 22.6941 100.705 23.0455C100.4 23.3935 100.006 23.6652 99.522 23.8608C99.0414 24.053 98.4863 24.1491 97.8565 24.1491ZM106.194 24.1491C105.412 24.1491 104.739 23.9834 104.175 23.652C103.615 23.3172 103.184 22.8532 102.883 22.2599C102.585 21.6667 102.435 20.9839 102.435 20.2116C102.435 19.4295 102.586 18.7434 102.888 18.1534C103.193 17.5601 103.625 17.0978 104.185 16.7663C104.746 16.4316 105.412 16.2642 106.184 16.2642C106.85 16.2642 107.433 16.3852 107.934 16.6271C108.434 16.8691 108.83 17.2088 109.122 17.6463C109.414 18.0838 109.575 18.5975 109.604 19.1875H107.606C107.549 18.8063 107.4 18.4998 107.158 18.2678C106.92 18.0324 106.607 17.9148 106.219 17.9148C105.891 17.9148 105.604 18.0043 105.359 18.1832C105.117 18.3589 104.928 18.6158 104.792 18.9538C104.656 19.2919 104.588 19.7012 104.588 20.1818C104.588 20.669 104.654 21.0833 104.787 21.4247C104.923 21.7661 105.113 22.0263 105.359 22.2053C105.604 22.3842 105.891 22.4737 106.219 22.4737C106.461 22.4737 106.678 22.424 106.87 22.3246C107.066 22.2251 107.226 22.081 107.352 21.892C107.482 21.6998 107.566 21.4695 107.606 21.201H109.604C109.571 21.7843 109.412 22.2981 109.127 22.7422C108.845 23.183 108.456 23.5277 107.959 23.7763C107.462 24.0249 106.873 24.1491 106.194 24.1491ZM115.022 16.3636V17.9545H110.423V16.3636H115.022ZM111.468 14.5341H113.585V21.6534C113.585 21.849 113.615 22.0014 113.675 22.1108C113.735 22.2169 113.817 22.2914 113.923 22.3345C114.033 22.3776 114.159 22.3991 114.301 22.3991C114.401 22.3991 114.5 22.3909 114.6 22.3743C114.699 22.3544 114.775 22.3395 114.828 22.3295L115.161 23.9055C115.055 23.9387 114.906 23.9768 114.714 24.0199C114.522 24.0663 114.288 24.0945 114.013 24.1044C113.503 24.1243 113.055 24.0563 112.671 23.9006C112.289 23.7448 111.993 23.5028 111.781 23.1747C111.569 22.8466 111.464 22.4323 111.468 21.9318V14.5341ZM121.974 24L119.06 13.8182H121.412L123.097 20.8928H123.182L125.041 13.8182H127.055L128.909 20.9077H128.999L130.684 13.8182H133.036L130.122 24H128.024L126.085 17.343H126.006L124.072 24H121.974ZM135.505 24.1442C135.018 24.1442 134.584 24.0597 134.203 23.8906C133.821 23.7183 133.52 23.4647 133.298 23.13C133.079 22.7919 132.97 22.371 132.97 21.8672C132.97 21.4429 133.048 21.0866 133.203 20.7983C133.359 20.5099 133.571 20.2779 133.84 20.1023C134.108 19.9266 134.413 19.794 134.754 19.7045C135.099 19.6151 135.46 19.5521 135.838 19.5156C136.282 19.4692 136.64 19.4261 136.912 19.3864C137.184 19.3433 137.381 19.2803 137.504 19.1974C137.626 19.1146 137.688 18.992 137.688 18.8295V18.7997C137.688 18.4848 137.588 18.2412 137.389 18.0689C137.194 17.8965 136.915 17.8104 136.554 17.8104C136.173 17.8104 135.87 17.8949 135.644 18.0639C135.419 18.2296 135.27 18.4384 135.197 18.6903L133.238 18.5312C133.338 18.0672 133.533 17.6662 133.825 17.3281C134.116 16.9867 134.493 16.7249 134.953 16.5426C135.417 16.357 135.954 16.2642 136.564 16.2642C136.988 16.2642 137.394 16.3139 137.782 16.4134C138.173 16.5128 138.52 16.6669 138.821 16.8757C139.126 17.0845 139.366 17.353 139.542 17.6811C139.718 18.0059 139.806 18.3954 139.806 18.8494V24H137.797V22.9411H137.737C137.615 23.1797 137.451 23.3902 137.245 23.5724C137.04 23.7514 136.793 23.8923 136.504 23.995C136.216 24.0945 135.883 24.1442 135.505 24.1442ZM136.112 22.6825C136.423 22.6825 136.698 22.6212 136.937 22.4986C137.176 22.3726 137.363 22.2036 137.499 21.9915C137.635 21.7794 137.703 21.5391 137.703 21.2706V20.4602C137.636 20.5033 137.545 20.5431 137.429 20.5795C137.316 20.6127 137.189 20.6442 137.046 20.674C136.904 20.7005 136.761 20.7254 136.619 20.7486C136.476 20.7685 136.347 20.7867 136.231 20.8033C135.982 20.8397 135.765 20.8977 135.58 20.9773C135.394 21.0568 135.25 21.1645 135.147 21.3004C135.044 21.433 134.993 21.5987 134.993 21.7976C134.993 22.0859 135.097 22.3063 135.306 22.4588C135.518 22.608 135.787 22.6825 136.112 22.6825ZM143.567 13.8182V24H141.449V13.8182H143.567ZM147.381 13.8182V24H145.263V13.8182H147.381ZM152.558 24.1491C151.772 24.1491 151.096 23.9901 150.529 23.6719C149.966 23.3504 149.532 22.8963 149.227 22.3097C148.922 21.7197 148.769 21.022 148.769 20.2166C148.769 19.4311 148.922 18.7417 149.227 18.1484C149.532 17.5552 149.961 17.0928 150.514 16.7614C151.071 16.4299 151.724 16.2642 152.473 16.2642C152.977 16.2642 153.446 16.3454 153.88 16.5078C154.318 16.6669 154.699 16.9072 155.024 17.2287C155.352 17.5502 155.607 17.9545 155.789 18.4418C155.972 18.9257 156.063 19.4924 156.063 20.142V20.7237H149.615V19.4112H154.069C154.069 19.1063 154.003 18.8362 153.87 18.6009C153.738 18.3655 153.554 18.1816 153.318 18.049C153.086 17.9131 152.816 17.8452 152.508 17.8452C152.186 17.8452 151.901 17.9197 151.653 18.0689C151.408 18.2147 151.215 18.4119 151.076 18.6605C150.937 18.9058 150.866 19.1792 150.862 19.4808V20.7287C150.862 21.1065 150.932 21.433 151.071 21.7081C151.214 21.9832 151.414 22.1953 151.673 22.3445C151.931 22.4936 152.238 22.5682 152.593 22.5682C152.828 22.5682 153.043 22.535 153.239 22.4688C153.434 22.4025 153.602 22.303 153.741 22.1705C153.88 22.0379 153.986 21.8755 154.059 21.6832L156.018 21.8125C155.919 22.2831 155.715 22.6941 155.406 23.0455C155.102 23.3935 154.707 23.6652 154.223 23.8608C153.743 24.053 153.187 24.1491 152.558 24.1491ZM161.507 16.3636V17.9545H156.908V16.3636H161.507ZM157.952 14.5341H160.07V21.6534C160.07 21.849 160.1 22.0014 160.159 22.1108C160.219 22.2169 160.302 22.2914 160.408 22.3345C160.517 22.3776 160.643 22.3991 160.786 22.3991C160.885 22.3991 160.985 22.3909 161.084 22.3743C161.183 22.3544 161.26 22.3395 161.313 22.3295L161.646 23.9055C161.54 23.9387 161.391 23.9768 161.198 24.0199C161.006 24.0663 160.772 24.0945 160.497 24.1044C159.987 24.1243 159.539 24.0563 159.155 23.9006C158.774 23.7448 158.477 23.5028 158.265 23.1747C158.053 22.8466 157.949 22.4323 157.952 21.9318V14.5341Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_416_2558"
              x="0"
              y="0"
              width="202"
              height="37"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.259313 0 0 0 0 0.087593 0 0 0 0 0.904309 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_416_2558"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_416_2558"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_416_2558"
              x1="0"
              y1="0"
              x2="198"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#7DE2AC" />
              <stop offset="0.503923" stop-color="#389DFA" />
              <stop offset="1" stop-color="#9F50FF" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default IndexPage;