import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useActions } from '../../../api/common/hooks/useActions'
import playerImage from '../../../assests/images/playerInfoDetail.png'
import { colors } from '../../../assests/styles/colors'
import { getAge } from '../../../core/helpers/getAgeFunc'
import { playersSelector } from '../../../module/players/playersSelectors'
import { playersThunks } from '../../../module/players/playersSlice'
import styled from 'styled-components'

export const PlayersDetail = () => {
  const { playerId, teamId } = useParams()

  const { getPlayersIdTC } = useActions(playersThunks)

  const { player } = useSelector(playersSelector)

  useEffect(() => {
    getPlayersIdTC({ id: Number(playerId) })
  }, [])
  const age = getAge(player?.birthday)

  return (
    <>
      <Container>
        <Logo>
          <Img alt={'ImagePlayer'} src={player?.avatarUrl || playerImage} />
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
  align-items: center;
  background: linear-gradient(to right, rgba(112, 112, 112, 1), rgba(57, 57, 57, 1));
  border-radius: 15px;
  padding: 20px;
`

const Logo = styled.div`
  margin-bottom: -55px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  max-width: 531px;
  max-height: 531px;
`

const InfoContainer = styled.div`
  width: 110%;
`

const InfoItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`

const Title = styled.h1`
  font-size: 36px;
  line-height: 49px;
  font-weight: 800;
  color: ${colors.white};
  margin-bottom: 60px;
`

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 54px;
  flex-basis: calc(35% - 10px);
`

const ItemTitle = styled.span`
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: ${colors.white};
  margin-bottom: 10px;
`

const ItemSubtitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  color: ${colors.white};
`
