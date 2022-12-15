export const linkImages = {
  // etherscan: chrome ? chrome.runtime.getURL('images/etherscan.png') : '',
  // twitter: chrome ? chrome.runtime.getURL('images/twitter.png') : '',
  // opensea: chrome ? chrome.runtime.getURL('images/opensea.png') : '',
  // x2y2: chrome ? chrome.runtime.getURL('images/x2y2.png') : '',
  // website: chrome ? chrome.runtime.getURL('images/website.png') : '',
  // looksrare: chrome ? chrome.runtime.getURL('images/looksrare.png') : '',
  // github: chrome ? chrome.runtime.getURL('images/github.png') : '',
  // gem: chrome ? chrome.runtime.getURL('images/gem.png') : '',
  // sudoswap: chrome ? chrome.runtime.getURL('images/sudoswap.png') : '',
  get etherscan() {
    return chrome.runtime.getURL('images/etherscan.png');
  },
  get twitter() {
    return chrome.runtime.getURL('images/twitter.png');
  },
  get opensea() {
    return chrome.runtime.getURL('images/opensea.png');
  },
  get x2y2() {
    return chrome.runtime.getURL('images/x2y2.png');
  },
  get website() {
    return chrome.runtime.getURL('images/website.png');
  },
  get looksrare() {
    return chrome.runtime.getURL('images/looksrare.png');
  },
  get github() {
    return chrome.runtime.getURL('images/github.png');
  },
  get gem() {
    return chrome.runtime.getURL('images/gem.png');
  },
  get sudoswap() {
    return chrome.runtime.getURL('images/sudoswap.png');
  },
  get uniswap() {
    return chrome.runtime.getURL('images/uniswap.png');
  },
  get coinmarketcap() {
    return chrome.runtime.getURL('images/coinmarketcap.png');
  },
  get tenderly() {
    return chrome.runtime.getURL('images/tenderly.png');
  },
  get blur() {
    return chrome.runtime.getURL('images/blur.jpeg');
  },
};
