import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useActions } from '../../../api/common/hooks/useActions'
import playerImage from '../../../assests/images/playerInfoDetail.png'
import { colors } from '../../../assests/styles/colors'
import { getAge } from '../../../core/helpers/getAgeFunc'
import { playersSelector } from '../../../module/players/playersSelectors'
import { playersThunks } from '../../../module/players/playersSlice'
import styled from 'styled-components'
import { Breadcrumbs } from '../../../common/components/dashboard/entities/Breadcrumbs'
import { HeaderDetails } from '../../../common/components/dashboard/entities/HeaderDetails'
import { breakpoints } from '../../../assests/styles/adaptive'

export const PlayersDetail = () => {
  const { pathname } = useLocation()
  const { playerId, teamId } = useParams()
  const { getPlayersIdTC, deletePlayerTC } = useActions(playersThunks)

  const { player } = useSelector(playersSelector)

  useEffect(() => {
    getPlayersIdTC({ id: Number(playerId) })
  }, [])
  const age = getAge(player?.birthday)
  const crumbs = [
    { title: 'Players', url: '/players' },
    { title: player?.name, url: pathname },
  ]
  const handleDeleteTeam = () => {
    deletePlayerTC(Number(playerId))
  }
  return (
    <>
      <HeaderDetails
        crumbs={crumbs}
        onDeleteTeam={handleDeleteTeam}
        editPath={`/players/edit/${playerId}`}
        pathRedirect={'/players'}
      />
      <Container>
        <Logo>
          <Img alt={'ImagePlayer'} src={`http://dev.trainee.dex-it.ru${player?.avatarUrl}`} />
        </Logo>
        <InfoContainer>
          <Title>
            {player?.name}
            <TitleNumber> #{player?.number}</TitleNumber>
          </Title>
          <InfoItemContainer>
            <InfoRow>
              <ItemWrapper>
                <ItemTitle>Position</ItemTitle>
                <ItemSubtitle>{player?.position}</ItemSubtitle>
              </ItemWrapper>
              <ItemWrapper>
                <ItemTitle>Team</ItemTitle>
                <ItemSubtitle>{player?.teamName}</ItemSubtitle>
              </ItemWrapper>
              <ItemWrapper>
                <ItemTitle>Height</ItemTitle>
                <ItemSubtitle>{player?.height} cm</ItemSubtitle>
              </ItemWrapper>
              <ItemWrapper>
                <ItemTitle>Weight</ItemTitle>
                <ItemSubtitle>{player?.weight} kg</ItemSubtitle>
              </ItemWrapper>
              <ItemWrapper>
                <ItemTitle>Age</ItemTitle>
                <ItemSubtitle>{age}</ItemSubtitle>
              </ItemWrapper>
            </InfoRow>
          </InfoItemContainer>
        </InfoContainer>
      </Container>
    </>
  )
}

const TitleNumber = styled.span`
  color: ${colors.lightRed};
`

const Container = styled.div`
  display: flex;
  justify-content: center;
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
  align-items: flex-end;

  @media screen and ${breakpoints.laptop} {
    margin: 48px 0;
  }
`

const Img = styled.img`
  max-width: 531px;
  max-height: 531px;

  @media screen and ${breakpoints.laptop} {
    max-width: 300px;
    max-height: 300px;
  }
  @media screen and ${breakpoints.samsungMobile} {
    max-width: 143px;
    max-height: 112px;
  }
`

const InfoContainer = styled.div`
  width: 110%;
  padding-top: 65px;

  @media screen and ${breakpoints.laptop} {
    padding: 0 10px;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`

const InfoItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
`

const Title = styled.h1`
  font-size: 36px;
  line-height: 49px;
  font-weight: 800;
  color: ${colors.white};
  margin-bottom: 60px;

  @media screen and ${breakpoints.laptop} {
    margin-bottom: 48px;
    line-height: 25px;
  }

  @media screen and ${breakpoints.samsungMobile} {
    font-size: 17px;
  }
`

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media screen and ${breakpoints.laptop} {
    flex-direction: column;
    margin-bottom: 32px;
  }
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 54px;
  flex-basis: calc(35% - 10px);

  @media screen and ${breakpoints.laptop} {
    align-items: center;
    &:first-child {
      margin-bottom: 32px;
      margin-right: 0;
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
