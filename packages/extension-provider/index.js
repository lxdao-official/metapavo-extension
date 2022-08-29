const { MetaMaskInpageProvider } = require('@metamask/inpage-provider')
const PortStream = require('extension-port-stream')
const { detect } = require('detect-browser')
const browser = detect()
const config = require('./config.json')

function getMetaMaskId () {
  switch (browser && browser.name) {
    case 'chrome':
      return config.CHROME_ID
    case 'firefox':
      return config.FIREFOX_ID
    default:
      return config.CHROME_ID
  }
}

function createMetaMaskProvider() {
  const currentMetaMaskId = getMetaMaskId()
  const metamaskPort = chrome.runtime.connect(currentMetaMaskId)
  const pluginStream = new PortStream(metamaskPort)
  return new MetaMaskInpageProvider(pluginStream)
}

module.exports = createMetaMaskProvider