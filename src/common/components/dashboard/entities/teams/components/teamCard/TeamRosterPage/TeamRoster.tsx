import React, { FC } from 'react'

import { PlayerType } from '../../../../../../../../api/players/api'
import iconPlayerRoster from '../../../../../../../../assests/icons/iconPlayers.svg'
import { colors } from '../../../../../../../../assests/styles/colors'
import { getAge } from '../../../../../../../../core/helpers/getAgeFunc'
import { PlayerRosterCard, TableLeft, TableRight } from './RosterInfoCard/PlayerCard'
import styled from 'styled-components'
import { breakpoints } from '../../../../../../../../assests/styles/adaptive'

interface TeamRosterProps {
  players: PlayerType[] | undefined
  team?: string
}

const TeamRoster: FC<TeamRosterProps> = ({ players, team }) => {
  return (
    <Container>
      <TeamRosterContainer>
        <Title>Roster</Title>
        <PlayerInfoContainer>
          <TableLeft>#</TableLeft>
          <TableLeft>Player</TableLeft>
          <TableRight>Height</TableRight>
          <TableRight>Weight</TableRight>
          <TableRight>Age</TableRight>
        </PlayerInfoContainer>
        <RosterGrid>
          {players &&
            players.map((player, index) => {
              const age = getAge(player.birthday)

              return (
                <PlayerRosterCard
                  age={age}
                  height={player.height}
                  id={player.id}
                  imgSrc={player?.avatarUrl || iconPlayerRoster}
                  key={index}
                  number={player.number}
                  playerName={player.name}
                  position={player.position}
                  teamId={team}
                  weight={player.weight}
                />
              )
            })}
        </RosterGrid>
      </TeamRosterContainer>
    </Container>
  )
}

const PlayerInfoContainer = styled.div`
  display: grid;
  border-top: 0.5px solid ${colors.lightGrey};
  padding: 10px 0 10px 32px;
  grid-template-columns: 0.1fr 1fr 0.3fr 0.3fr 0.3fr;

  @media screen and ${breakpoints.samsungMobile} {
    padding: 10px 0 10px 16px;
  }
`

const Container = styled.div`
  padding: 24px 0;

  @media screen and ${breakpoints.samsungMobile} {
    padding: 16px 0;
  }
`

const TeamRosterContainer = styled.div`
  border: 0.5px solid rgba(156, 156, 156, 1);
  border-radius: 15px;

  background-color: ${colors.white};

  @media screen and ${breakpoints.samsungMobile} {
    margin-top: 0;
    border-radius: 0;
  }
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.grey};
  padding: 14px 0 14px 32px;

  @media screen and ${breakpoints.samsungMobile} {
    padding: 10px 0 10px 16px;
  }
`

const RosterGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export default TeamRoster
