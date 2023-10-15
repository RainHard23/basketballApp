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

export const TeamsPage = () => {
  const { count, dataTeams, page, size } = useSelector(teamsSelector)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { getTeamsTC } = useActions(teamsThunks)
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
    if (isLoggedIn) {
      getTeamsTC(parramsQuery)
    }
  }, [parramsQuery, isLoggedIn, getTeamsTC])

  const paginationPage = useMemo(() => {
    if (count && size) {
      return Math.ceil(count / size)
    }
  }, [count, size])

  return (
    <CardsdLayouts
      updateSearchQuery={updateSearchQuery}
      linkPath={'/teams/create'}
      paginationPage={paginationPage}
      updatePageSelect={updatePageSelect}
      updatePageSize={updatePageSize}
    >
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          {dataTeams && dataTeams.length > 0 ? (
            <CardWrapper>
              {dataTeams.map(el => (
                <TeamCard
                  foundationYear={el.foundationYear}
                  id={el.id}
                  imageUrl={el.imageUrl}
                  key={el.id}
                  name={el.name}
                />
              ))}
            </CardWrapper>
          ) : (
            <EmptyPage Image={emptyTeams} Label={'Add new teams to continue'} />
          )}
        </>
      )}
    </CardsdLayouts>
  )
}

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 24px), 1fr));
  gap: 24px;
  width: 100%;
  margin: 32px 0;

  @media ${breakpoints.largeMobile} {
    grid-template-columns: repeat(auto-fill, minmax(calc(50% - 16px), 1fr));
  }

  @media ${breakpoints.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(calc(50% - 16px), 1fr));
    margin: 16px 0;
  }
`
