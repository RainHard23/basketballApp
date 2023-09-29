import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../../../../../../assests/styles/colors";

type PlayerInfoProps = {
    inNumber: string;
    imgSrc: string;
    playerName: string;
    position: string;
    height: string;
    weight: string;
    age: string;
};

export const PlayerRosterCard: FC<PlayerInfoProps> = ({
                                                    inNumber,
                                                    imgSrc,
                                                    playerName,
                                                    position,
                                                    height,
                                                    weight,
                                                    age,
                                                }) => {
    return (
        <ContainerPlayer>
            <TableRow key={inNumber}>
                <TableLeft>{inNumber}</TableLeft>
                <TableLeft>
                    <TableItem>
                        <PlayerLink to={`/players/${inNumber}`}>
                            <Img src={imgSrc} alt="Logo" />
                        </PlayerLink>
                        <PlayerDescription>
                            <NameLink to={`/players/${inNumber}`}>{playerName}</NameLink>
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


const PlayerLink = styled(Link)`
  text-decoration: none;
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


const NameLink = styled(Link)`
  font-size: 15px;
  color: ${colors.grey};
  text-decoration: none;
`;

const Position = styled.p`
  font-size: 13px;
  color: ${colors.lightGrey};
`;
