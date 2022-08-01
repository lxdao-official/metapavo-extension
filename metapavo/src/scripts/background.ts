// eslint-disable-next-line no-console
console.log("background script");

export {};

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

// (async function () {
//   let gas = await getNowGas();
//   //@ts-ignore
//   chrome.action.setBadgeText({
//     text: gas.toString(),
//   });
//   chrome.action.setBadgeBackgroundColor({
//     color: "#21d4fd",
//   });
// })();

// setInterval(async () => {
//   let gas = await getNowGas();
//   //@ts-ignore
//   chrome.action.setBadgeText({
//     text: gas.toString(),
//   });
// }, 5000);
