type FieldErrorType = {
  error: string
  field: string
}

export type BaseResponseType<D = {}> = {
  data: D
  fieldsErrors: FieldErrorType[]
  message: string
  resultCode: number
  token: BaseResponseType<{}>
}
