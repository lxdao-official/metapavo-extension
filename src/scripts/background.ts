// eslint-disable-next-line no-console
console.log("background script");

export {};
chrome.runtime.onMessage.addListener((message, callback) => {
  if (message.data === "setHelperBadge") {
    chrome.browserAction.setIcon({
      path: message.image,
    });
  }
});
