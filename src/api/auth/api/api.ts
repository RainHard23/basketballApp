import {BaseResponseType} from "../../../types/common.types";
import {instance} from "../../common/api/commonApi";


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
