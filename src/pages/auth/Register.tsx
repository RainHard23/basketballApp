import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { useActions } from '../../api/common/hooks/useActions'
import { colors } from '../../assests/styles/colors'
import Button from '../../common/components/ui/Button'
import { CheckBox } from '../../common/components/ui/CheckBox'
import { ControlledTextField } from '../../common/components/ui/controlledInput/ControlledInput'
import { authThunks } from '../../module/auth/authSlice'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import * as yup from 'yup'

export const Register = () => {
  type FormData = {
    check: boolean
    confirmPassword: string
    login: string
    password: string
    userName: string
  }

  const { registrationTC } = useActions(authThunks)

  const schema = yup.object().shape({
    check: yup
      .boolean()
      .oneOf([true], 'You must accept the agreement.')
      .required('You must accept the agreement.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match.')
      .required('Please confirm your password.'),
    login: yup.string().required('Login is required.'),
    password: yup
      .string()
      .min(4, 'Password must be at least 4 characters long.')
      .max(10, 'Password must be at most 10 characters long.')
      .required('Password is required.'),
    userName: yup.string().required('Name is required.'),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      check: false,
      confirmPassword: '',
      login: '',
      password: '',
      userName: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    const { login, password, userName } = data

    registrationTC({ login, password, userName })
  }

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <RegisterFormContainer>
      <DevTool control={control} />
      <WrapperTitle>
        <Title>Sign Up</Title>
      </WrapperTitle>
      <Form onSubmit={handleFormSubmitted}>
        <ControlledTextField
          control={control}
          errorMessage={errors.userName}
          label={'Name'}
          name={'userName'}
          type={'text'}
        />
        <ControlledTextField
          control={control}
          errorMessage={errors.login}
          label={'Login'}
          name={'login'}
          type={'text'}
        />
        <ControlledTextField
          control={control}
          errorMessage={errors.password}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <ControlledTextField
          control={control}
          errorMessage={errors.confirmPassword}
          label={'Enter your password again'}
          name={'confirmPassword'}
          type={'password'}
        />
        <CheckBox
          checked={watch('check')}
          control={control}
          errorMessage={errors.check}
          label={'I accept the agreement'}
          name={'check'}
        />
        <Button isAuth type={'submit'}>
          Sign Up
        </Button>
      </Form>
      <MemberContainer>
        <span>Already a member?</span>
        <MemberLink to={'/login'}>Sign In</MemberLink>
      </MemberContainer>
    </RegisterFormContainer>
  )
}

const MemberContainer = styled.div`
  display: flex;
  margin-top: 24px;

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

const RegisterFormContainer = styled.div`
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
  margin: 0 auto 32px auto;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: 400;
  color: ${colors.blue};
`
