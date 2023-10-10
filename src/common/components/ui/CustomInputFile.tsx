import styled from "styled-components";
import {ReactComponent as IconAddPhoto} from "../../../assests/images/iconAddPhoto.svg";
import {colors} from "../../../assests/styles/colors";
import React, {FC, useState} from "react";

type InputFile = {
    onFileSelect: (file: File | null) => void;
    error: any

}
export const CustomInputFile: FC<InputFile> = ({onFileSelect, error}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        onFileSelect(file || null);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setSelectedImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };
    return (
        <CustomImgInputContainer>
            <CustomFileInputIcon />
            {selectedImage && <ImgLoad src={selectedImage} alt="Selected Image" />}
            <CustomStyledInput

                accept="image/*"
                type="file"
                name="file"
                onChange={handleFileSelect}
            />
            {error && true && <ErrorMessage>{error}</ErrorMessage>}
        </CustomImgInputContainer>

    );
};


const ImgLoad = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px; 
  object-fit: cover; 
  opacity: 0.5;
`;

const ErrorMessage = styled.p`
  color: ${colors.lightRed};
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
`;

const CustomImgInputContainer = styled.div`
  display: flex;
  max-width: 336px;
  width: 100%;
  height: 262px;
  margin-bottom: 48px;
  background-color: ${colors.lightGrey};
  border-radius: 15px;
  position: relative;
`;

const CustomFileInputIcon = styled(IconAddPhoto)`
  position: absolute;
  z-index: 25;
  opacity: 70%;
  max-height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
`;

const CustomStyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 100;
`;
