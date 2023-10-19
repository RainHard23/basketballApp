import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import iconTeam from '../../../../../../../assests/images/iconTeam.png'
import { colors } from '../../../../../../../assests/styles/colors'
import styled from 'styled-components'
import { breakpoints } from '../../../../../../../assests/styles/adaptive'

type TeamProps = {
  foundationYear: number
  id?: number
  imageUrl?: string
  name?: string
}
export const TeamCard: FC<TeamProps> = ({ foundationYear, id, imageUrl, name }) => {
  const navigate = useNavigate()

  return (
    <CardContainer onClick={() => navigate(`/team/${id}`)}>
      <LogoWrapper>
        <CardLogo
          alt={'img'}
          src={imageUrl && imageUrl ? `http://dev.trainee.dex-it.ru${imageUrl}` : iconTeam}
        />
      </LogoWrapper>
      <CardDescription>
        <CardTitle>{name}</CardTitle>
        <CardFoundation>Year of foundation: {foundationYear}</CardFoundation>
      </CardDescription>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 100%;
  border-radius: 4px 4px 0 0;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 232px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(121.57deg, ${colors.grey} 1.62%, #393939 81.02%);

  @media screen and ${breakpoints.samsungMobile} {
    min-height: 128px;
  }
`
const CardLogo = styled.img`
  max-width: 150px;
  height: 150px;
  width: 100%;
  object-fit: cover;

  @media screen and ${breakpoints.samsungMobile} {
    height: 50px;
    max-width: 60px;
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
const CardFoundation = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.lightGrey};
`
