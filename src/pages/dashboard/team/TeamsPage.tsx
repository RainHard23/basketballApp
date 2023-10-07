import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {TeamCard} from "../../../common/components/dashboard/entities/teams/components/teamCard/TeamCard";
import {CardsdLayouts} from "../../../common/layouts/CardsLayouts";
import axios from "axios";
import {array} from "yup";
import {useSelector} from "react-redux";
import {teamsSelector} from "../../../module/teams/teamsSelectors";
import {useActions} from "../../../api/common/hooks/useActions";
import {teamsThunks} from "../../../module/teams/teamsSlice";
import {selectIsLoggedIn} from "../../../api/auth/auth.selectors";


export const TeamsPage = () => {
    const {dataTeams, count, size} = useSelector(teamsSelector)
    const {getTeamsTC} = useActions(teamsThunks);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        getTeamsTC();
    }, []);

    const paginationPage = useMemo(() => {
        if (count && size) {
            return Math.ceil(count / size);
        }
    }, [count, size]);

    console.log(dataTeams)


    return (
        <CardsdLayouts paginationPage={paginationPage}>
            <CardWrapper>
                {(dataTeams && dataTeams.map((el) =>
                    <TeamCard key={el.id} name={el.name} foundationYear={el.foundationYear} imageUrl={el.imageUrl}/>
                ))}
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