import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { fonts } from '../../../assests/fonts/fonts'
// @ts-ignore
import iconCheck from '../../../assests/icons/iconCheck.svg'
import { colors } from '../../../assests/styles/colors'
import styled from 'styled-components'

type CheckboxProps = {
  checked?: boolean
  control: any
  disabled?: boolean
  errorMessage: any
  id?: string
  label?: string
  name: string
  required?: boolean
}

export const CheckBox: FC<CheckboxProps> = ({
  checked,
  control,
  disabled,
  errorMessage,
  label,
  name,
  required,
}) => {
  return (
    <>
      <CheckboxWrapper>
        <Label error={!!errorMessage}>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <StyledInput
                error={!!errorMessage}
                checked={checked}
                type={'checkbox'}
                {...field}
                disabled={disabled}
                id={name}
                name={name}
              />
            )}
          />
          {label}
        </Label>
      </CheckboxWrapper>
      {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
    </>
  )
}

const StyledInput = styled.input<{ error: boolean }>`
    border: ${({ error }) =>
      error ? `1px solid ${colors.lightRed}` : `1px solid ${colors.lightGrey}`};
    appearance: none;
    width: 12px;
    height: 12px;
   
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
`

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`

const Label = styled.label<{ error: boolean }>`
  font-family: ${fonts.mainFont};
  font-size: 14px;
  color: ${colors.grey};
  line-height: 24px;
  font-weight: 500;
  color: ${({ error }) => (error ? colors.lightRed : colors.grey)};
`

const ErrorMessage = styled.p`
  color: ${colors.lightRed};
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
`
