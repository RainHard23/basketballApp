import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import iconPlayer from '../../../../../../assests/images/IconPlayerPage.png'
import { colors } from '../../../../../../assests/styles/colors'
import styled from 'styled-components'

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
        <CardLogo alt={'PlayerPage'} src={avatarUrl && avatarUrl ? avatarUrl : iconPlayer} />
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
  display: flex;
  justify-content: center;
  padding: 65px 56px 0 56px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(121.57deg, ${colors.grey} 1.62%, #393939 81.02%);
`
const CardLogo = styled.img`
  max-width: 274px;
  height: 207px;
  width: 100%;
  object-fit: cover;
`
const CardDescription = styled.div`
  text-align: center;
  padding: 21px 5px;
  border-radius: 0 0 4px 4px;
  background: ${colors.darkGrey};
  color: ${colors.white};
`
const CardTitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;
  color: ${colors.white};
`
const CardTeam = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.lightGrey};
`
