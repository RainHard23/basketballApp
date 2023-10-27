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
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)

    if (timerId) {
      clearTimeout(timerId)
    }

    const newTimerId = setTimeout(() => {
      updateSearchQuery(value)
    }, 1000)

    setTimerId(newTimerId)
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
        <Button>Add +</Button>
      </AddButtonLink>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and ${breakpoints.tablet} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const ContainerItems = styled.div`
  width: 100%;
`

const AddButtonLink = styled(NavLink)`
  margin-left: 12px;
  margin-right: 12px;
  width: 104px;
  text-decoration: none;

  @media screen and ${breakpoints.tablet} {
    margin-top: 16px;
    max-width: 364px;
    width: 100%;
  }
`
