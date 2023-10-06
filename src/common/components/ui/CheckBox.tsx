import React, {FC} from 'react';
import styled from 'styled-components';
import {colors} from "../../../assests/styles/colors";
// @ts-ignore
import iconCheck from '../../../assests/icons/iconCheck.svg'
import {fonts} from "../../../assests/fonts/fonts";
import {Controller, useFormContext} from "react-hook-form";


type CheckboxProps = {
    label?: string;
    checked?: boolean;
    name: string
    disabled?: boolean;
    required?: boolean;
    id?: string;
    errorMessage: any
    control: any
};

export const CheckBox: FC<CheckboxProps> = ({
                                                errorMessage,
                                                name,
                                                label,
                                                checked,
                                                required,
                                                disabled,
                                                control,
                                            }) => {


    return (
        <>
            <CheckboxWrapper>
                <Controller
                    name={name}
                    control={control}
                    render={({field}) => (
                        <input
                            checked={checked}
                            type="checkbox"
                            {...field}
                            id={name}
                            name={name}
                            disabled={disabled}
                        />
                    )}
                />
                <Label>{label}</Label>

            </CheckboxWrapper>
            {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
        </>

    );
}


const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;


  & input {
    appearance: none;
    width: 12px;
    height: 12px;
    border: 1px solid ${colors.lightGrey};
    border-radius: 2px;
    margin-right: 8px;
    cursor: pointer;
    position: relative;

    &:hover {
      border: 1px solid ${colors.red};
    }

    &:checked {
      background-color: ${colors.red};
      border: 1px solid ${colors.red};

      &::after {
        content: url(${iconCheck});
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &:disabled {
        border: 1px solid ${colors.lightestGrey};
        background-color: ${colors.lightestGrey};
      }
    }

    &:disabled {
      border: 1px solid ${colors.lightestGrey};
      background-color: ${colors.lightestGrey1};
    }
  }
`;

const Label = styled.label`
  font-family: ${fonts.mainFont};
  font-size: 14px;
  color: ${colors.grey};
  line-height: 24px;
  font-weight: 500;


`;

const ErrorMessage = styled.p`
  color: ${colors.lightRed};
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;

`;


