import { useForm } from 'react-hook-form';
import { useActions } from '../hooks/useActions';
import { authThunks } from '../../auth/authSlice';
import { BaseResponseType } from '../../../types/common.types';

import { LoginParamsType } from '../../auth/api/api';

type FormErrorType = Partial<Omit<LoginParamsType, 'captcha'>>;

export const useLogin = () => {
  const { login } = useActions(authThunks);// @ts-ignore
  const { register, handleSubmit, errors } = useForm<FormErrorType>();
// @ts-ignore


  const onSubmit = async (values, formikHelpers) => {
    login(values)
        .unwrap()
        .catch((reason: BaseResponseType) => {
          // reason.fieldsErrors?.forEach((fieldError) => {
          //   formikHelpers.setFieldError(fieldError.field, fieldError.error);
          // });
        });
  };

  return {
    register,// @ts-ignore
    // @ts-ignore handleSubmit(onSubmit),
    errors,
  };
};
