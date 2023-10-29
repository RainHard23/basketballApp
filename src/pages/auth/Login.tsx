import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { useActions } from '../../api/common/hooks/useActions'
import { colors } from '../../assests/styles/colors'
import Button from '../../common/components/ui/Button'
import { ControlledTextField } from '../../common/components/ui/controlledInput/ControlledInput'
import { authThunks } from '../../module/auth/authSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import * as yup from 'yup'

type FormData = {
  login: string
  password: string
}
export const Login = () => {
  const { loginTC } = useActions(authThunks)

  const schema = yup.object().shape({
    login: yup.string().required('Login is required.'),
    password: yup
      .string()
      .min(4, 'Password must be at least 4 characters long.')
      .max(10, 'Password must be at most 10 characters long.')
      .required('Password is required.'),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    const { login, password } = data

    loginTC({ login, password })
  }

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <LoginFormContainer>
      <WrapperTitle>
        <Title>Sign In</Title>
      </WrapperTitle>
      <Form onSubmit={handleFormSubmitted}>
        <ControlledTextField control={control} label={'Login'} name={'login'} type={'text'} />
        <ControlledTextField
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Button isAuth type={'submit'}>
          Sign In
        </Button>
      </Form>

      <MemberContainer>
        <span>Not a member yet?</span>
        <MemberLink to={'/register'}>Sign Up</MemberLink>
      </MemberContainer>
    </LoginFormContainer>
  )
}

const MemberContainer = styled.div`
  display: flex;

  & span {
    margin-right: 5px;
    color: ${colors.grey};
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }
`

const MemberLink = styled(NavLink)`
  color: ${colors.red};
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  max-width: 366px;
  width: 100%;
  margin: 0 auto;
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
