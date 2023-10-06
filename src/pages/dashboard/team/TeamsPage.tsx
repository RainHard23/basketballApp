import React from "react";
import styled from "styled-components";
import {TeamCard} from "../../../common/components/dashboard/entities/teams/components/teamCard/TeamCard";
import {CardsdLayouts} from "../../../common/layouts/CardsLayouts";


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