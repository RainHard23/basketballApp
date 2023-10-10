import { NavLink } from 'react-router-dom'

import { colors } from '../../../assests/styles/colors'
import styled from 'styled-components'

export const Link = styled(NavLink)`
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.red};
`
