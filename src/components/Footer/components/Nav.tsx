import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href=""
      >
        MasterFarmer
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/token/0x17258ca8dabbfBdcB969D108A016aB4cb93B74e9"
      >
        CMT
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/token/0x2f3De6B0a73d965f810864E3686c1c8ea634c10E"
      >
        xCMT
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/cmtradepro">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/cmtradepro">
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href="https://t.me/cmtmoon">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://www.facebook.com/CMTrade-Pro-109185734280091">
        Facebook
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[100]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  @media (max-width: 767px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
  }
`

export default Nav
