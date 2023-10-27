import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActions } from '../../../api/common/hooks/useActions'
import emptyTeams from '../../../assests/images/emptyTeams.png'
import { Loader } from '../../../common/components/Loader'
import { TeamCard } from '../../../common/components/dashboard/entities/teams/components/teamCard/TeamCard'
import { CardsdLayouts } from '../../../common/layouts/CardsLayouts'
import { selectAppStatus } from '../../../module/app/appSelectors'
import { teamsSelector } from '../../../module/teams/teamsSelectors'
import { teamsThunks } from '../../../module/teams/teamsSlice'
import { EmptyPage } from '../../EmptyPage'
import styled from 'styled-components'
import { selectIsLoggedIn } from '../../../module/auth/auth.selectors'
import { breakpoints } from '../../../assests/styles/adaptive'
import { Navigate } from 'react-router-dom'

export const TeamsPage = () => {
  const { count, dataTeams, page, size } = useSelector(teamsSelector)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { getTeamsTC } = useActions(teamsThunks)
  const status = useSelector(selectAppStatus)
  const [parramsQuery, setParramsQuery] = useState({
    paramsQuery: {
      page: 1,
      pageSize: 6,
    },
  })
  useEffect(() => {
    getTeamsTC(parramsQuery)
  }, [parramsQuery, isLoggedIn, getTeamsTC])

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

  const paginationPage = useMemo(() => {
    if (count && size) {
      return Math.ceil(count / size)
    }
  }, [count, size])

  return (
    <CardsdLayouts
      updateSearchQuery={updateSearchQuery}
      linkPath={'/team/create'}
      paginationPage={paginationPage}
      updatePageSelect={updatePageSelect}
      updatePageSize={updatePageSize}
    >
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          {dataTeams && dataTeams.length > 0 ? (
            <CardsContainer>
              {dataTeams.map(el => (
                <TeamCard
                  foundationYear={el.foundationYear}
                  id={el.id}
                  imageUrl={el.imageUrl}
                  key={el.id}
                  name={el.name}
                />
              ))}
            </CardsContainer>
          ) : (
            <EmptyPage Image={emptyTeams} Label={'Add new teams to continue'} />
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
