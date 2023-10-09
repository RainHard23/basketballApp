import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {CardsdLayouts} from "../../../common/layouts/CardsLayouts";
import {useSelector} from "react-redux";
import {useActions} from "../../../api/common/hooks/useActions";
import {PlayerCard} from "../../../common/components/dashboard/entities/players/components/PlayerCard";
import {playersSelector} from "../../../module/players/playersSelectors";
import {playersThunks} from "../../../module/players/playersSlice";
import {EmptyPage} from "../../EmptyPage";
import emptyPlayers from "../../../assests/images/emptyPlayers.png";
import {selectAppStatus} from "../../../module/app/appSelectors";
import {Loader} from "../../../common/components/Loader";


export const PlayersPage = () => {

    const {dataPlayers, count, size} = useSelector(playersSelector)
    const {getPlayersTC, getPlayersIdTC} = useActions(playersThunks);

    const status = useSelector(selectAppStatus);

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
        getPlayersTC(parramsQuery);
    }, [parramsQuery]);

    const paginationPage = useMemo(() => {
        if (count && size) {
            return Math.ceil(count / size);
        }
    }, [count, size]);


    return (
        <CardsdLayouts linkPath={'/team/:teamId/players/create'} paginationPage={paginationPage} updatePageSelect={updatePageSelect} updatePageSize={updatePageSize}>
            {status === "loading" ? (
                <Loader />
            ) : (
                <>
                    {dataPlayers && dataPlayers.length > 0 ? (
                        <CardsContainer>
                            {(dataPlayers && dataPlayers.map((el) =>
                                <PlayerCard key={el.id} id={el.id} name={el.name} teamName={'kek'} avatarUrl={el.avatarUrl}/>
                            ))}
                        </CardsContainer>
                    ) : (
                        <EmptyPage Image={emptyPlayers} Label={'Add new players to continue'}/>
                    )}
                </>
            )}
        </CardsdLayouts>
    );
};


export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 24px), 1fr));
  gap: 24px;
  width: 100%;
  margin: 32px 0;
`;
