import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import imgLogin from '../../assests/images/imgLogin.png'
import imgRegister from '../../assests/images/imgRegistr.png'
import { colors } from '../../assests/styles/colors'
import { selectIsLoggedIn } from '../../module/auth/auth.selectors'
import styled from 'styled-components'
import { ErrorSnackbar } from '../components/ErorBar'

const AuthLayout = () => {
  const location = useLocation()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={'/'} />
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

const WrapperTitle = styled.div`
  max-width: 366px;
  width: 100%;
  margin: 0 auto 32px auto;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: 400;
  color: ${colors.blue};
`

const AuthRightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130%;
  height: 100%;
  background-color: #f5fbff;
`

const Img = styled.img`
  max-height: 100%;
`

export default AuthLayout
