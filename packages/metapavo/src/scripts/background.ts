import { addAlarmForUser, getUsersAlarms, getUsersAlarmsNoLogin } from "../utils/apis/nft_api";

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
async function addAlarm(timestamp: number, content: string, url?: string, color?: string) {
  await addAlarmForUser(new Date(timestamp), content, url, color);
  chrome.alarms.create(`time_alarm:${content}`, {
    when: timestamp,
  });
  restoreAlarmsFromServer();
}
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

async function restoreAlarmsFromServer() {
  const alarms = await getUsersAlarmsNoLogin();
  if (alarms) {
    alarms.forEach((item: any) => {
      chrome.alarms.create(`time_alarm:${item.desc}`, {
        when: item.alarm_at,
      });
    });
  }
}
restoreAlarmsFromServer();

chrome?.runtime?.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd === "getGas") sendResponse(nowGas);
  if (request.cmd === "add_time_alarm") {
    addAlarm(request.value.alarm_at, request.value.desc, request.value.url, request.value.color);
  }
  if (request.cmd === "get_all_time_alarm") {
    chrome.alarms.getAll((alarms) => {
      sendResponse(alarms);
    });
  }
  if (request.cmd === "open_login") {
    chrome.tabs.create({
      url: "login.html",
    });
  }
});

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

chrome.alarms.clearAll();

chrome.alarms.create("gasupdate", { delayInMinutes: 0.2 });
const logoIcon = chrome.runtime.getURL("images/logo-128.png");
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "gasupdate") {
    repeat();
    chrome.alarms.create("gasupdate", { delayInMinutes: 0.2 });
  } else if (alarm.name.startsWith("time_alarm:")) {
    chrome.notifications.create(alarm.name, {
      type: "basic",
      title: "Time Alarm",
      iconUrl: logoIcon,
      requireInteraction: true,
      message: `you have a time alarm at this time [${alarm.name.replace("time_alarm:", "")}]`,
    });
  }
});
