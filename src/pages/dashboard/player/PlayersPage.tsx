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

export const PlayersPage = () => {
  const { count, dataPlayers, size } = useSelector(playersSelector)
  const { getPlayersIdTC, getPlayersTC } = useActions(playersThunks)

  const status = useSelector(selectAppStatus)

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
  }, [parramsQuery])

  const paginationPage = useMemo(() => {
    if (count && size) {
      return Math.ceil(count / size)
    }
  }, [count, size])

  return (
    <CardsdLayouts
      updateSearchQuery={updateSearchQuery}
      linkPath={'/team/:teamId/players/create'}
      paginationPage={paginationPage}
      updatePageSelect={updatePageSelect}
      updatePageSize={updatePageSize}
    >
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          {dataPlayers && dataPlayers.length > 0 ? (
            <CardsContainer>
              {dataPlayers &&
                dataPlayers.map(el => (
                  <PlayerCard
                    avatarUrl={el.avatarUrl}
                    id={el.id}
                    key={el.id}
                    name={el.name}
                    teamName={'kek'}
                  />
                ))}
            </CardsContainer>
          ) : (
            <EmptyPage Image={emptyPlayers} Label={'Add new players to continue'} />
          )}
        </>
      )}
    </CardsdLayouts>
  )
}

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 24px), 1fr));
  gap: 24px;
  width: 100%;
  margin: 32px 0;
`
