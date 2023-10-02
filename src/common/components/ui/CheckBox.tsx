import React, {FC} from 'react';
import styled from 'styled-components';
import {colors} from "../../../assests/styles/colors";
// @ts-ignore
import iconCheck from '../../../assests/icons/iconCheck.svg'
import {fonts} from "../../../assests/fonts/fonts";


type CheckboxProps = {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    id?: string;
};

export const CheckBox: FC<CheckboxProps> = ({
                                                label,
                                                checked,
                                                required,
                                                disabled,
                                                onChange,
                                            }) => {
    return (
        <CheckboxWrapper>
            <input
                type="checkbox"
                checked={checked}
                id="c1"
                required={required}
                disabled={disabled}
                onChange={() => onChange && onChange(!checked)}
            />
            <Label>{label}</Label>
        </CheckboxWrapper>

    );
}


const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;


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
        top: 15%;
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



