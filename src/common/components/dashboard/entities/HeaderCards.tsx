import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import Button from '../../ui/Button'
import { Input } from '../../ui/controlledInput/Input'
import styled from 'styled-components'

type Props = {
  linkPath: string
}

export const CardsHeader: FC<Props> = ({ linkPath }) => {
  return (
    <Wrapper>
      <FilterContainer>
        <Input name={''} placeholder={'Search'} type={'search'} />
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
