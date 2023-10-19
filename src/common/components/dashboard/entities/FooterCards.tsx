import React, { FC } from 'react'
import Select from 'react-select'
import { Pagination } from '../../ui/Pagination'
import { SelectStyles } from '../../ui/select/Selectstyle'
import styled from 'styled-components'

type PropsType = {
  paginationPage?: number
  updatePageSelect: (newPageSelect: number) => void
  updatePageSize: (newPageSize: number) => void
}

const options = [
  { label: '6', value: 6 },
  { label: '12', value: 12 },
  { label: '24', value: 24 },
]

export const CardsFooter: FC<PropsType> = ({
  paginationPage,
  updatePageSelect,
  updatePageSize,
}) => {
  return (
    <Container>
      <Pagination paginationPage={paginationPage} updatePageSelect={updatePageSelect} />
      <SelectStyles>
        <Select
          classNamePrefix={'react-select'}
          defaultValue={options && options[0]}
          isMulti={false}
          menuPlacement={'top'}
          name={''}
          onChange={newValue => updatePageSize(newValue ? newValue.value : 6)}
          options={options}
        />
      </SelectStyles>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
