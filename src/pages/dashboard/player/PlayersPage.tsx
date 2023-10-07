import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {TeamCard} from "../../../common/components/dashboard/entities/teams/components/teamCard/TeamCard";
import {CardsdLayouts} from "../../../common/layouts/CardsLayouts";
import {useSelector} from "react-redux";
import {teamsSelector} from "../../../module/teams/teamsSelectors";
import {useActions} from "../../../api/common/hooks/useActions";
import {teamsThunks} from "../../../module/teams/teamsSlice";
import {PlayerCard} from "../../../common/components/dashboard/entities/players/components/playerCard/PlayerCard";


export const PlayersPage = () => {
    const {dataTeams, count, size, page} = useSelector(teamsSelector)
    const {getTeamsTC} = useActions(teamsThunks);

    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : '';

    const [parramsQuery, setParramsQuery] = useState(
        {
            paramsQuery: {
                name: "",
                page: 1,
                pageSize: 6,
            }
        }
    );

    const updatePageSize = useCallback(
        (newPageSize: number) => {
            console.log(newPageSize)

            setParramsQuery((prevParamsQuery) => ({
                ...prevParamsQuery,
                paramsQuery: {
                    ...prevParamsQuery.paramsQuery,
                    pageSize: newPageSize,
                },
            }));
        },
        [setParramsQuery]
    );

    const updatePageSelect = useCallback(
        (newPageSelect: number) => {
            console.log(newPageSelect)
            setParramsQuery((prevParamsQuery) => ({
                ...prevParamsQuery,
                paramsQuery: {
                    ...prevParamsQuery.paramsQuery,
                    page: newPageSelect,
                },
            }));
        },
        [setParramsQuery]
    );


    useEffect(() => {
        getTeamsTC(parramsQuery);
    }, [parramsQuery]);

    const paginationPage = useMemo(() => {
        if (count && size) {
            return Math.ceil(count / size);
        }
    }, [count, size]);




    return (
        <CardsdLayouts paginationPage={paginationPage} updatePageSelect={updatePageSelect} updatePageSize={updatePageSize}>
            <CardWrapper>
                {(dataTeams && dataTeams.map((el) =>
                    <PlayerCard key={el.id} name={el.name} foundationYear={el.foundationYear} imageUrl={el.imageUrl}/>
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
  margin: 32px 0;
`;
