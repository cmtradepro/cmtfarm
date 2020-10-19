import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import axios from 'axios'
import config from '../config'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export async function UnknownBlock(address, method, params, cache) {
  var { data } = await axios.post(`${config.api}/read/${address}`, {
      method,
      params,
      cache
  })

  return data.data
}

export const getMasterChefAddress = (sushix) => {
  return sushix && sushix.masterChefAddress
}
export const getSushixAddress = (sushix) => {
  return sushix && sushix.sushixAddress
}

export const getXcmtAddress = (xcmt) => {
  return xcmt && xcmt.XcmtAddress
}

export const getMasterChefContract = (sushix) => {
  return sushix && sushix.contracts && sushix.contracts.masterChef
}
export const getSushixContract = (sushix) => {
  return sushix && sushix.contracts && sushix.contracts.sushix
}

export const getXcmtContract = (xcmt) => {
  return xcmt && xcmt.contracts && xcmt.contracts.xcmt
}

export const getFarms = (sushix) => {
  return sushix
    ? sushix.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          icon2,
          description,
          tokenAddress,
          tokenSymbol,
          token2Symbol,
          token2Address,
          symbolShort,
          tokenContract,
          token2Contract,
          isHot,
          isNew,
          isTba,
          lpAddress,
          lpContract,
          protocal,
          iconProtocal,
          pairLink,
          addLiquidityLink,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          token2Address,
          tokenSymbol,
          token2Symbol,
          token2Contract,
          symbol,
          symbolShort,
          isHot,
          isNew,
          isTba,
          tokenContract,
          earnToken: 'xcmt',
          earnTokenAddress: sushix.contracts.sushix.options.address,
          icon,
          icon2,
          description,
          protocal,
          iconProtocal,
          pairLink,
          addLiquidityLink,
        }),
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingReward(pid, account).call()
}

export const getLPValue = async (
  masterChefContract,
  lpContract,
  tokenContract,
  token2Contract,
  pid,
) => {
  var usdtAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
  var usdcAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  var wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total token2 value for the lpContract = w1
  const lpContractToken2 = await token2Contract.methods
    .balanceOf(lpContract.options.address)
    .call()

  const token2Decimals = await token2Contract.methods.decimals().call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const totalLpToken2Value = portionLp.times(lpContractToken2).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const token2Amount = new BigNumber(lpContractToken2)
    .times(portionLp)
    .div(new BigNumber(10).pow(token2Decimals))

  var usdValue = 0;
  var totalToken2Value = totalLpToken2Value.div(new BigNumber(10).pow(token2Decimals))
  if (token2Contract._address.toLowerCase() == usdtAddress 
    || token2Contract._address.toLowerCase() == usdcAddress) {
    usdValue = totalToken2Value
  } 
  else if (token2Contract._address.toLowerCase() == wethAddress) {
    var { data } = await axios.get(`${config.api}/price/ETH`)
    usdValue = totalToken2Value.times(data.usdPrice)
  }
  
  return {
    pid,
    tokenAmount,
    token2Amount,
    totalToken2Value,
    tokenPriceInToken2: token2Amount.div(tokenAmount),
    usdValue,
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const getLPTokenStaked = async (
  sushix,
  lpContract,
) => {
  var chef = getMasterChefContract(sushix)
  return new BigNumber(
    await UnknownBlock(lpContract._address, 'balanceOf(address):(uint256)', [chef.options.address], true)
  )
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushixSupply = async (sushix) => {
  return new BigNumber(
    await UnknownBlock(sushix.contracts.sushix._address, 'totalSupply():(uint256)', [], true)
  )
}

export const getSushixCirculatingSupply = async (sushix) => {
  var chef = getMasterChefContract(sushix)
  var a = new BigNumber(
    await UnknownBlock(sushix.contracts.sushix._address, 'circulatingSupply():(uint256)', [], true)
  )

  var b = new BigNumber(
    await UnknownBlock(sushix.contracts.sushix._address, 'balanceOf(address):(uint256)', [chef._address], true)
  )
  return a.minus(b)
}

export const getNewRewardPerBlock = async (sushix, pid1 = 0) => {
  var chef = getMasterChefContract(sushix)
  return new BigNumber(
    await UnknownBlock(chef._address, 'getNewRewardPerBlock(uint256):(uint256)', [pid1], true)
  )
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .claimReward(pid)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const getCanUnlockLua = async (sushix, account) => {
  var lua = getSushixContract(sushix)

  return new BigNumber(await lua.methods.canUnlockAmount(account).call())
}


export const getLockOf = async (sushix, account) => {
  var lua = getSushixContract(sushix)

  return new BigNumber(await lua.methods.lockOf(account).call())
}

export const unlock = async (sushix, account) => {
  var lua = getSushixContract(sushix)
  return lua.methods
    .unlock()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}