import React, { FC } from 'react'
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form'
import Select from 'react-select'

import { colors } from '../../../../assests/styles/colors'
import { SelectStyles } from './Selectstyle'
import styled from 'styled-components'

export type OptionType = {
  label?: string
  value?: number | string
}

type SelectPropsType<TFieldValues extends FieldValues = FieldValues> = {
  control: any
  isMulti?: boolean
  label?: string
  long?: boolean
  name: string
  options?: OptionType[]
  errorMessage?: FieldError
}

export const CustomSelect: FC<SelectPropsType> = ({
  control,
  isMulti,
  label,
  name,
  options,
  errorMessage,
}) => {
  return (
    <SelectWrapper>
      <Title>{label}</Title>
      <SelectStyles long>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              {...field}
              classNamePrefix={'react-select'}
              isMulti={isMulti}
              maxMenuHeight={300}
              menuPlacement={options && options.length > 3 ? 'bottom' : 'top'}
              onChange={(selectedOption: any) => {
                field.onChange(selectedOption?.value)
              }}
              options={options}
              value={options && options.find(option => option.value === field.value)}
            />
          )}
        />
      </SelectStyles>
      {errorMessage && true && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
    </SelectWrapper>
  )
}

const SelectWrapper = styled.div``
const Title = styled.h4`
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.grey};
`
const ErrorMessage = styled.p`
  color: ${colors.lightRed};
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
`
