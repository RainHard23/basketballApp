import styled from "styled-components";
// @ts-ignore
import { ReactComponent as IconAddPhoto } from "../../../assests/images/iconAddPhoto.svg";
import { colors } from "../../../assests/styles/colors";
import {FC} from "react";

type InputFile = {
    image?: any
}
export const CustomInputFile: FC<InputFile> = ({image}) => {
    return (
        <CustomImgInputContainer>
            <CustomFileInputIcon />
            <img src={image} alt=""/>
            <CustomStyledInput
                accept="image/*"
                type="file"
                name="file" />
        </CustomImgInputContainer>
    );
};

const CustomImgInputContainer = styled.div`
  display: flex;
  max-width: 336px;
  width: 100%;
  height: 262px;
  margin-bottom: 48px;
  background-color: ${colors.lightGrey};
  border-radius: 15px;
  position: relative;
`;

const CustomFileInputIcon = styled(IconAddPhoto)`
  position: absolute;
  z-index: 25;
  opacity: 70%;
  max-height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
`;

const CustomStyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 100;
`;
