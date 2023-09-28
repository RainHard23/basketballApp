import React from "react";
import {CardsdLayouts} from "../../../../common/components/layouts/CardsLayouts";
import styled from "styled-components";
import {TeamCard} from "../teamcard/teamcard";
import {MenuNavBar} from "../../../../common/components/navigation/menu/MenuNavBar";
import {Header} from "../../../../common/components/Header/header";

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

const TeamLink = styled.a`
  text-decoration: none;
`;


export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 24px), 1fr));
  gap: 24px;
  width: 100%;
  margin-top: 32px;
`;