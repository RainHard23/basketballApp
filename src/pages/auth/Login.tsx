import Input from "../../common/components/ui/Input";
import Button from "../../common/components/ui/Button";
import styled from "styled-components";
import {colors} from "../../assests/styles/colors";


export const Login = () => {

    const submitForm = (e: any) => {
        e.preventDefault();
        alert('Send!')
    }

    return (
        <LoginFormContainer>
            <WrapperTitle>
                <Title>Sign In</Title>
            </WrapperTitle>
            <Form onSubmit={submitForm}>
                <Input
                    type="text"
                    label="Login"
                    name="login"
                />
                <Input
                    name="password"
                    type="password"
                    label="Password"
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
