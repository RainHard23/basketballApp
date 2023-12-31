import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

import imgLogin from '../../assests/images/imgLogin.png'
import imgRegister from '../../assests/images/imgRegistr.png'
import { colors } from '../../assests/styles/colors'
import { selectIsLoggedIn } from '../../module/auth/auth.selectors'
import styled from 'styled-components'
import { ErrorSnackbar } from '../components/ErorBar'
import { breakpoints } from '../../assests/styles/adaptive'

const AuthLayout = () => {
  const location = useLocation()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    window.location.href = '/'
  }

  return (
    <AuthContainerLayout>
      <AuthLeftSide>
        <ErrorSnackbar />
        <Outlet />
      </AuthLeftSide>
      <AuthRightSide>
        {location && location.pathname == '/login' ? (
          <Img src={imgRegister} />
        ) : (
          <Img src={imgLogin} />
        )}
      </AuthRightSide>
    </AuthContainerLayout>
  )
}

const AuthContainerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const AuthLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  width: 100%;
  height: 100%;
`

const AuthRightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130%;
  height: 100%;
  background-color: #f5fbff;

  @media ${breakpoints.laptop} {
    display: none;
  }
`

const Img = styled.img`
  max-height: 100%;
`

export default AuthLayout
