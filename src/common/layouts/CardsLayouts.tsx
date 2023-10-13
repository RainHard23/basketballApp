import React, { FC, ReactNode } from 'react'

import { CardsFooter } from '../components/dashboard/entities/FooterCards'
import { CardsHeader } from '../components/dashboard/entities/HeaderCards'
import styled from 'styled-components'

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
      <CardsHeader linkPath={linkPath} updateSearchQuery={updateSearchQuery} />
      <ContentWrapper>{children}</ContentWrapper>
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
  padding: 0 12px;
`

const ContentWrapper = styled.div`
  margin: 0;
`
