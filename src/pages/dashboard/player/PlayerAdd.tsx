import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useActions } from '../../../api/common/hooks/useActions'
import { colors } from '../../../assests/styles/colors'
import Button from '../../../common/components/ui/Button'
import { ControlledInputFile } from '../../../common/components/ui/CustomInputFile'
import { ControlledTextField } from '../../../common/components/ui/controlledInput/ControlledInput'
import { CustomSelect } from '../../../common/components/ui/select/Select'
import { playersThunks } from '../../../module/players/playersSlice'
import { teamsSelector } from '../../../module/teams/teamsSelectors'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import * as yup from 'yup'
import { selectAppStatus } from '../../../module/app/appSelectors'
import { Loader } from '../../../common/components/Loader'
import { Breadcrumbs } from '../../../common/components/dashboard/entities/Breadcrumbs'
import { teamsThunks } from '../../../module/teams/teamsSlice'
import { usePlayerPositions } from '../../../core/helpers/getPosition'
import { ErrorSnackbar } from '../../../common/components/ErorBar'
import { breakpoints } from '../../../assests/styles/adaptive'

type FormDataType = {
  avatarUrl: string
  birthday: Date
  height: number
  name: string
  number: number
  position: string
  team: number
  weight: number
  imageFile: File
}

export const PlayerFormAdd = () => {
  const { pathname } = useLocation()
  const { getTeamsTC } = useActions(teamsThunks)
  const status = useSelector(selectAppStatus)
  const { dataTeams } = useSelector(teamsSelector)
  const { getPositionPlayerTC } = useActions(playersThunks)
  const { positionOptions } = usePlayerPositions()
  const [isImageVisible, setIsImageVisible] = useState<null | string>(null)
  const optionsTeams = dataTeams.map(team => ({
    label: team.name,
    value: team.id,
  }))

  useEffect(() => {
    getTeamsTC({ paramsQuery: { page: 1, pageSize: 24 } })
    getPositionPlayerTC()
  }, [])

  const { addPlayerTC } = useActions(playersThunks)
  const navigate = useNavigate()
  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = e => {
        if (e.target) {
          setValue('imageFile', file)
          setValue('avatarUrl', '13123')
        }
      }
      reader.readAsDataURL(file)
    } else {
      setValue('avatarUrl', null)
    }
  }

  const schema = yup.object().shape({
    avatarUrl: yup.mixed().required('Image is required'),
    birthday: yup
      .date()
      .max(new Date(), 'Date of birth cannot be in the future.')
      .min(new Date('1700-01-01'), 'Date of birth should be after 1700.')
      .required('Date of birth is required.'),
    name: yup.string().required('Name is required.').max(50, 'Name must be at most 50 characters'),
    team: yup.number().required('Team is required'),
    position: yup.string().required('Position is required.'),
    number: yup
      .number()
      .typeError('Division must be a number.')
      .min(0, 'Division must be at least 0.')
      .max(100, 'Division must be at most 100.')
      .required('Division is required.'),

    weight: yup
      .number()
      .typeError('Weight must be a number.')
      .min(50, 'Weight must be at least 50.')
      .max(200, 'Weight must be at most 200.')
      .required('Weight is required.'),

    height: yup
      .number()
      .typeError('Height must be a number.')
      .min(150, 'Height must be at least 150.')
      .max(240, 'Height must be at most 240.')
      .required('Height is required.'),
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
  })

  const onSubmit: SubmitHandler<FormDataType> = data => {
    addPlayerTC(data)
    navigate('/players')
    reset()
    setIsImageVisible('')
  }

  const handleFormSubmitted = handleSubmit(onSubmit)
  const crumbs = [
    { title: 'Player', url: '/players' },
    { title: 'Add new player', url: pathname },
  ]
  return (
    <Container>
      <ErrorSnackbar />
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs crumbs={crumbs} />
          <Form onSubmit={handleFormSubmitted}>
            <AddImg>
              <ControlledInputFile
                control={control}
                errorMessage={errors.avatarUrl}
                imagevisible={isImageVisible}
                name={'avatarFile'}
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
                  <CustomSelect
                    errorMessage={errors.position?.message}
                    control={control}
                    isMulti={false}
                    label={'Position'}
                    name={'position'}
                    options={positionOptions}
                  />
                </ContainerSelect>
                <ContainerSelect>
                  <CustomSelect
                    errorMessage={errors?.team?.message}
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
        </>
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
  border-radius: 15px;
`
const ContainerInput = styled.div`
  display: flex;
  width: 130%;

  @media screen and ${breakpoints.desktop} {
    width: 100%;
  }

  @media screen and ${breakpoints.nextHub} {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`
const Form = styled.form`
  display: flex;
  padding: 48px 24px 48px 74px;
  height: 100%;

  @media screen and ${breakpoints.nextHub} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px 48px 24px;
  }
  @media screen and ${breakpoints.nextHub} {
    padding: 48px 24px 48px 24px;
  }
`

const AddImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  height: 100%;

  @media screen and ${breakpoints.nextHub} {
    align-items: center;
  }

  @media screen and ${breakpoints.tablet} {
    max-width: 250px;
    max-height: 200px;
  }

  @media screen and ${breakpoints.mediumMobile} {
    max-width: 185px;
    max-height: 144px;
  }
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
