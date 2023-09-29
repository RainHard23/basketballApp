import styled from "styled-components";
import Input from "../../../../common/components/ui/Input";
import Button from "../../../../common/components/ui/Button";
import {CheckBox} from "../../../../common/components/ui/CheckBox";

export const RegistrationForm = () => {
    return (
        <LoginFormContainer>
            <Form>
                <Input
                    type="text"
                    label="Name"
                    name="name"
                />
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
                <Input
                    name="confirmPassword"
                    type="password"
                    label="Enter your password again"
                />
                <CheckBox label={'I accept the agreement'}/>
                <Button>Sign up</Button>
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
