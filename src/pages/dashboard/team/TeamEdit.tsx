import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useActions } from '../../../api/common/hooks/useActions'
import { colors } from '../../../assests/styles/colors'
import Button from '../../../common/components/ui/Button'
import { ControlledInputFile } from '../../../common/components/ui/CustomInputFile'
import { ControlledTextField } from '../../../common/components/ui/controlledInput/ControlledInput'
import { teamsThunks } from '../../../module/teams/teamsSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import * as yup from 'yup'
import { Breadcrumbs } from '../../../common/components/dashboard/entities/Breadcrumbs'
import { Loader } from '../../../common/components/Loader'
import { useSelector } from 'react-redux'
import { selectAppStatus } from '../../../module/app/appSelectors'
import { teamsSelector } from '../../../module/teams/teamsSelectors'

type FormData = {
  conference: string
  division: string
  foundationYear: number
  imageUrl: any
  name: string
  id?: number
}

export const TeamFormEdit = () => {
  const { id } = useParams<{ id?: string }>()
  const { team } = useSelector(teamsSelector)
  const status = useSelector(selectAppStatus)
  const { updateTeamTC } = useActions(teamsThunks)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const crumbs = [
    { title: 'Teams', url: '/' },
    { title: 'Edit team', url: pathname },
  ]
  const [isImageVisible, setIsImageVisible] = useState<null | string>(null)

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

  const schema = yup.object().shape({
    conference: yup.string().required('Conference is required.'),
    division: yup.string().required('Division is required.'),
    foundationYear: yup
      .number()
      .typeError('Year of foundation must be a number.')
      .min(1900, 'Year of foundation must be greater than or equal to 1900.')
      .max(2024, 'Year of foundation must be less than or equal to 2024.')
      .required('Year of foundation is required.'),
    imageUrl: yup.mixed().required('Image is required'),
    name: yup.string().required('Name is required.'),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    const updatedTeamData = {
      model: {
        id: Number(id),
        ...data,
      },
    }
    updateTeamTC(updatedTeamData)
    setIsImageVisible('')
    setValue('imageUrl', '')
    navigate('/')
  }

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <Container>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs crumbs={crumbs} />
          <Form onSubmit={handleFormSubmitted}>
            <AddImg>
              {/*<ControlledInputFile*/}
              {/*  control={control}*/}
              {/*  errorMessage={errors?.imageUrl?.message}*/}
              {/*  imagevisible={isImageVisible}*/}
              {/*  name={'imageUrl'}*/}
              {/*  selectFile={handleFileSelect}*/}
              {/*/>*/}
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
                  type={'number'}
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
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 15px;
`
const ContainerInput = styled.div`
  display: flex;
  width: 130%;
`
const Form = styled.form`
  display: flex;
  padding: 48px 24px 48px 74px;
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
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
`
