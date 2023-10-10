import React, { FC } from 'react'

import { PlayerType } from '../../../../../../../../api/players/api'
import iconPlayerRoster from '../../../../../../../../assests/icons/iconPlayers.svg'
import { colors } from '../../../../../../../../assests/styles/colors'
import { getAge } from '../../../../../../../../core/helpers/getAgeFunc'
import { PlayerRosterCard, TableLeft, TableRight } from './RosterInfoCard/PlayerCard'
import styled from 'styled-components'

type Player = {
  age: string
  cm: string
  img: string
  in: string
  kg: string
  name: string
  position: string
}

interface TeamRosterProps {
  dataPlayers: PlayerType[]
  team: any
}

const TeamRoster: FC<TeamRosterProps> = ({ dataPlayers, team }) => {
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
          {dataPlayers.map((player, index) => {
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
`

const Container = styled.div`
  padding: 24px 0;
`

const TeamRosterContainer = styled.div`
  border: 0.5px solid rgba(156, 156, 156, 1);
  border-radius: 15px;
  margin-top: 20px;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.grey};
  padding: 14px 0 14px 32px;
`

const RosterGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export default TeamRoster
