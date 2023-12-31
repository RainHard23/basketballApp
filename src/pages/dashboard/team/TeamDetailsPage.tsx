import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useActions } from '../../../api/common/hooks/useActions'
import { colors } from '../../../assests/styles/colors'
import TeamRoster from '../../../common/components/dashboard/entities/teams/components/teamCard/TeamRosterPage/TeamRoster'
import styled from 'styled-components'
import { HeaderDetails } from '../../../common/components/dashboard/entities/HeaderDetails'
import { teamsThunks } from '../../../module/teams/teamsSlice'
import { breakpoints } from '../../../assests/styles/adaptive'
import { teamsSelector } from '../../../module/teams/teamsSelectors'

export const TeamDetail = () => {
  const { pathname } = useLocation()
  const { teamId } = useParams()
  const navigate = useNavigate()

  const { teamPlayers, team } = useSelector(teamsSelector)
  const { deleteTeamTC, getTeamIdTC, getTeamPlayers } = useActions(teamsThunks)

  useEffect(() => {
    teamId && getTeamIdTC({ id: teamId })
    teamId && getTeamPlayers([{ value: teamId }])
  }, [getTeamIdTC, teamId, getTeamPlayers])

  const crumbs = [
    { title: 'Teams', url: '/teams' },
    { title: team?.name, url: pathname },
  ]

  const handleDeleteTeam = () => {
    deleteTeamTC(Number(teamId))
    navigate('/')
  }

  return (
    <>
      <HeaderDetails
        crumbs={crumbs}
        onDeleteTeam={handleDeleteTeam}
        editPath={`/team/edit/${teamId}`}
        pathRedirect={'/team'}
      />
      {team && (
        <Container key={team.id}>
          <Logo>
            <Img
              alt={`Image of ${team.name}`}
              src={`http://dev.trainee.dex-it.ru${team.imageUrl}`}
            />
          </Logo>
          <TeamInfo>
            <Title>{team.name}</Title>
            <InfoContainer>
              <InfoRow>
                <InfoWrapper>
                  <ItemTitle>Year of foundation</ItemTitle>
                  <ItemSubtitle>{team.foundationYear}</ItemSubtitle>
                </InfoWrapper>
                <InfoWrapper>
                  <ItemTitle>Division</ItemTitle>
                  <ItemSubtitle>{team.division}</ItemSubtitle>
                </InfoWrapper>
              </InfoRow>
              <InfoRow>
                <InfoWrapper>
                  <ItemTitle>Conference</ItemTitle>
                  <ItemSubtitle>{team.conference}</ItemSubtitle>
                </InfoWrapper>
              </InfoRow>
            </InfoContainer>
          </TeamInfo>
        </Container>
      )}
      <TeamRoster players={teamPlayers} team={teamId} />
    </>
  )
}

const Img = styled.img`
  max-height: 210px;
  max-width: 210px;
  @media screen and ${breakpoints.samsungMobile} {
    max-width: 90px;
    max-height: 90px;
  }
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, rgba(112, 112, 112, 1), rgba(57, 57, 57, 1));
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  @media screen and ${breakpoints.laptop} {
    flex-direction: column;
  }

  @media screen and ${breakpoints.samsungMobile} {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and ${breakpoints.laptop} {
    margin: 48px 0;
  }
`

const TeamInfo = styled.div`
  width: 130%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 65px 0;

  @media screen and ${breakpoints.laptop} {
    padding: 0 10px;
    width: 100%;
    align-items: center;
  }
`

const Title = styled.h1`
  font-size: 36px;
  line-height: 49px;
  font-weight: 800;
  color: ${colors.white};
  margin-bottom: 60px;

  @media screen and ${breakpoints.laptop} {
    margin-bottom: 48px;
  }

  @media screen and ${breakpoints.samsungMobile} {
    font-size: 17px;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 54px;
  width: 100%;

  @media screen and ${breakpoints.laptop} {
    flex-direction: column;
    margin-bottom: 32px;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-right: 84px;
  }

  @media screen and ${breakpoints.laptop} {
    align-items: center;
    &:first-child {
      margin-bottom: 32px;
      margin-right: 0;
    }
  }
`

const ItemTitle = styled.span`
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: ${colors.white};
  margin-bottom: 10px;

  @media screen and ${breakpoints.samsungMobile} {
    font-size: 17px;
  }
`

const ItemSubtitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  color: ${colors.white};

  @media screen and ${breakpoints.samsungMobile} {
    font-size: 17px;
  }
`
