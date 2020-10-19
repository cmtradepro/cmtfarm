import BigNumber from 'bignumber.js'
import React, { memo, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import SushiIcon from '../../../components/SushiIcon'

import useAllEarnings from '../../../hooks/useAllEarnings'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import useBlock from '../../../hooks/useBlock'

import { getNewRewardPerBlock, getSushiAddress, getXcmtAddress, getSushiSupply, getXcmtSupply } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Luas from '../../../assets/img/lua-icon.svg'
import xLuas from '../../../assets/img/xluas-icon.svg'
import useNewReward from '../../../hooks/useNewReward'
import useLuaTotalSupply from '../../../hooks/useLuaTotalSupply'
import useLuaCirculatingSupply from '../../../hooks/useLuaCirculatingSupply'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const [farms, setFarms] = useState(localStorage.getItem("pools") ? JSON.parse(localStorage.getItem("pools")) : [])
  const {ethereum}: { ethereum: any } = useWallet()
  const sushi = useSushi()

  const chainId = 0;
  if (ethereum) {
      // @ts-ignore
      window.eth = ethereum
      const chainId = Number(ethereum.chainId)
  }
  

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances = memo(() => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [TVL, setTVL] = useState<Number>()

  const newReward = useNewReward()
  const cmtBalance = useTokenBalance("0x17258ca8dabbfBdcB969D108A016aB4cb93B74e9")
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

    const block = useBlock()
    const startBlock = 10750000
    const farmStarted = ethereum && block >= startBlock

    //const [farms] = useFarms()
    const [farms, setFarms] = useState(localStorage.getItem("pools") ? JSON.parse(localStorage.getItem("pools")) : [])

    const sushi = useSushi()
    const sushiBalance = useTokenBalance(getSushiAddress(sushi))

    let chainId = 0;
    if (ethereum) {
        // @ts-ignore
        window.eth = ethereum
        chainId = Number(ethereum.chainId)
    }
    
  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              {/* <SushiIcon /> */}
              <img src={xLuas} alt="xCMT Balance"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your Available xCMT Balance" />
                <StyledBalanceLink
                  href="https://app.uniswap.org/#/swap?exactField=input&exactAmount=1&outputCurrency=0x2f3De6B0a73d965f810864E3686c1c8ea634c10E"
                  rel="noreferrer noopner"
                  target="_blank"
                  >Get xCMT</StyledBalanceLink>
                <Value
                  value={!!account ? getBalanceNumber(sushiBalance) : ''}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending Harvest
          <FootnoteValue>
            <PendingRewards /> xCMT
          </FootnoteValue>
          <StyledInsight>
              <span>Total Burned</span>
              <span style={{fontWeight: 'bold', color: '#4caf50'}}>
                <><b>--- </b> </>
              </span>
          </StyledInsight>
          <StyledInsight>
              <span>Total Supply</span>
              <span style={{fontWeight: 'bold', color: '#4caf50'}}>
                <><b>1000</b> </>
              </span>
          </StyledInsight>
        </Footnote>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              {/* <SushiIcon /> */}
              <img src={Luas} alt="CMT Balance"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your Available CMT Balance" />
                <StyledBalanceLink
                  href="https://app.uniswap.org/#/swap?exactField=input&exactAmount=1&outputCurrency=0x17258ca8dabbfBdcB969D108A016aB4cb93B74e9"
                  rel="noreferrer noopner"
                  target="_blank"
                  >Get CMT</StyledBalanceLink>
                <Value
                  value={getBalanceNumber(cmtBalance)}
                  decimals={3}
                 />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending Harvest
          <FootnoteValue>
            <PendingRewards /> CMT
          </FootnoteValue>
          <StyledInsight>
              <span>Total Burned</span>
              <span style={{fontWeight: 'bold', color: '#4caf50'}}>
                <><b>200000 </b> </>
              </span>
          </StyledInsight>
          <StyledInsight>
              <span>Total Circulating Supply</span>
              <span style={{fontWeight: 'bold', color: '#4caf50'}}>
                <><b>450000 </b> </>
              </span>
          </StyledInsight>
        </Footnote>
      </Card>
      <Spacer />
    </StyledWrapper>
  )
})

const Footnote = styled.div`
  font-size: 14px;
  padding: 14px 20px;
  color: ${(props) => props.theme.color.grey[100]};
  background-color: ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  float: right;
  color: ${(props) => props.theme.color.white};
`
const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: transparent;
  color: #9E9E9E;
  width: 100%;
  line-height: 25px;
  font-size: 13px;
  border: 0px solid #e6dcd5;
  text-align: center;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`
const StyledBalanceLink = styled.a`
  font-weight: 600;
  font-size: 0.825rem;
  color: ${(props) => props.theme.color.grey[400]};
`
const StyledBalanceHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`
const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
