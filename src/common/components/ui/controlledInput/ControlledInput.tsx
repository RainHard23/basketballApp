import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Input, InputProps } from './Input'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<InputProps, 'id' | 'onChange' | 'value'>

export const ControlledTextField = <TFieldValues extends FieldValues>(
  props: ControlledTextFieldProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return <Input {...props} {...field} errorMessage={error?.message} id={props.name} />
}
