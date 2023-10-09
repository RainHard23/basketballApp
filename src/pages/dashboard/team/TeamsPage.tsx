import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {TeamCard} from "../../../common/components/dashboard/entities/teams/components/teamCard/TeamCard";
import {CardsdLayouts} from "../../../common/layouts/CardsLayouts";
import {useSelector} from "react-redux";
import {teamsSelector} from "../../../module/teams/teamsSelectors";
import {useActions} from "../../../api/common/hooks/useActions";
import {teamsThunks} from "../../../module/teams/teamsSlice";
import {EmptyPage} from "../../EmptyPage";
import emptyTeams from '../../../assests/images/emptyTeams.png'
import {Loader} from "../../../common/components/Loader";
import {selectAppStatus} from "../../../module/app/appSelectors";

export const TeamsPage = () => {
    const {dataTeams, count, size, page} = useSelector(teamsSelector)
    const {getTeamsTC} = useActions(teamsThunks);
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
        <CardsdLayouts linkPath={'/teams/create'} paginationPage={paginationPage} updatePageSelect={updatePageSelect}
                       updatePageSize={updatePageSize}>
            {status === "loading" ? (
                <Loader/>
            ) : (
                <>
                    {dataTeams && dataTeams.length > 0 ? (
                        <CardWrapper>
                            {dataTeams.map((el) => (
                                <TeamCard key={el.id} name={el.name} id={el.id} foundationYear={el.foundationYear}
                                          imageUrl={el.imageUrl}/>
                            ))}
                        </CardWrapper>
                    ) : (
                        <EmptyPage Image={emptyTeams} Label={'Add new teams to continue'}/>
                    )}
                </>
            )}
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
