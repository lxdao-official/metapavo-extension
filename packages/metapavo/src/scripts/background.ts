import {
  addAlarmForUser,
  getUsersAlarms,
  getUsersAlarmsNoLogin,
} from 'extension-common/src/apis/nft_api';

// eslint-disable-next-line no-console

export {};
let nowGas = 0;
async function getNowGas() {
  let _nowGas = 0;
  const r3 = await fetch(
    'https://app.defisaver.com/api/gas-price/1559/current',

    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const json3 = await r3.json();
  if (
    json3.blockPrices &&
    json3.blockPrices.length &&
    json3.blockPrices[0].baseFeePerGas
  ) {
    _nowGas = Math.floor(json3.blockPrices[0].baseFeePerGas);
  }
  return _nowGas;
}
async function getTokenPrice(symbol: string) {
  nowGas = 0;
  const r3 = await fetch(
    `https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const json3 = await r3.json();
  if (json3.price) {
    nowGas = json3.price;
  }
  return nowGas;
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
// async function addAlarm(
//   timestamp: number,
//   content: string,
//   url?: string,
//   color?: string,
// ) {
//   chrome.alarms.create(`time_alarm:${content}`, {
//     when: timestamp,
//   });
//   restoreAlarmsFromServer();
// }
// 恢复闹钟list
// chrome.storage.local.get(["alarm_list"], function (data) {
//   if (data && data.alarm_list) {
//     const list = data.alarm_list.filter((item: any) => item.timestamp > Date.now());
//     list.forEach((item: any) => {
//       chrome.alarms.create(`time_alarm:${item.content}`, {
//         when: new Date(item.timestamp).getTime(),
//       });
//     });
//   } else {
//   }
// });

// async function restoreAlarmsFromServer() {
//   const alarms = await getUsersAlarmsNoLogin();
//   if (alarms) {
//     alarms.forEach((item: any) => {
//       chrome.alarms.create(`time_alarm:${item.desc}`, {
//         when: item.alarm_at,
//       });
//     });
//   }
// }
// restoreAlarmsFromServer();

chrome?.runtime?.onMessage.addListener(function (
  request,
  sender,
  sendResponse,
) {
  if (request.cmd === 'getGas')
    sendResponse({
      value: nowGas,
      type: display_info,
    });
  // if (request.cmd === 'add_time_alarm') {
  //   addAlarm(
  //     request.value.alarm_at,
  //     request.value.desc,
  //     request.value.url,
  //     request.value.color,
  //   );
  // }
  // if (request.cmd === 'get_all_time_alarm') {
  //   chrome.alarms.getAll((alarms) => {
  //     sendResponse(alarms);
  //   });
  // }
  if (request.cmd === 'open_login') {
    chrome.tabs.create({
      url: 'login.html',
    });
  }
  if (request.cmd === 'refresh_gas') {
    repeat();
  }
});
let display_info = 'GAS';
async function repeat() {
  chrome.storage.local.get(['display_info'], async function (data) {
    if (data && data.display_info) {
      display_info = data.display_info;
    } else {
      display_info = 'GAS';
    }
    if (display_info === 'GAS') {
      let gas = await getNowGas();
      if (gas > 0) {
        sendMessageToContentScript(
          { cmd: 'gasUpdate', value: gas, type: 'GAS' },
          function () {
            // console.log("来自content的回复：" + response);
          },
        );
        nowGas = gas;
        chrome.action?.setBadgeText({ text: gas.toString() });
      }
    } else {
      let price = await getTokenPrice(display_info);
      if (price > 0) {
        sendMessageToContentScript(
          { cmd: 'gasUpdate', value: price, type: display_info },
          function () {
            // console.log("来自content的回复：" + response);
          },
        );
      }
    }
  });
}
repeat();

// chrome.alarms.clearAll();

// chrome.alarms.create('gasupdate', { delayInMinutes: 0.2 });
const logoIcon = chrome.runtime.getURL('images/logo-128.png');
// chrome.alarms.onAlarm.addListener(async (alarm) => {
//   if (alarm.name === 'gasupdate') {
//     repeat();
//     chrome.alarms.create('gasupdate', { delayInMinutes: 0.2 });
//   } else if (alarm.name.startsWith('time_alarm:')) {
//     chrome.notifications.create(alarm.name, {
//       type: 'basic',
//       title: 'Time Alarm',
//       iconUrl: logoIcon,
//       requireInteraction: true,
//       message: `you have a time alarm at this time [${alarm.name.replace(
//         'time_alarm:',
//         '',
//       )}]`,
//     });
//   }
// });

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
