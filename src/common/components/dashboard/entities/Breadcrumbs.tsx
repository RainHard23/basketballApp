import React, { FC } from 'react'
import styled from 'styled-components'
import { colors } from '../../../../assests/styles/colors'
import { NavLink } from 'react-router-dom'

type PropsType = {
  crumbs: Array<{ url: string; title?: string }>
}

export const Breadcrumbs: FC<PropsType> = ({ crumbs }) => {
  return (
    <Container>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb.title}>
          <TitleLink to={crumb.url}>{crumb.title}</TitleLink>
          {index < crumbs.length - 1 && <Slesh>&nbsp;/&nbsp;</Slesh>}
        </React.Fragment>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 0 24px 32px;
  display: flex;
`
const TitleLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${colors.red};
`
const Slesh = styled.span`
  color: ${colors.grey};
`
