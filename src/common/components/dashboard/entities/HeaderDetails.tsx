import React, { FC } from 'react'
import iconDelete from '../../../../assests/icons/iconDelete.svg'
import iconEdit from '../../../../assests/icons/iconEdit.svg'
import styled from 'styled-components'
import { colors } from '../../../../assests/styles/colors'
import { Breadcrumbs } from './Breadcrumbs'
import { NavLink } from 'react-router-dom'

type PropsType = {
  crumbs: Array<{ url: string; title?: string }>
  onDeleteTeam: () => void
  editPath: string
  pathRedirect: string
}

export const HeaderDetails: FC<PropsType> = ({ crumbs, onDeleteTeam, editPath, pathRedirect }) => {
  return (
    <Container>
      <Breadcrumbs crumbs={crumbs} />
      <ContainerItem>
        <Icon to={editPath}>
          <img src={iconEdit} alt="" />
        </Icon>
        <Icon to={pathRedirect} onClick={onDeleteTeam}>
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
const Icon = styled(NavLink)`
  margin-left: 16px;
  background-color: #fff;
`
