import React, { ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import eyeIconClose from '../../../../assests/icons/iconCloseEye.svg'
import eyeIcon from '../../../../assests/icons/iconEye.svg'
import searchIcon from '../../../../assests/icons/iconSearch.svg'
import { colors } from '../../../../assests/styles/colors'
import styled from 'styled-components'
import { breakpoints } from '../../../../assests/styles/adaptive'
import { FieldError } from 'react-hook-form'

export type InputProps = {
  disabled?: boolean
  errorMessage?: string
  label?: string
  placeholder?: string
  type: 'date' | 'number' | 'password' | 'search' | 'text'
  value?: string
} & ComponentPropsWithoutRef<'input'>
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, errorMessage, label, placeholder, type, value, onChange, ...restProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const getFinalType = (type: ComponentProps<'input'>['type'], showPassword: boolean) => {
      if (type === 'password' && showPassword) {
        return 'text'
      }

      return type
    }

    const finalType = getFinalType(type, showPassword)
    const isShowSearch = type === 'search'
    const isShowPassword = type === 'password'

    return (
      <InputContainer>
        {label && <label>{label}</label>}
        <InputWrapper error={!!errorMessage} type={type}>
          <StyledInput
            placeholder={type === 'search' ? placeholder : ''}
            ref={ref}
            type={finalType}
            value={value}
            onChange={onChange}
            {...restProps}
          />
          {isShowSearch && (
            <SearchButton>
              <img alt={''} src={searchIcon} />
            </SearchButton>
          )}
          {isShowPassword && (
            <IconWrapper onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <img alt={''} src={eyeIcon} /> : <img alt={''} src={eyeIconClose} />}
            </IconWrapper>
          )}
        </InputWrapper>
        {errorMessage && true && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputContainer>
    )
  }
)

const InputWrapper = styled.div<{ error?: boolean; type?: InputProps['type'] }>`
  margin-top: 8px;
  
  max-width: 364px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.darkGrey};
  background-color: ${({ type }) => (type === 'search' ? '#fff' : colors.lightestGrey1)};
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: ${({ error, type }) =>
    error ? '1px solid #FF768E' : type === 'search' ? `1px solid ${colors.lightestGrey}` : 'none'};
  border-radius: 4px;

  @media screen and ${breakpoints.tablet} {
    margin: 0 auto;
  }

  &:hover {
    background: ${({ type }) => (type !== 'search' ? colors.lightestGrey : colors.lightestGrey1)}
    transition: all 0.2s ease-in-out;
  }

  &:focus-within {
    box-shadow: 0 0 5px #d9d9d9;
  }

  &:disabled {
    cursor: not-allowed;

    &::placeholder {
      color: ${colors.lightestGrey};
    }

    &:hover {
      background: ${colors.lightestGrey1};
    }
  }
`

const StyledInput = styled.input`
  width: 100%;
  height: 100%;

  background: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;
`

const InputContainer = styled.div`
  & label {
    display: block;
    margin-top: 24px;
    line-height: 24px;
    color: ${colors.grey};
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
  }

  @media screen and ${breakpoints.tablet} {
    margin: 0 auto;
  }
`

const ErrorMessage = styled.p`
  color: ${colors.lightRed};
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
`

const SearchButton = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
`
