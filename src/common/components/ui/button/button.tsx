
import styled from "styled-components";
import {colors} from "../../../../assests/styles/colors";
import {fonts} from "../../../../assests/fonts/fonts";


const Button = styled.button<{ cancelBtn?: boolean; addBtn?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${({addBtn}) => addBtn ? '104px' : '364'}; 
  width: 100%;
  background-color: ${({cancelBtn}) =>
          cancelBtn ? colors.white : colors.red};
  border-radius: 3px;
  font-family: ${fonts.mainFont};
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  padding: 8px 0;
  color: ${({cancelBtn}) =>
          cancelBtn ? colors.lightGrey : colors.white};
  transition: all 0.2s ease-in-out;
  border: ${({cancelBtn}) =>
          cancelBtn ? `1px solid ${colors.lightGrey}` : "none"};;

  &:hover {
    background-color: ${({cancelBtn}) =>
            cancelBtn ? colors.lightestGrey : colors.lightRed};
    color: ${({cancelBtn}) =>
            cancelBtn ? colors.lightGrey : colors.white};
  }

  &:active {
    background-color: ${({cancelBtn,}) =>
            cancelBtn ? colors.lightGrey : colors.darkRed};
    color: ${({cancelBtn}) =>
            cancelBtn ? colors.grey : colors.white};
  }

  &:disabled {
    color: ${colors.lightestGrey};
    background-color: ${colors.lightestGrey1};
    border: ${({ cancelBtn}) =>
            cancelBtn ? `1px solid ${colors.lightGrey}` : "none"};
  }

  & img {
    margin-left: ${(addBtn) =>
            addBtn ? "10px" : 'none'
    }
`

export default Button;