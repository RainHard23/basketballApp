import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from '../../../api/common/hooks/useActions'
import emptyPlayers from '../../../assests/images/emptyPlayers.png'
import { Loader } from '../../../common/components/Loader'
import { PlayerCard } from '../../../common/components/dashboard/entities/players/components/PlayerCard'
import { CardsdLayouts } from '../../../common/layouts/CardsLayouts'
import { selectAppStatus } from '../../../module/app/appSelectors'
import { playersSelector } from '../../../module/players/playersSelectors'
import { playersThunks } from '../../../module/players/playersSlice'
import { EmptyPage } from '../../EmptyPage'
import styled from 'styled-components'
import { teamsThunks } from '../../../module/teams/teamsSlice'
import { type } from 'os'
import {
  filteredTeamsSelector,
  teamsDataSelector,
  teamsSelector,
} from '../../../module/teams/teamsSelectors'
import { instance } from '../../../api/common/api/commonApi'
import { TeamType } from '../../../api/teams/api'
import { breakpoints } from '../../../assests/styles/adaptive'

export const PlayersPage = () => {
  const { count, dataPlayers, size } = useSelector(playersSelector)
  const { getPlayersTC } = useActions(playersThunks)
  const dataTeams = useSelector(teamsDataSelector)
  const status = useSelector(selectAppStatus)
  const { getTeamsTC } = useActions(teamsThunks)
  const [parramsQuery, setParramsQuery] = useState({
    paramsQuery: {
      name: '',
      page: 1,
      pageSize: 6,
    },
  })

  const updateSearchQuery = (value: string) => {
    setParramsQuery(prevParamsQuery => ({
      ...prevParamsQuery,
      paramsQuery: {
        ...prevParamsQuery.paramsQuery,
        name: value,
      },
    }))
  }

  const updatePageSize = useCallback(
    (newPageSize: number) => {
      setParramsQuery(prevParamsQuery => ({
        ...prevParamsQuery,
        paramsQuery: {
          ...prevParamsQuery.paramsQuery,
          pageSize: newPageSize,
        },
      }))
    },
    [setParramsQuery]
  )

  const updatePageSelect = useCallback(
    (newPageSelect: number) => {
      setParramsQuery(prevParamsQuery => ({
        ...prevParamsQuery,
        paramsQuery: {
          ...prevParamsQuery.paramsQuery,
          page: newPageSelect,
        },
      }))
    },
    [setParramsQuery]
  )

  useEffect(() => {
    getPlayersTC(parramsQuery)
    getTeamsTC({ paramsQuery: { name: '', page: 1, pageSize: 24 } })
  }, [parramsQuery, getTeamsTC])
  useEffect(() => {}, [])

  const paginationPage = useMemo(() => {
    if (count && size) {
      return Math.ceil(count / size)
    }
  }, [count, size])

  const uniquePlayerIds = new Set()
  const uniquePlayers = dataPlayers.filter(player => {
    if (uniquePlayerIds.has(player.id)) {
      return false
    }
    uniquePlayerIds.add(player.id)
    return true
  })

  return (
    <CardsdLayouts
      updateSearchQuery={updateSearchQuery}
      linkPath={'/team/:teamId/players/create'}
      paginationPage={paginationPage}
      updatePageSelect={updatePageSelect}
      updatePageSize={updatePageSize}
    >
      {status === 'loading' || !dataTeams ? (
        <Loader />
      ) : (
        <>
          {uniquePlayers.length > 0 ? (
            <CardsContainer>
              {uniquePlayers.map(el => {
                const playerTeam = dataTeams.find(team => team.id === el.team)
                const teamName = playerTeam?.name
                return (
                  <PlayerCard
                    avatarUrl={el.avatarUrl}
                    id={el.id}
                    key={el.id}
                    name={el.name}
                    teamName={teamName}
                  />
                )
              })}
            </CardsContainer>
          ) : (
            <EmptyPage Image={emptyPlayers} Label={'Add new players to continue'} />
          )}
        </>
      )}
    </CardsdLayouts>
  )
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 24px), 1fr));
  gap: 24px;
  width: 100%;
  margin: 32px 0;

  @media ${breakpoints.laptop} {
    grid-template-columns: repeat(2, calc((100% - 12px) / 2));
    gap: 12px;
    margin: 16px 0;
  }

  @media ${breakpoints.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(calc(50% - 16px), 1fr));
    margin: 16px 0;
  }
`
