import styled from "styled-components";

// @ts-ignore
import iconTeam from '../../../../../../../assests/icons/iconTeams.svg'
import {colors} from "../../../../../../../assests/styles/colors";

export const TeamCard = () => (
    <CardContainer>
        <LogoWrapper>
            <CardLogo src={iconTeam} alt='CardTeam' />
        </LogoWrapper>
        <CardDescription>
            <CardTitle>Portland trail blazers</CardTitle>
            <CardFoundation>Year of foundation: 1970</CardFoundation>
        </CardDescription>
    </CardContainer>
);

const CardContainer = styled.div`
  //max-width: 364px;
  width: 100%;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px 56px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(
    121.57deg,
    ${colors.grey} 1.62%,
    #393939 81.02%
  );
`;
const CardLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;
const CardDescription = styled.div`
  text-align: center;
  padding: 19px 5px;
  border-radius: 0 0 4px 4px;
  background: ${colors.darkGrey};
  color: ${colors.white};
`;
const CardTitle = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const CardFoundation = styled.p`
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
