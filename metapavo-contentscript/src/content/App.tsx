import React, { useEffect } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
const transform = keyframes`
  0%,
  100% {
    border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  }
  14% {
    border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
  }
  28% {
    border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
  }
  42% {
    border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
  }
  56% {
    border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
  }
  70% {
    border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
  }
  84% {
    border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
  }
 `;
const movement = keyframes`
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: translateY(5%) rotateY(10deg);
  }
  `;
const RootElement = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  color: #fff;
  z-index: 99999;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  width: 50px;
  justify-content: center;
  height: 50px;
  cursor: pointer;
  --background: rgb(96, 93, 236);
  --blob: #fdfbfd;
  --shades: inset 10px 0 40px #b721ff, inset -10px 0 20px #21d4fd, inset -40px 10px 100px #3551fd;

  ::before {
    content: "";
    display: block;
    min-height: 50px;
    min-width: 50px;
    background-color: var(--blob);
    box-shadow: var(--shades), 0 0 5px rgba(0, 0, 0, 0.4);
    background-size: 1600% 1600%;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;

    perspective: 1000px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    -webkit-animation: ${transform} 10s ease-in-out infinite both alternate,
      ${movement} 10s ease-in-out infinite both;
    animation: ${transform} 10s ease-in-out infinite both alternate,
      ${movement} 10s ease-in-out infinite both;
  }
`;
async function getNowGas() {
  let nowGas = 0;
  const r3 = await fetch(
    "https://app.defisaver.com/api/gas-price/1559/current",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const json3 = await r3.json();
  if (json3.blockPrices && json3.blockPrices.length && json3.blockPrices[0].baseFeePerGas) {
    nowGas = Math.floor(json3.blockPrices[0].baseFeePerGas);
  }
  return nowGas;
}

function App() {
  const [gas, setGas] = React.useState(0);
  useEffect(() => {
    (async function () {
      let gas = await getNowGas();
      setGas(gas);
    })();

    setInterval(async () => {
      let gas = await getNowGas();
      setGas(gas);
    }, 5000);
  }, []);
  return (
    <RootElement id="web3helper-box" className="web3-spin" title="Drag to move">
      <div id="web3helper-gas-text">{gas}</div>
      <div id="web3helper-box-layer2"></div>
    </RootElement>
  );
}

export default App;
