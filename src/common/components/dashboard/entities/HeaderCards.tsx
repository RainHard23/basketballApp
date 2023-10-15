import { ChangeEvent, FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Button from '../../ui/Button'
import { Input } from '../../ui/controlledInput/Input'
import styled from 'styled-components'
import { breakpoints } from '../../../../assests/styles/adaptive'

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
    <Container>
      <ContainerItems>
        <Input
          name={''}
          placeholder={'Search'}
          type={'search'}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </ContainerItems>
      <AddButtonLink to={linkPath}>
        <Button isAdd>Add +</Button>
      </AddButtonLink>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and ${breakpoints.tablet} {
    flex-direction: column;
    justify-content: center;
  }
`

const ContainerItems = styled.div`
  width: 100%;
`

const AddButtonLink = styled(NavLink)`
  max-width: 104px;
  width: 100%;
  text-decoration: none;

  @media screen and ${breakpoints.tablet} {
    margin-top: 16px;
  }
`
