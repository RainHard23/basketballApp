import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import iconPlayer from '../../../../../../assests/images/IconPlayerPage.png'
import { colors } from '../../../../../../assests/styles/colors'
import styled from 'styled-components'
import { breakpoints } from '../../../../../../assests/styles/adaptive'

type PlayerProps = {
  avatarUrl?: string
  id?: number
  name?: string
  teamName?: string
}
export const PlayerCard: FC<PlayerProps> = ({ avatarUrl, id, name, teamName }) => {
  const navigate = useNavigate()

  return (
    <CardContainer onClick={() => navigate(`/team/:teamId/${id}`)}>
      <LogoWrapper>
        <CardLogo
          alt={'PlayerPage'}
          src={avatarUrl && avatarUrl ? `http://dev.trainee.dex-it.ru${avatarUrl}` : iconPlayer}
        />
      </LogoWrapper>
      <CardDescription>
        <CardTitle>{name}</CardTitle>
        <CardTeam>{teamName}</CardTeam>
      </CardDescription>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 100%;
`

const LogoWrapper = styled.div`
  min-height: 210px;
  align-items: flex-end;
  display: flex;
  justify-content: center;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(121.57deg, ${colors.grey} 1.62%, #393939 81.02%);

  @media screen and ${breakpoints.samsungMobile} {
    min-height: 128px;
  }
`
const CardLogo = styled.img`
  max-width: 274px;
  height: 230px;
  width: 100%;
  object-fit: cover;

  @media screen and ${breakpoints.laptop} {
    height: 150px;
    max-width: 180px;
  }

  @media screen and ${breakpoints.samsungMobile} {
    height: 93px;
    max-width: 121px;
  }
`
const CardDescription = styled.div`
  text-align: center;
  padding: 10px 5px;
  border-radius: 0 0 4px 4px;
  background: ${colors.darkGrey};
  color: ${colors.white};

  @media screen and ${breakpoints.samsungMobile} {
    padding: 5px 5px;
  }
`
const CardTitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;
  color: ${colors.white};

  @media screen and ${breakpoints.samsungMobile} {
    font-size: 15px;
  }
`
const CardTeam = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.lightGrey};
`
