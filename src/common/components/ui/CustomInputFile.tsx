import React, { useEffect, useState } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { ReactComponent as IconAddPhoto } from '../../../assests/images/iconAddPhoto.svg'
import { colors } from '../../../assests/styles/colors'
import styled from 'styled-components'

const ImgLoad = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: cover;
  opacity: 0.5;
`

const ErrorMessage = styled.p`
  color: ${colors.lightRed};
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
`

const CustomImgInputContainer = styled.div`
  display: flex;

  max-width: 336px;
  width: 100%;
  height: 262px;
  background-color: ${colors.lightGrey};
  border-radius: 15px;
  position: relative;
`

const CustomFileInputIcon = styled(IconAddPhoto)`
  position: absolute;
  z-index: 25;
  opacity: 0.7;
  max-height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CustomStyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 100;
`

export type ControlledInputFileProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  errorMessage: any
  imagevisible?: any
  name: FieldPath<TFieldValues>
  selectFile: any
} & Omit<any, 'id' | 'onChange' | 'value'>

export const ControlledInputFile = <TFieldValues extends FieldValues>({
  control,
  errorMessage,
  imagevisible,
  name,
  selectFile,
  ...rest
}: ControlledInputFileProps<TFieldValues>) => {
  const {
    field: { onChange, ref },
  } = useController({
    control,
    name,
  })

  const [selectedImage, setSelectedImage] = useState<null | string>(null)

  useEffect(() => {
    setSelectedImage(imagevisible)
    console.log(selectedImage)
  }, [imagevisible])
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    selectFile(file || null)

    if (file) {
      const reader = new FileReader()

      reader.onload = e => {
        if (e.target) {
          setSelectedImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedImage(null)
    }
  }

  return (
    <>
      <CustomImgInputContainer>
        <CustomFileInputIcon />
        {selectedImage && <ImgLoad alt={'Selected Image'} src={selectedImage} />}
        <CustomStyledInput
          accept={'image/*'}
          name={name}
          onChange={handleFileSelect}
          ref={ref}
          type={'file'}
          {...rest}
        />
      </CustomImgInputContainer>
      {errorMessage && true && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  )
}
