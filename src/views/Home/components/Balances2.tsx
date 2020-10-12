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
import useXSushi from '../../../hooks/useXSushi'
import { getNewRewardPerBlock, getXSushiAddress, getXSushiSupply } from '../../../xsushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import xLua from '../../../assets/img/xlua-icon.svg'
import xLuas from '../../../assets/img/xluas-icon.svg'
import useNewReward from '../../../hooks/useNewReward'
import useXSushiTotalSupply from '../../../hooks/useXSushiTotalSupply'
import useXSushiCirculatingSupply from '../../../hooks/useXSushiCirculatingSupply'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

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
  const newReward = useNewReward()
  const totalSupply = useXSushiTotalSupply()
  const circulatingSupply = useXSushiCirculatingSupply()
  const xsushi = useXSushi()
  const xsushiBalance = useTokenBalance(getXSushiAddress(xsushi))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()
  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              {/* <SushiIcon /> */}
              <img src={xLua} alt="xCMT Balance"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your Available xCMT Balance" />
                <Value
                  value={!!account ? getBalanceNumber(xsushiBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending harvest
          <FootnoteValue>
            <PendingRewards /> xCMT
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <StyledBalance>
            {/* <SushiIcon /> */}
            <img src={xLuas} alt="Total xCMT Supply"/>
            <Spacer />
            <div style={{ flex: 1 }}>
              <Label text="xCMT Circulating Supply" />
              <Value
                value={circulatingSupply ? getBalanceNumber(circulatingSupply) : '~'}
              />
            </div>
          </StyledBalance>
        </CardContent>
        <Footnote>
          Total Burned
          <FootnoteValue>
            {/* {newReward ? `${getBalanceNumber(newReward)} LUA` : 'Loading...'} */}
            {totalSupply ? `${parseFloat(getBalanceNumber(totalSupply).toFixed(2)).toLocaleString('en-US')} xCMT` : '~'}
          </FootnoteValue>
        </Footnote>
      </Card>
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

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
