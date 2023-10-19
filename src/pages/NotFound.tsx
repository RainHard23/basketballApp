import { FC } from 'react'
import notFound from '../assests/images/404.png'
import { colors } from '../assests/styles/colors'
import styled from 'styled-components'
import { breakpoints } from '../assests/styles/adaptive'

export const NotFound: FC = () => {
  return (
    <Container>
      <Wrapper>
        <EmptyImage alt={'EmptyImage'} src={notFound} />
        <Title>Page not found</Title>
        <EmptyText>Sorry, we can’t find what you’re looking for</EmptyText>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`

const Wrapper = styled.div`
  border-radius: 15px;
  max-width: 556px;
  text-align: center;
  width: 100%;
  background: ${colors.white};
`

const EmptyImage = styled.img`
  max-width: 100%;
  margin-bottom: 48px;

  @media screen and ${breakpoints.tablet} {
    max-width: 275px;
    max-height: 153px;
  }
`

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 36px;
  font-weight: 800;
  color: ${colors.lightestRed};

  @media screen and ${breakpoints.tablet} {
    font-size: 17px;
  }
`

const EmptyText = styled.p`
  font-weight: 400;
  font-size: 24px;
  color: ${colors.grey};

  @media screen and ${breakpoints.tablet} {
    font-size: 17px;
  }
`
