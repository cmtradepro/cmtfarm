export default {
  rpc: process.env.NODE_ENV === 'production' ?
    'https://mainnet.infura.io/v3/a0c696c1e5e848c08c2276db4dbca103' :
    'https://mainnet.infura.io/v3/a0c696c1e5e848c08c2276db4dbca103',
  chainId: 1,
  api: process.env.NODE_ENV === 'production' ?
  'https://mainnet.infura.io/v3/a0c696c1e5e848c08c2276db4dbca103' :
  'https://mainnet.infura.io/v3/a0c696c1e5e848c08c2276db4dbca103'
}
