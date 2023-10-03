import {BaseResponseType} from "../../../types/common.types";
import {instance} from "../../common/api/commonApi";
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<BaseResponseType>("api/Auth/SignIn", data);
    },

    register(data: RegisterParamsType) {
        return instance.post<BaseResponseType>("api/Auth/SignUp", data);
    },
    // me() {
    //     return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
    // },
};

export type LoginParamsType = {
    login: string;
    password: string;
};

export type RegisterParamsType = {
    userName: string;
    login: string;
    password: string;
};
