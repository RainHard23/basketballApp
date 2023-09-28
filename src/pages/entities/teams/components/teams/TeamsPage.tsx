import React from "react";
import {CardsdLayouts} from "../../../CardsLayouts";
import styled from "styled-components";
import {TeamCard} from "../teamCard/TeamCard";

export const TeamsPage = () => {

    return (
        <CardsdLayouts>

            <CardWrapper>
                <TeamCard/>
                <TeamCard/>
                <TeamCard/>
                <TeamCard/>
                <TeamCard/>
                <TeamCard/>
            </CardWrapper>
        </CardsdLayouts>
    );
};


export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 24px), 1fr));
  gap: 24px;
  width: 100%;
  margin-top: 32px;
`;