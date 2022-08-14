// eslint-disable-next-line no-console
console.log("background script");

export {};
let nowGas = 0;
async function getNowGas() {
  let _nowGas = 0;
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
    _nowGas = Math.floor(json3.blockPrices[0].baseFeePerGas);
  }
  return _nowGas;
}
function sendMessageToContentScript(message: any, callback: any) {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab: any) => {
      chrome.tabs.sendMessage(tab.id, message, function (response) {
        if (!chrome.runtime.lastError) {
          if (callback) callback(response);
        } else {
          console.log(chrome.runtime.lastError.message);
        }
      });
    });
  });
}
chrome?.runtime?.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd === "getGas") sendResponse(nowGas);
});
// (async function () {
//   let gas = await getNowGas();
//   if (gas > 0) {
//     sendMessageToContentScript({ cmd: "gasUpdate", value: gas }, function () {
//       // console.log("来自content的回复：" + response);
//     });
//   }
// })();
let timer: any = null;
async function repeat() {
  let gas = await getNowGas();
  if (gas > 0) {
    sendMessageToContentScript({ cmd: "gasUpdate", value: gas }, function () {
      // console.log("来自content的回复：" + response);
    });
    nowGas = gas;
  }
}
repeat();
chrome.alarms.create({ delayInMinutes: 0.2 });

chrome.alarms.onAlarm.addListener(async () => {
  repeat();
  chrome.alarms.create({ delayInMinutes: 0.2 });
});
