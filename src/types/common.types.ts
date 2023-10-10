type FieldErrorType = {
  error: string
  field: string
}

export type BaseResponseType<D = {}> = {
  data: D
  fieldsErrors: FieldErrorType[]
  messages: Array<string>
  resultCode: number
  token: BaseResponseType<{}>
}
