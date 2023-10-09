import React, {FC} from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {colors} from "../../../../../../../../../assests/styles/colors";


type PlayerInfoProps = {
    number: number;
    imgSrc: string;
    playerName: string;
    position: string;
    height: number;
    weight: number;
    age: number;
    teamId: string,
    id: number,
};

export const PlayerRosterCard: FC<PlayerInfoProps> = ({
                                                          number,
                                                          imgSrc,
                                                          playerName,
                                                          position,
                                                          height,
                                                          weight,
                                                          age,
                                                          id,
                                                          teamId
                                                      }) => {
    const navigate = useNavigate();

    return (
        <ContainerPlayer >
            <TableRow key={id}>
                <TableLeft>{number}</TableLeft>
                <TableLeft>
                    <TableItem onClick={() => navigate(`/team/${teamId}/${id}`)}>
                        <PlayerLogo >
                            <Img src={imgSrc} alt="Logo"/>
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
    );
};

export const TableLeft = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${colors.grey}
`;

const TableItem = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  margin-right: 10px;
  border-radius: 50px;
`;

const PlayerDescription = styled.div`
  line-height: 24px;
`;


const PlayerLogo = styled.div`
  
`;

export const TableRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: ${colors.grey}
`;

export const ContainerPlayer = styled.div``;

const TableRow = styled.div`
  border-top: 0.5px solid ${colors.lightGrey};
  display: grid;
  padding: 10px 0 10px 32px;
  grid-template-columns: 0.1fr 1fr 0.3fr 0.3fr 0.3fr;
`;


const NamePlayer = styled.p`
  font-size: 15px;
  color: ${colors.grey};
`;

const Position = styled.p`
  font-size: 13px;
  color: ${colors.lightGrey};
`;
