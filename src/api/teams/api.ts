import {instance} from "../common/api/commonApi";
import {BaseResponseType} from "../../types/common.types";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<BaseResponseType>("api/Auth/SignIn", data);
    },

    register(data: RegisterParamsType) {
        return instance.post<BaseResponseType>("api/Auth/SignUp", data);
    },
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
