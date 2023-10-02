import React, { FC } from 'react';
import styled from 'styled-components';
// @ts-ignore
import iconPlayerRoster from '../../../../../../../../assests/icons/iconPlayers.svg';
import {TableLeft, TableRight, PlayerRosterCard} from "./RosterInfoCard/PlayerCard";
import {colors} from "../../../../../../../../assests/styles/colors";



type  Player = {
    in: string;
    img: string;
    name: string;
    position: string;
    cm: string;
    kg: string;
    age: string;
}

const players: Player[] = [
    {
        in: '10',
        img: iconPlayerRoster,
        name: 'John Doe',
        position: 'Point Guard',
        cm: '190',
        kg: '85',
        age: '28',
    },
    {
        in: '15',
        img: iconPlayerRoster,
        name: 'Michael Johnson',
        position: 'Shooting Guard',
        cm: '195',
        kg: '90',
        age: '26',
    },
    {
        in: '23',
        img: iconPlayerRoster,
        name: 'David Smith',
        position: 'Small Forward',
        cm: '203',
        kg: '98',
        age: '29',
    },
    {
        in: '7',
        img: iconPlayerRoster,
        name: 'Kevin Brown',
        position: 'Power Forward',
        cm: '205',
        kg: '102',
        age: '27',
    },
];

const TeamRoster: FC = () => {
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
                    {players.map((player, index) => (
                        <PlayerRosterCard
                            key={index}
                            inNumber={player.in}
                            imgSrc={player.img}
                            playerName={player.name}
                            position={player.position}
                            height={player.cm}
                            weight={player.kg}
                            age={player.age}
                        />
                    ))}
                </RosterGrid>
            </TeamRosterContainer>
        </Container>
    );
};

const PlayerInfoContainer = styled.div`
  display: grid;
  border-top: 0.5px solid ${colors.lightGrey};
  padding: 10px 0 10px 32px;
  grid-template-columns: 0.1fr 1fr 0.3fr 0.3fr 0.3fr;
`;



const Container = styled.div`
  padding: 24px 0;
`;

const TeamRosterContainer = styled.div`
  border: 0.5px solid rgba(156, 156, 156, 1);
  border-radius: 15px;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.grey};
  padding: 14px 0 14px 32px;
`;

const RosterGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export default TeamRoster;
