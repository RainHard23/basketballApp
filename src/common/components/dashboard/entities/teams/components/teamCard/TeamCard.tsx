import styled from "styled-components";
import iconTeam from '../../../../../../../assests/images/iconTeam.png'
import {colors} from "../../../../../../../assests/styles/colors";
import {FC} from "react";
import {useNavigate} from "react-router-dom";

type TeamProps = {
    name?: string
    foundationYear: number
    imageUrl?: string,
    id?:number,
}
export const TeamCard: FC<TeamProps> = ({name, foundationYear, imageUrl, id}) => {

    const navigate = useNavigate();

    return (
        <CardContainer onClick={() => navigate(`/team/${id}`)}>
            <LogoWrapper>
                <CardLogo src={imageUrl && imageUrl ? imageUrl : iconTeam} alt="img" />
            </LogoWrapper>
            <CardDescription>
                <CardTitle>{name}</CardTitle>
                <CardFoundation>Year of foundation: {foundationYear}</CardFoundation>
            </CardDescription>
        </CardContainer>
    )
}


const CardContainer = styled.div`
  //max-width: 364px;
  width: 100%;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 65px 56px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(121.57deg,
  ${colors.grey} 1.62%,
  #393939 81.02%);
`;
const CardLogo = styled.img`
  max-width: 150px;
  height: 150px;
  width: 100%;
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
