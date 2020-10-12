import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import config from '../../config'

import { XSushi } from '../../xsushi'

export interface XSushiContext {
  xsushi?: typeof XSushi
}

export const Context = createContext<XSushiContext>({
  xsushi: undefined,
})

declare global {
  interface Window {
    xsushisauce: any
  }
}

const XSushiProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [xsushi, setXSushi] = useState<any>()

  // @ts-ignore
  window.xsushi = xsushi
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const xsushiLib = new XSushi(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setXSushi(xsushiLib)
      window.xsushisauce = xsushiLib
    }
    else {
      const chainId = config.chainId
      const xsushiLib = new XSushi(config.rpc, chainId, false, {
        defaultAccount: '0x0000000000000000000000000000000000000000',
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setXSushi(xsushiLib)
      window.xsushisauce = xsushiLib
    }
  }, [ethereum])

  return <Context.Provider value={{ xsushi }}>{children}</Context.Provider>
}

export default XSushiProvider
