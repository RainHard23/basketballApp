import { DevTool } from '@hookform/devtools'
import {CheckBox} from "../../common/components/ui/CheckBox";
import styled from "styled-components";
import {colors} from "../../assests/styles/colors";
import {useActions} from "../../api/common/hooks/useActions";
import {authThunks} from "../../module/auth/authSlice";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Input} from "../../common/components/ui/Input";
import {ControlledTextField} from "../../common/components/ui/ControlledInput/ControlledInput";
import Button from "../../common/components/ui/Button";
import {NavLink} from "react-router-dom";

export const Register = () => {
    type FormData = {
        userName: string;
        login: string;
        password: string;
        confirmPassword: string;
        check: boolean
    }


    const {registrationTC} = useActions(authThunks);



    const schema = yup.object().shape({
        userName: yup.string().required('Name is required.'),
        login: yup.string().required('Login is required.'),
        password: yup.string()
            .min(4, 'Password must be at least 4 characters long.')
            .max(10, 'Password must be at most 10 characters long.')
            .required('Password is required.'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match.')
            .required('Please confirm your password.'),
        check: yup.boolean()
            .oneOf([true], 'You must accept the agreement.')
            .required('You must accept the agreement.'),
    });

    const {
        watch,
        control,
        handleSubmit,
        formState:{ errors }
    } = useForm<FormData>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            userName: '',
            login: '',
            password: '',
            confirmPassword: '',
            check: false
        },
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const { userName, login, password } = data;

        registrationTC({ userName, login, password });
    };

    const handleFormSubmitted = handleSubmit(onSubmit);




    return (

        <RegisterFormContainer>
            <DevTool control={control} />
            <WrapperTitle>
                <Title>Sign Up</Title>
            </WrapperTitle>
            <Form onSubmit={handleFormSubmitted}>

                <ControlledTextField
                    control={control}
                    type="text"
                    label="Name"
                    name={'userName'}
                    errorMessage={errors.userName}
                />
                <ControlledTextField
                    control={control}
                    type="text"
                    label="Login"
                    name={'login'}

                    errorMessage={errors.login}
                />
                <ControlledTextField
                    control={control}
                    type="password"
                    label="Password"
                    name={'password'}

                    errorMessage={errors.password}
                />
                <ControlledTextField
                    control={control}
                    type="password"
                    label="Enter your password again"
                    name={'confirmPassword'}

                    errorMessage={errors.confirmPassword}
                />
                <CheckBox
                    control={control}
                    checked={watch('check')}
                    errorMessage={errors.check}
                    name={'check'}
                    label={"I accept the agreement"}/>
               <Button type={'submit'} isAuth={true}>Sign Up</Button>
            </Form>
            <MemberContainer>
                <span>Already a member?</span>
                <MemberLink to={'/login'}>Sign In</MemberLink>
            </MemberContainer>
        </RegisterFormContainer>
    );
};

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

`;

const Form = styled.form`
  max-width: 366px;
  width: 100%;
  margin: 0 auto;
  
  
`;

const WrapperTitle = styled.div`
 
  
  margin: 0 auto 32px auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 400;
  color: ${colors.blue};
`;
