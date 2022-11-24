const config = {
  name: 'metapavo',
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://api.metapavo.xyz',
  network: {
    url: 'https://goerli.infura.io/v3/f4dd6db18a6f4ea98151892c0fa8e074',
    chainId: '0x5',
    gas: 'auto',
    gasPrice: 'auto',
    name: 'goerli Testnet',
  },
  address: {
    pavoid: '0x49C28dbdF6B50307e406Ab10B46bC25fa9626029',
  },
};

export default config;
