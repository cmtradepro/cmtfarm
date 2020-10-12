import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000
export const START_REWARD_AT_BLOCK = 11052007 // TODO
export const NUMBER_BLOCKS_PER_YEAR = 2425000

export const START_NEW_POOL_AT = 1601983000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

// TODO: change the address & set LP pool
export const contractAddresses = {
  sushi: {
    1: '0x17258ca8dabbfBdcB969D108A016aB4cb93B74e9',
    99: '0x9FB56E17EF76Eb21d89d2Ec73058245844e70E3d',
  },
  masterChef: {
    1: '0xb67D7a6644d9E191Cac4DA2B88D6817351C7fF62',
    99: '0xA49D353dd804f516bcd500D1Dd6eE72675CF498d',
  }
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
  {
    pid: 3,
    lpAddresses: {
      1: '0x0b00Dfa92f11afBA8A4660Bc3d3ea5731cb7C61B',
    },
    tokenAddresses: {
      1: '0x17258ca8dabbfBdcB969D108A016aB4cb93B74e9',
    },
    token2Addresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    },
    name: 'CMT - ETH',
    symbol: 'CMT-ETH UNI-V2 LP',
    symbolShort: 'CMT-ETH',
    description: `Deposit CMT-ETH UNI-V2 LP Earn xCMT`,
    tokenSymbol: 'CMT',
    token2Symbol: 'ETH',
    icon: 'https://i.ibb.co/ncx2wDg/CMT-Full-Color.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
    isHot: true,
    isNew: false,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://info.uniswap.org/pair/0x0b00Dfa92f11afBA8A4660Bc3d3ea5731cb7C61B',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x17258ca8dabbfBdcB969D108A016aB4cb93B74e9/ETH'
  },
  {
    pid: 0,
    lpAddresses: {
      1: '0xd3d2e2692501a5c9ca623199d38826e513033a17',
    },
    tokenAddresses: {
      1: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    },
    token2Addresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    },
    name: 'UNI - ETH',
    symbol: 'UNI-ETH UNI-V2 LP',
    symbolShort: 'UNI-ETH',
    description: `Deposit xCMT-ETH UNI-V2 LP Earn xCMT`,
    tokenSymbol: 'UNI',
    token2Symbol: 'ETH',
    icon: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
    isHot: true,
    isNew: false,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: 'https://uniswap.info/pair/0xd3d2e2692501a5c9ca623199d38826e513033a17',
    addLiquidityLink: 'https://app.uniswap.org/#/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/ETH'
  },
  {
    pid: 1,
    lpAddresses: {
      1: '',
    },
    tokenAddresses: {
      1: '0x2f3De6B0a73d965f810864E3686c1c8ea634c10E',
    },
    token2Addresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    },
    name: 'xCMT - ETH',
    symbol: 'xCMT-ETH UNI-V2 LP',
    symbolShort: 'xCMT-ETH',
    description: `Deposit xCMT-ETH UNI-V2 LP Earn xCMT`,
    tokenSymbol: 'xCMT',
    token2Symbol: 'ETH',
    icon: 'https://i.ibb.co/MhjCxDF/XCMT-Full-Color.png',
    icon2: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',
    isHot: true,
    isNew: true,
    protocal: 'UniSwap',
    iconProtocal: 'https://uniswap.info/static/media/logo_white.edb44e56.svg',
    pairLink: '',
    addLiquidityLink: 'https://app.uniswap.org/#/add/0x2f3De6B0a73d965f810864E3686c1c8ea634c10E/ETH'
  }, 

]
