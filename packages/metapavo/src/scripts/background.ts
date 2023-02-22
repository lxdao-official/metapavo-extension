import { getNowGas } from '../utils/getGas';
import { getTokenPrice } from '../utils/getTokenPrice';

// eslint-disable-next-line no-console

export {};
let nowGas = 0;

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

chrome?.runtime?.onMessage.addListener(function (
  request,
  sender,
  sendResponse,
) {
  if (request.cmd === 'getGas')
    sendResponse({
      value: nowGas,
      type: 'GAS',
      cmd: 'getGas',
    });

  if (request.cmd === 'tokenPrice') {
    (async () => {
      const price = await getTokenPrice(request.symbol);
      sendMessageToContentScript(
        {
          type: 'token_price_update',
          data: {
            symbol: request.symbol,
            price: price,
          },
        },
        () => {},
      );
    })();
  }
  if (request.cmd === 'open_login') {
    chrome.tabs.create({
      url: 'login.html',
    });
  }
  if (request.cmd === 'refresh_gas') {
    repeat();
  }
});
async function repeatGasRequest() {
  let gas = await getNowGas();
  nowGas = gas;
  sendMessageToContentScript(
    { cmd: 'gasUpdate', value: gas, type: 'GAS' },
    function () {
      // console.log("来自content的回复：" + response);
    },
  );
  chrome.action?.setBadgeText({ text: gas.toString() });
}
async function repeatTokenPrice() {
  chrome.storage.local.get(['display_info'], async function (data) {
    if (data.display_info !== 'GAS') {
      let price = await getTokenPrice(data.display_info);
      if (price > 0) {
        sendMessageToContentScript(
          { cmd: 'pavoInfoUpdate', value: price, type: data.display_info },
          function () {
            // console.log("来自content的回复：" + response);
          },
        );
      }
    }
  });
}
async function repeat() {
  repeatGasRequest();
  repeatTokenPrice();

  setTimeout(() => {
    repeat();
  }, 5000);
}
repeat();

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: 'dashboard/index.html',
  });
});

chrome.storage.local.get(['isFirst'], async function (data) {
  if (!data.isFirst) {
    chrome.tabs.create({
      url: 'dashboard/index.html',
    });
    chrome.storage.local.set({ isFirst: true });
  }
});
