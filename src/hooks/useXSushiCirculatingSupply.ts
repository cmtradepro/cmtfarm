import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import config from '../config'
import useXSushi from './useXSushi'
import { getXSushiCirculatingSupply } from '../xsushi/utils'
import BigNumber from 'bignumber.js'
// import debounce from 'debounce'

var CACHE = {
  time: parseInt(localStorage.getItem('CACHE_useXSushiCirculatingSupply_time') || '0'),
  old: 2 * 60 * 1000,
  value: new BigNumber(localStorage.getItem('CACHE_useXSushiCirculatingSupply_value') || '0')
}

const useXSushiCirculatingSupply = () => {
  const xsushi = useXSushi()
  const [newReward, setNewRewad] = useState<BigNumber>(CACHE.value)
  
  useEffect(() => {
    async function fetchData() {
      const v = await getXSushiCirculatingSupply(xsushi)
      CACHE.time = new Date().getTime()
      CACHE.value = v;

      localStorage.setItem('CACHE_useXSushiCirculatingSupply_time', CACHE.time.toString())
      localStorage.setItem('CACHE_useXSushiCirculatingSupply_value', CACHE.value.toString())
          
      setNewRewad(v)
    }
    if (xsushi 
      && CACHE.time + CACHE.old <= new Date().getTime()) {
      fetchData()
    }
  }, [xsushi, setNewRewad])

  return newReward
}

export default useXSushiCirculatingSupply
