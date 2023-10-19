import React, { FC, ReactNode } from 'react'

import { CardsFooter } from '../components/dashboard/entities/FooterCards'
import { CardsHeader } from '../components/dashboard/entities/HeaderCards'
import styled from 'styled-components'
import { breakpoints } from '../../assests/styles/adaptive'
import { ErrorSnackbar } from '../components/ErorBar'

type PropsType = {
  children: ReactNode
  linkPath: string
  paginationPage?: number
  updatePageSelect: (newPageSelect: number) => void
  updatePageSize: (newPageSize: number) => void
  updateSearchQuery: (value: string) => void
}

export const CardsdLayouts: FC<PropsType> = ({
  children,
  linkPath,
  paginationPage,
  updatePageSelect,
  updatePageSize,
  updateSearchQuery,
}) => {
  return (
    <CardsContainer>
      <ErrorSnackbar />
      <CardsHeader linkPath={linkPath} updateSearchQuery={updateSearchQuery} />
      <CardsWrapper>{children}</CardsWrapper>
      <CardsFooter
        paginationPage={paginationPage}
        updatePageSelect={updatePageSelect}
        updatePageSize={updatePageSize}
      />
    </CardsContainer>
  )
}

const CardsContainer = styled.section`
  display: flex;
  flex-direction: column;

  @media screen and ${breakpoints.tablet} {
    padding: 0 12px;
  }
`

const CardsWrapper = styled.div`
  margin: 0;
  min-height: 700px;
`
