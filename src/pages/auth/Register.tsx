import Input from "../../common/components/ui/Input";
import {CheckBox} from "../../common/components/ui/CheckBox";
import Button from "../../common/components/ui/Button";
import styled from "styled-components";
import {colors} from "../../assests/styles/colors";
import {useActions} from "../../api/common/hooks/useActions";
import {authThunks} from "../../api/auth/authSlice";
import {SubmitHandler, useForm} from "react-hook-form";

export const Register = () => {
    type FormData = {
        userName: string;
        login: string;
        password: string;
        confirmPassword: string;
    }


    const {register} = useActions(authThunks);

    const {

        handleSubmit,
        watch,

    } = useForm<FormData>()
    const onSubmit: SubmitHandler<FormData> = (data) => {

    }




    return (
        <RegisterFormContainer>
            <WrapperTitle>
                <Title>Sign Up</Title>
            </WrapperTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Input
                    type="text"
                    label="Name"
                    name='userName'

                />
                <Input
                    type="text"
                    label="Login"
                    name="login"  />
                <Input
                    name="password"
                    type="password"
                    label="Password"

                />
                <Input
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"

                    // validate={(value: string) =>
                    //     value === watch("password") || "Passwords do not match"
                    // }
                />
                <CheckBox label={"I accept the agreement"} />
                <Button >Sign Up</Button>
            </Form>
        </RegisterFormContainer>
    );
};

const RegisterFormContainer = styled.div`
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
