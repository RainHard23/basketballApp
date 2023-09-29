import AuthLayout from "../AuthLayout";
import {FC} from "react";
import imgRegist from '../../../assests/images/imgRegistr.png'
import {Link} from "../../../common/components/ui/NavLink";
import {RegistrationForm} from "./components/RegistrationForm";

export const Registration: FC = () => {
    const memberLink = <Link to={'/'}>Sign in</Link>;
    const member = 'Already a member?';

    return (
        <AuthLayout titleAuth="Sign Up" img={imgRegist} member={member} link={memberLink}>
            <RegistrationForm />
        </AuthLayout>
    );
};
