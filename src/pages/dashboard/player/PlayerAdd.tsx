import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useActions } from '../../../api/common/hooks/useActions'
import { PlayerType } from '../../../api/players/api'
import { colors } from '../../../assests/styles/colors'
import Button from '../../../common/components/ui/Button'
import { ControlledInputFile } from '../../../common/components/ui/CustomInputFile'
import { ControlledTextField } from '../../../common/components/ui/controlledInput/ControlledInput'
import { Input } from '../../../common/components/ui/controlledInput/Input'
import { Select1 } from '../../../common/components/ui/select/Select'
import { playersThunks } from '../../../module/players/playersSlice'
import { teamsSelector } from '../../../module/teams/teamsSelectors'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import * as yup from 'yup'
import { selectAppStatus } from '../../../module/app/appSelectors'
import { Loader } from '../../../common/components/Loader'
import { teamsThunks } from '../../../module/teams/teamsSlice'

type FormDataType = {
  avatarUrl: any
  birthday: Date
  height: number
  name: string
  number: number
  position: string
  team: number
  weight: number
}

const optionsPosition = [
  { label: 'Center Forward', value: 'Center Forward' },
  { label: 'Guard Forward', value: 'Guard Forward' },
  { label: 'Forward', value: 'Forward' },
  { label: 'Center', value: 'Center' },
  { label: 'Guard', value: 'Guard' },
]

export const PlayerFormAdd = () => {
  const status = useSelector(selectAppStatus)
  const { dataTeams } = useSelector(teamsSelector)
  const [isImageVisible, setIsImageVisible] = useState<null | string>(null)
  const optionsTeams = dataTeams.map(team => ({
    label: team.name,
    value: team.id,
  }))

  const { addPlayerTC } = useActions(playersThunks)
  const navigate = useNavigate()
  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = e => {
        if (e.target) {
          setValue('avatarUrl', e.target.result)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setValue('avatarUrl', null)
    }
  }

  const schema = yup.object().shape({
    avatarUrl: yup.mixed().required('Image is required'),
    birthday: yup.date().required('Year of foundation is required.'),
    height: yup.number().required('Height is required'),
    name: yup.string().required('Name is required.'),
    number: yup.number().required('Division is required.'),
    position: yup.string().required('Position is required.'),
    team: yup.number().required('Image is required'),
    weight: yup.number().required('Weight is required'),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      height: 0,
      name: '',
      number: 0,
      position: '',
      team: '',
      weight: 0,
    },
  })

  const onSubmit: SubmitHandler<FormDataType> = data => {
    addPlayerTC(data)
    reset()
    setIsImageVisible('')
  }

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <Container>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <Form onSubmit={handleFormSubmitted}>
          <AddImg>
            <ControlledInputFile
              control={control}
              errorMessage={errors?.avatarUrl?.message}
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
              <ContainerSelect>
                <Select1
                  control={control}
                  isMulti={false}
                  label={'Position'}
                  name={'position'}
                  options={optionsPosition}
                />
              </ContainerSelect>
              <ContainerSelect>
                <Select1
                  control={control}
                  isMulti={false}
                  label={'Team'}
                  name={'team'}
                  options={optionsTeams}
                />
              </ContainerSelect>
              <ContainerInputDetail>
                <ControlledTextField
                  control={control}
                  errorMessage={errors}
                  label={'Height (cm)'}
                  name={'height'}
                  type={'number'}
                />
                <ControlledTextField
                  control={control}
                  errorMessage={errors}
                  label={'Weight (kg)'}
                  name={'weight'}
                  type={'number'}
                />
                <ControlledTextField
                  control={control}
                  errorMessage={errors}
                  label={'Birthday'}
                  name={'birthday'}
                  placeholder={'sss'}
                  type={'date'}
                />
                <ControlledTextField
                  control={control}
                  errorMessage={errors}
                  label={'Number'}
                  name={'number'}
                  type={'number'}
                />
              </ContainerInputDetail>
              <ButtonsWrapper>
                <Button isCancel onClick={() => navigate(-1)} type={'reset'}>
                  Cancel
                </Button>
                <Button>Save</Button>
              </ButtonsWrapper>
            </WrapperItem>
          </ContainerInput>
        </Form>
      )}
    </Container>
  )
}

const ContainerSelect = styled.div`
  margin-top: 24px;
`

const ContainerInputDetail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 24px;

  & > div {
    max-width: 171px;
    width: 100%;
  }
`

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
`

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  margin-top: 24px;
`
