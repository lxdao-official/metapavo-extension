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
function sendMessageToContentScript(message: any, callback: any) {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab: any) => {
      chrome.tabs.sendMessage(tab.id, message, function (response) {
        if (callback) callback(response);
      });
    });
  });
}
(async function () {
  let gas = await getNowGas();
  if (gas > 0) {
    sendMessageToContentScript({ cmd: "gasUpdate", value: gas }, function () {
      // console.log("来自content的回复：" + response);
    });
  }
})();

setInterval(async () => {
  let gas = await getNowGas();
  if (gas > 0) {
    sendMessageToContentScript({ cmd: "gasUpdate", value: gas }, function () {
      // console.log("来自content的回复：" + response);
    });
  }
}, 5000);
