import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

import { colors } from '../../../../assests/styles/colors'
import { SelectStyles } from './Selectstyle'
import styled from 'styled-components'

export type OptionType = {
  label?: string
  value?: number | string
}

type SelectPropsType = {
  control?: any
  isMulti?: boolean
  label?: string
  long?: boolean
  name: string
  options?: OptionType[]
}

export const Select1: FC<SelectPropsType> = ({ control, isMulti, label, name, options }) => {
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

export default Select1
