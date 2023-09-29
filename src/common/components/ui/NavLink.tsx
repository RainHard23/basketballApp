import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {colors} from "../../../assests/styles/colors";

export const Link = styled(NavLink)`
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.red}
`