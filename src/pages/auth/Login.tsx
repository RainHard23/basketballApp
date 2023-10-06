import Button from "../../common/components/ui/Button";
import styled from "styled-components";
import {colors} from "../../assests/styles/colors";
import {authThunks} from "../../api/auth/authSlice";
import {useActions} from "../../api/common/hooks/useActions";
import {ControlledTextField} from "../../common/components/ui/ControlledInput/ControlledInput";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const Login = () => {

    const {loginTC} = useActions(authThunks);
    type FormData = {
        login: string;
        password: string;
    }




    const schema = yup.object().shape({
        login: yup.string().required('Login is required.'),
        password: yup.string()
            .min(4, 'Password must be at least 4 characters long.')
            .max(10, 'Password must be at most 10 characters long.')
            .required('Password is required.'),
    });

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            login: '',
            password: '',
        },
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const { login, password } = data;

        loginTC({ login, password });
    };

    const handleFormSubmitted = handleSubmit(onSubmit);

    return (
        <LoginFormContainer>
            <WrapperTitle>
                <Title>Sign In</Title>
            </WrapperTitle>
            <Form onSubmit={handleFormSubmitted}>
                <ControlledTextField
                    control={control}
                    type="text"
                    label="Login"
                    name="login"
                    errorMessage={errors.login}
                />
                <ControlledTextField
                    control={control}
                    name="password"
                    type="password"
                    label="Password"
                    errorMessage={errors.password}
                />
                <Button>Sign In</Button>
            </Form>
        </LoginFormContainer>
    );
};


const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const Form = styled.form`
  max-width: 366px;
  width: 100%;
  margin: 0 auto;

  & div {
    margin-bottom: 24px;
  }
`;

const WrapperTitle = styled.div`
  max-width: 366px;
  width: 100%;
  margin: 0 auto 32px auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 400;
  color: ${colors.blue};
`;
