import React, { FC } from 'react'
import iconDelete from '../../../../assests/icons/iconDelete.svg'
import iconEdit from '../../../../assests/icons/iconEdit.svg'
import styled from 'styled-components'
import { colors } from '../../../../assests/styles/colors'
import { Breadcrumbs } from './Breadcrumbs'

type PropsType = {
  crumbs: Array<{ url: string; title?: string }>
}

export const HeaderDetails: FC<PropsType> = ({ crumbs }) => {
  return (
    <Container>
      <Breadcrumbs crumbs={crumbs} />
      <ContainerItem>
        <Icon>
          <img src={iconEdit} alt="" />
        </Icon>
        <Icon>
          <img src={iconDelete} alt="" />
        </Icon>
      </ContainerItem>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: 1px solid ${colors.lightGrey};
`
const ContainerItem = styled.div`
  display: flex;
  padding-right: 32px;
`
const Icon = styled('button')`
  margin-left: 16px;
  background-color: #fff;
`
