import { FC } from 'react'

import { colors } from '../assests/styles/colors'
import styled from 'styled-components'

type EmpyProps = {
  Image: string
  Label: string
}

export const EmptyPage: FC<EmpyProps> = ({ Image, Label }) => {
  return (
    <Container>
      <Wrapper>
        <EmptyImage alt={'EmptyImage'} src={Image} />
        <Title>Empty Here</Title>
        <EmptyText>{Label}</EmptyText>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 139px 0;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  border-radius: 15px;
  max-width: 556px;
  padding: 48px 37px;
  text-align: center;
  width: 100%;
  background: ${colors.white};
`

const EmptyImage = styled.img`
  max-width: 100%;
  margin-bottom: 48px;
`

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 36px;
  font-weight: 800;
  color: ${colors.lightestRed};
`

const EmptyText = styled.p`
  font-weight: 400;
  font-size: 24px;
  color: ${colors.grey};
`
