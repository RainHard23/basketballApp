import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

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
import { usePlayerPositions } from '../../../core/helpers/getPosition'
import { playersPlayerSelector } from '../../../module/players/playersSelectors'
import { breakpoints } from '../../../assests/styles/adaptive'
import { date } from 'yup'

type FormDataType = {
  avatarUrl: string
  birthday: string
  height: number
  name: string
  number: number
  position: string
  team: number
  weight: number
  imageFile?: File
}

export const PlayerFormEdit = () => {
  const { positionOptions } = usePlayerPositions()
  const { id } = useParams<{ id?: string }>()
  const { pathname } = useLocation()
  const status = useSelector(selectAppStatus)
  const { dataTeams } = useSelector(teamsSelector)
  const [isImageVisible, setIsImageVisible] = useState<null | string>(null)
  const { updatePlayerTC, getPlayersIdTC } = useActions(playersThunks)
  const prevPlayerData = useSelector(playersPlayerSelector)

  useEffect(() => {
    getPlayersIdTC({ id: Number(id) })
  }, [])

  const optionsTeams = dataTeams.map(team => ({
    label: team.name,
    value: team.id,
  }))

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
      setValue('avatarUrl', 'null')
    }
  }

  const schema = yup.object().shape({
    avatarUrl: yup.string().required('Image is required'),
    birthday: yup.string().required('Date of birth is required.'),
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

  const prevDate = prevPlayerData && new Date(prevPlayerData?.birthday)
  const day = prevDate && ('0' + prevDate.getDate()).slice(-2)
  const month = prevDate && ('0' + (prevDate.getMonth() + 1)).slice(-2)
  const prevDatePlayer = prevDate && prevDate.getFullYear() + '-' + month + '-' + day

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormDataType>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      avatarUrl: prevPlayerData?.avatarUrl,
      height: prevPlayerData?.height,
      name: prevPlayerData?.name,
      number: prevPlayerData?.number,
      position: prevPlayerData?.position,
      team: prevPlayerData?.team,
      weight: prevPlayerData?.weight,
      birthday: prevDate && prevDatePlayer,
    },
  })
  const imageUrlLogo = prevPlayerData?.avatarUrl
  const onSubmit: SubmitHandler<FormDataType> = data => {
    const updatedTeamData = {
      model: {
        imageUrlLogo,
        id: Number(id),
        ...data,
      },
    }
    updatePlayerTC(updatedTeamData)
    setIsImageVisible('')
    navigate('/players')
  }

  const handleFormSubmitted = handleSubmit(onSubmit)
  const crumbs = [
    { title: 'Players', url: '/players' },
    { title: 'Add new player', url: pathname },
  ]
  return (
    <Container>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs crumbs={crumbs} />
          <Form onSubmit={handleFormSubmitted}>
            <AddImg>
              <ControlledInputFile
                control={control}
                errorMessage={errors?.avatarUrl}
                imagevisible={
                  !isImageVisible && id
                    ? 'http://dev.trainee.dex-it.ru' + prevPlayerData?.avatarUrl
                    : isImageVisible
                }
                name={'avatarUrl'}
                selectFile={handleFileSelect}
              />
            </AddImg>
            <ContainerInput>
              <WrapperItem>
                <ControlledTextField control={control} label={'Name'} name={'name'} type={'text'} />
                <ContainerSelect>
                  <CustomSelect
                    errorMessage={errors?.position}
                    control={control}
                    isMulti={false}
                    label={'Position'}
                    name={'position'}
                    options={positionOptions}
                  />
                </ContainerSelect>
                <ContainerSelect>
                  <CustomSelect
                    errorMessage={errors?.team}
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
                    label={'Height (cm)'}
                    name={'height'}
                    type={'number'}
                  />
                  <ControlledTextField
                    control={control}
                    label={'Weight (kg)'}
                    name={'weight'}
                    type={'number'}
                  />
                  <ControlledTextField
                    control={control}
                    label={'Birthday'}
                    name={'birthday'}
                    placeholder={'sss'}
                    type={'date'}
                  />
                  <ControlledTextField
                    control={control}
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
