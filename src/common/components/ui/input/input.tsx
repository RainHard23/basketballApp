import React, {ComponentProps, FC, useState} from 'react';
import {FieldError, RegisterOptions} from "react-hook-form";
import styled from "styled-components";
import {colors} from "../../../../assests/styles/colors";
import eyeIcon from "../../../../assests/icons/iconEye.svg"
import eyeIconClose from "../../../../assests/icons/iconCloseEye.svg"
import searchIcon from "../../../../assests/icons/iconSearch.svg"

type InputProps = {
    type: "text" | "password" | "search"
    name: string
    label?: string
    value?: string
    disabled: boolean
    error?: FieldError
    registerOptions?: RegisterOptions;
    placeholder?: string
}
const Input: FC<InputProps> = ({
                                   name, error, disabled, value, label, type, placeholder
                               }) => {

    const [showPassword, setShowPassword] = useState(false)
    let getFinalType = (type: ComponentProps<'input'>['type'], showPassword: boolean) => {
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
            <InputWrapper error={!!error} type={type}>
                <StyledInput
                    // ref={register && register(registerOptions)}
                    type={finalType}
                    id={name}
                    name={name}
                    placeholder={type === 'search' ? placeholder : ''}

                />
                {isShowSearch && (
                    <SearchButton>
                                <img src={searchIcon} alt=""/>
                    </SearchButton>
                )}
                {isShowPassword && (
                    <IconWrapper onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <img src={eyeIcon} alt=""/> : <img src={eyeIconClose} alt=""/>}
                    </IconWrapper>
                )}
            </InputWrapper>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </InputContainer>
    );
};

const InputWrapper = styled.div<{ error: boolean; type?: InputProps['type']}>`
  max-width: 365px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.darkGrey};
  background-color: ${({ type }) => (type === 'search' ? '#fff' : colors.lightestGrey1)};
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: ${({ error, type }) => error ? '1px solid #FF768E' : (type === 'search' ? `1px solid ${colors.lightestGrey}` : 'none')};
  border-radius: 4px;
  cursor: pointer;


  &:hover {
    background:  ${({ type }) => (type !== 'search' ? colors.lightestGrey : colors.lightestGrey1)}
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
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;

  background: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.button`
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;
`;

const InputContainer = styled.div`
  & label {
    line-height: 24px;
    color: ${colors.grey};
    margin-bottom: 8px;
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.lightRed};
  font-size: 12px;
  line-height: 18px;
`;

const SearchButton = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
`;

export default Input
