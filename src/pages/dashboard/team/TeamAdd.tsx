import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useActions } from '../../../api/common/hooks/useActions'
import { colors } from '../../../assests/styles/colors'
import Button from '../../../common/components/ui/Button'
import { ControlledInputFile } from '../../../common/components/ui/CustomInputFile'
import { ControlledTextField } from '../../../common/components/ui/controlledInput/ControlledInput'
import { Input } from '../../../common/components/ui/controlledInput/Input'
import { authThunks } from '../../../module/auth/authSlice'
import { teamsThunks } from '../../../module/teams/teamsSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import * as yup from 'yup'

type FormData = {
  conference: string
  division: string
  foundationYear: number
  imageUrl: any
  name: string
}

export const TeamFormAdd = () => {
  const [isImageVisible, setIsImageVisible] = useState<null | string>(null)
  const navigate = useNavigate()
  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = e => {
        if (e.target) {
          setValue('imageUrl', e.target.result)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setValue('imageUrl', null)
    }
  }
  const { addTeamTC } = useActions(teamsThunks)
  const schema = yup.object().shape({
    conference: yup.string().required('Conference is required.'),
    division: yup.string().required('Division is required.'),
    foundationYear: yup.number().required('Year of foundation is required.'),
    imageUrl: yup.mixed().required('Image is required'),
    name: yup.string().required('Name is required.'),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      conference: '',
      division: '',
      foundationYear: 1973,
      imageUrl: null,
      name: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    addTeamTC(data)
    reset()
    setIsImageVisible('')
    setValue('imageUrl', '')
  }

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <Container>
      <Form onSubmit={handleFormSubmitted}>
        <AddImg>
          <ControlledInputFile
            control={control}
            errorMessage={errors?.imageUrl?.message}
            imagevisible={isImageVisible}
            name={'imageUrl'}
            selectFile={handleFileSelect}
          />
        </AddImg>
        <ContainerInput>
          <WrapperItem>
            <ControlledTextField
              control={control}
              errorMessage={errors}
              label={'Name'}
              name={'name'}
              type={'text'}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors}
              label={'Division'}
              name={'division'}
              type={'text'}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors}
              label={'Conference'}
              name={'conference'}
              type={'text'}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors}
              label={'Year of foundation'}
              name={'foundationYear'}
              type={'text'}
            />
            <ButtonsWrapper>
              <Button isCancel onClick={() => navigate(-1)} type={'reset'}>
                Cancel
              </Button>
              <Button type={'submit'}>Save</Button>
            </ButtonsWrapper>
          </WrapperItem>
        </ContainerInput>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${colors.white};
`
const ContainerInput = styled.div`
  display: flex;
  width: 130%;
`
const Form = styled.form`
  display: flex;
  padding: 48px 24px;
  height: 100%;
`

const AddImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  height: 100%;
`

const WrapperItem = styled.div`
  max-width: 366px;
  width: 100%;

  & div {
    margin-bottom: 24px;
  }
`

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
`
