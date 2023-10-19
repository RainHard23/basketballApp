import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { colors } from '../../../../../../../../../assests/styles/colors'
import styled from 'styled-components'
import { breakpoints } from '../../../../../../../../../assests/styles/adaptive'

type PlayerInfoProps = {
  age: number
  height: number
  id?: number
  imgSrc?: string
  number: number
  playerName: string
  position: string
  teamId: string
  weight: number
}

export const PlayerRosterCard: FC<PlayerInfoProps> = ({
  age,
  height,
  id,
  imgSrc,
  number,
  playerName,
  position,
  teamId,
  weight,
}) => {
  const navigate = useNavigate()

  return (
    <ContainerPlayer>
      <TableRow key={id}>
        <TableLeft>{number}</TableLeft>
        <TableLeft>
          <TableItem onClick={() => navigate(`/team/${teamId}/${id}`)}>
            <PlayerLogo>
              <Img alt={'Logo'} src={`http://dev.trainee.dex-it.ru${imgSrc}`} />
            </PlayerLogo>
            <PlayerDescription>
              <NamePlayer>{playerName}</NamePlayer>
              <Position>{position}</Position>
            </PlayerDescription>
          </TableItem>
        </TableLeft>
        <TableRight>{height} cm</TableRight>
        <TableRight>{weight} kg</TableRight>
        <TableRight>{age}</TableRight>
      </TableRow>
    </ContainerPlayer>
  )
}

export const TableLeft = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${colors.grey};

  @media screen and ${breakpoints.samsungMobile} {
    padding-right: 32px;
  }
`

const TableItem = styled.div`
  display: flex;
  align-items: center;
`

const Img = styled.img`
  margin-right: 10px;
  border-radius: 50px;
  width: 40px;
  height: 38px;
`

const PlayerDescription = styled.div`
  line-height: 24px;
`

const PlayerLogo = styled.div`
  max-width: 50px;
`

export const TableRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: ${colors.grey};

  @media screen and ${breakpoints.samsungMobile} {
    display: none;
  }
`

export const ContainerPlayer = styled.div``

const TableRow = styled.div`
  border-top: 0.5px solid ${colors.lightGrey};
  display: grid;
  padding: 10px 0 10px 32px;
  grid-template-columns: 0.1fr 1fr 0.3fr 0.3fr 0.3fr;

  @media screen and ${breakpoints.samsungMobile} {
    padding: 10px 0 10px 16px;
  }
`

const NamePlayer = styled.p`
  font-size: 15px;
  color: ${colors.grey};
`

const Position = styled.p`
  font-size: 13px;
  color: ${colors.lightGrey};
`
