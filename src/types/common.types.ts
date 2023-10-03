type FieldErrorType = {
    error: string;
    field: string;
};

export type BaseResponseType<D = {}> = {
    token: BaseResponseType<{}>;
    resultCode: number;
    messages: Array<string>;
    data: D;
    fieldsErrors: FieldErrorType[];
};
