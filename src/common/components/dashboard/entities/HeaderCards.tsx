import { ChangeEvent, FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Button from '../../ui/Button'
import { Input } from '../../ui/controlledInput/Input'
import styled from 'styled-components'

type Props = {
  linkPath: string
  updateSearchQuery: (value: string) => void
}

export const CardsHeader: FC<Props> = ({ linkPath, updateSearchQuery }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)
    updateSearchQuery(value)
  }
  return (
    <Wrapper>
      <FilterContainer>
        <Input
          name={''}
          placeholder={'Search'}
          type={'search'}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </FilterContainer>
      <AddLink to={linkPath}>
        <Button isAdd>Add +</Button>
      </AddLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const FilterContainer = styled.div`
  width: 100%;
`

const AddLink = styled(NavLink)`
  max-width: 104px;
  width: 100%;
  text-decoration: none;
`
