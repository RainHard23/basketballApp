import AuthLayout from "../AuthLayout";
import { FC } from "react";
import imgLogin from '../../../assests/images/imgLogin.png'
import { LoginForm } from "./components/LoginForm";
import { Link } from "../../../common/components/ui/NavLink";

export const Login: FC = () => {
    const memberLink = <Link to={'/'}>Sign up</Link>;
    const member = 'Not a member yet?';

    return (
        <AuthLayout titleAuth="Sign In" img={imgLogin} member={member} link={memberLink}>
            <LoginForm />
        </AuthLayout>
    );
};
