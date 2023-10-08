import styled from "styled-components";
import iconPlayer from '../../../../../../assests/images/IconPlayerPage.png'
import {colors} from "../../../../../../assests/styles/colors";
import {FC} from "react";

type PlayerProps = {
    name?: string
    teamName: string
    avatarUrl?: string
}
export const PlayerCard: FC<PlayerProps> = ({name, teamName, avatarUrl}) => {

    return (
        <CardContainer>
            <LogoWrapper>
                <CardLogo src={iconPlayer} alt="PlayerPage" />
            </LogoWrapper>
            <CardDescription>
                <CardTitle>{name}</CardTitle>
                <CardFoundation>{teamName}</CardFoundation>
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
  background: linear-gradient(121.57deg,
  ${colors.grey} 1.62%,
  #393939 81.02%);
`;
const CardLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;
const CardDescription = styled.div`
  text-align: center;
  padding: 21px 5px;
  border-radius: 0 0 4px 4px;
  background: ${colors.darkGrey};
  color: ${colors.white};
`;
const CardTitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;
  color: ${colors.white}
`;
const CardFoundation = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.lightGrey}
`;
