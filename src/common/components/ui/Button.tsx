import { fonts } from '../../../assests/fonts/fonts'
import { colors } from '../../../assests/styles/colors'
import styled from 'styled-components'

const Button = styled.button<{ isAuth?: boolean; isCancel?: boolean }>`
  margin: ${({ isAuth }) => (isAuth ? '24px 0' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ isCancel }) => (isCancel ? colors.white : colors.red)};
  border-radius: 3px;
  font-family: ${fonts.mainFont};
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  padding: 8px 0;
  color: ${({ isCancel }) => (isCancel ? colors.lightGrey : colors.white)};
  transition: all 0.2s ease-in-out;
  border: ${({ isCancel }) => (isCancel ? `1px solid ${colors.lightGrey}` : 'none')};

  &:hover {
    background-color: ${({ isCancel }) => (isCancel ? colors.lightestGrey : colors.lightRed)};
    color: ${({ isCancel }) => (isCancel ? colors.lightGrey : colors.white)};
  }

  &:active {
    background-color: ${({ isCancel }) => (isCancel ? colors.lightGrey : colors.darkRed)};
    color: ${({ isCancel }) => (isCancel ? colors.grey : colors.white)};
  }

  &:disabled {
    color: ${colors.lightestGrey};
    background-color: ${colors.lightestGrey1};
    border: ${({ isCancel }) => (isCancel ? `1px solid ${colors.lightGrey}` : 'none')};
  }
`

export default Button
